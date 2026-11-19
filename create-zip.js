// create-zip.js — build a new ZIP from local files (nothing uploaded).
import { toast, downloadBlob, formatBytes, wireDropzone } from './site.js';

const STORE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.zip', '.mp4', '.mp3', '.wav', '.pdf', '.heic', '.avif']);

const panel = document.getElementById('panel-create');
const zone = document.getElementById('create-dropzone');
const fileInput = document.getElementById('create-file-input');
const folderInput = document.getElementById('create-folder-input');
const tbody = document.getElementById('create-files-body');
const emptyNote = document.getElementById('create-empty');
const countInfo = document.getElementById('create-count');
const totalInfo = document.getElementById('create-total');
const zipName = document.getElementById('create-zip-name');
const btnBuild = document.getElementById('create-build');
const btnClear = document.getElementById('create-clear');
const progressWrap = document.getElementById('create-progress-wrap');
const progressBar = document.getElementById('create-progress-bar');
const progressText = document.getElementById('create-progress-text');

/** @type {{ file: File, path: string, id: number }[]} */
let queue = [];
let nextId = 1;
let busy = false;

let worker = null;
let jobId = 0;
const jobs = new Map();
function runWorker(msg, transfer) {
  if (!worker) {
    worker = new Worker('./worker.js');
    worker.onmessage = (ev) => {
      const job = jobs.get(ev.data.id);
      if (!job) return;
      if ('progress' in ev.data) return;
      jobs.delete(ev.data.id);
      if (ev.data.ok) job.resolve(ev.data);
      else job.reject(new Error(ev.data.error));
    };
    worker.onerror = (ev) => {
      ev.preventDefault();
      for (const job of jobs.values()) job.reject(new Error('The background worker stopped unexpectedly.'));
      jobs.clear();
      worker = null;
    };
  }
  const id = ++jobId;
  return new Promise((resolve, reject) => {
    jobs.set(id, { resolve, reject });
    worker.postMessage({ ...msg, id }, transfer);
  });
}

function extOf(name) {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i).toLowerCase() : '';
}

function normalizePath(file) {
  const rel = file.webkitRelativePath || file.name;
  return rel.replace(/\\/g, '/').replace(/^\/+/, '').split('/').filter((s) => s && s !== '.' && s !== '..').join('/');
}

function addFiles(fileList) {
  const added = [];
  for (const file of fileList) {
    if (!file.size && !file.name) continue;
    const path = normalizePath(file);
    if (!path) continue;
    if (queue.some((q) => q.path === path)) {
      const idx = queue.findIndex((q) => q.path === path);
      queue[idx] = { file, path, id: queue[idx].id };
    } else {
      queue.push({ file, path, id: nextId++ });
      added.push(path);
    }
  }
  if (added.length) {
    renderList();
    toast(`Added ${added.length === 1 ? added[0] : `${added.length} files`}`);
  }
}

function removeId(id) {
  queue = queue.filter((q) => q.id !== id);
  renderList();
}

function renderList() {
  tbody.replaceChildren();
  const total = queue.reduce((s, q) => s + q.file.size, 0);
  emptyNote.hidden = queue.length > 0;
  const wrap = document.getElementById('create-table-wrap');
  if (wrap) wrap.hidden = queue.length === 0;
  countInfo.textContent = queue.length
    ? `${queue.length.toLocaleString()} file${queue.length === 1 ? '' : 's'} ready to compress`
    : 'No files added yet';
  totalInfo.textContent = queue.length ? `Total uncompressed size: ${formatBytes(total)}` : '';
  btnBuild.disabled = busy || !queue.length;
  btnClear.disabled = busy || !queue.length;
  for (const item of queue) {
    const tr = document.createElement('tr');
    const rm = document.createElement('button');
    rm.type = 'button';
    rm.className = 'btn btn--small';
    rm.textContent = 'Remove';
    rm.setAttribute('aria-label', `Remove ${item.path}`);
    rm.addEventListener('click', () => removeId(item.id));
    tr.innerHTML = `<td class="c-name">${escapeHtml(item.path)}</td><td class="c-size">${formatBytes(item.file.size)}</td><td class="c-act"></td>`;
    tr.querySelector('.c-act').appendChild(rm);
    tbody.appendChild(tr);
  }
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function setProgress(fraction, text) {
  if (fraction == null) {
    progressWrap.hidden = true;
    progressBar.style.width = '0%';
    progressText.textContent = '';
    return;
  }
  progressWrap.hidden = false;
  const pct = Math.min(100, Math.max(0, Math.round(fraction * 100)));
  progressBar.style.width = `${pct}%`;
  progressText.textContent = text || '';
}

async function buildZip() {
  if (busy || !queue.length) return;
  busy = true;
  btnBuild.disabled = true;
  try {
    const files = {};
    const buffers = [];
  let i = 0;
    for (const item of queue) {
      setProgress(i / queue.length * 0.7, `Reading ${item.path} (${i + 1} of ${queue.length})`);
      const bytes = new Uint8Array(await item.file.arrayBuffer());
      files[item.path] = [bytes, { level: STORE_EXT.has(extOf(item.path)) ? 0 : 6, mtime: item.file.lastModified ? new Date(item.file.lastModified) : new Date() }];
      if (!buffers.includes(bytes.buffer)) buffers.push(bytes.buffer);
      i++;
    }
    setProgress(0.85, 'Compressing into a ZIP file');
    const res = await runWorker({ type: 'zip', files }, buffers);
    let name = (zipName.value || 'archive').trim().replace(/[^\w.\- ()[\]]+/g, '-').replace(/^\.+/, '');
    if (!name.toLowerCase().endsWith('.zip')) name += '.zip';
    downloadBlob(new Blob([res.data], { type: 'application/zip' }), name);
    toast(`Downloaded ${name}`);
  } catch (err) {
    toast(err.message || 'Could not build the ZIP');
    console.error(err);
  } finally {
    busy = false;
    setProgress(null);
    renderList();
  }
}

function clearAll() {
  queue = [];
  zipName.value = 'my-files.zip';
  renderList();
}

wireDropzone(zone, fileInput, addFiles);

folderInput.addEventListener('change', () => {
  const files = [...folderInput.files];
  folderInput.value = '';
  if (files.length) addFiles(files);
});

btnBuild.addEventListener('click', buildZip);
btnClear.addEventListener('click', clearAll);

document.querySelectorAll('[data-mode]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const mode = tab.getAttribute('data-mode');
    document.querySelectorAll('[data-mode]').forEach((t) => {
      const on = t.getAttribute('data-mode') === mode;
      t.classList.toggle('mode-tab--active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    const unzip = document.getElementById('panel-unzip');
    const create = document.getElementById('panel-create');
    const isCreate = mode === 'create';
    unzip.hidden = isCreate;
    create.hidden = !isCreate;
    if (isCreate) location.hash = 'create';
    else location.hash = 'unzip';
  });
});

function applyHash() {
  const create = location.hash === '#create';
  const tab = document.querySelector(`[data-mode="${create ? 'create' : 'unzip'}"]`);
  if (tab) tab.click();
}
applyHash();
window.addEventListener('hashchange', applyHash);

renderList();

export { addFiles, buildZip };