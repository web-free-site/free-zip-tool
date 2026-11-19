/* web-free.site ad loader (Adsterra). Keys for free-zip-tool.web-free.site only. */
(function () {
  "use strict";
  if (window.__wfAds) return;
  window.__wfAds = 1;
  var C = {
    pop: "https://abscloud.org/1/484c067e5c8fb4dc53c0baed3225291e",
    social: "https://bauval.org/14/19cc84e78f2c4b43608bb40cd8aad758",
    native: "https://bauval.org/21/b6b3531f05aa5a04d18379ace3976697",
    nativeId: "container-b6b3531f05aa5a04d18379ace3976697",
    smart: "https://araplhn.org/4/cc9e234aeed7ff3bd494d10b593d2812",
    bannerBase: "https://bauval.org/22/",
    banners: {
      "728x90": "ea3cb6ef41ec5d71886d994a0f297b17",
      "468x60": "202df9cc3ae88707864c2ef59f3655f6",
      "300x250": "09aff4dc207ff2c7e8927eff8c3ffdd0",
      "160x600": "db313f897bcef6bb51f6b32b5b76a8f5",
      "160x300": "5cc0d06177f60b5d7ae91fe293c9d35c",
      "320x50": "d123e9436bc0ed70c0e3670d916600fc",
    },
  };
  var d = document;
  var html = (d.body ? d.body.innerHTML : "") + [].map.call(d.scripts, function (s) { return s.src || ""; }).join(" ");
  function has(k) { return html.indexOf(k) > -1; }
  function keyOf(u) { var m = /[0-9a-f]{32}/.exec(u); return m ? m[0] : u; }
  function addScript(src, parent) {
    if (has(keyOf(src))) return;
    var s = d.createElement("script");
    s.src = src;
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    (parent || d.body).appendChild(s);
  }
  function banner(size, extraStyle) {
    var k = C.banners[size];
    if (!k) return null;
    var wh = size.split("x"), w = +wh[0], h = +wh[1];
    var box = d.createElement("div");
    box.className = "wf-ad wf-ad-" + size;
    box.setAttribute("aria-label", "Advertisement");
    box.style.cssText = "margin:1.25rem auto;text-align:center;max-width:100%;overflow:hidden;" + (extraStyle || "");
    var f = d.createElement("iframe");
    f.title = "Advertisement";
    f.width = w;
    f.height = h;
    f.setAttribute("scrolling", "no");
    f.setAttribute("frameborder", "0");
    f.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
    );
    f.style.cssText = "border:0;display:block;margin:0 auto;width:" + w + "px;height:" + h + "px;max-width:100%";
    f.srcdoc =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>' +
      "<script>atOptions={'key':'" +
      k +
      "','format':'iframe','height':" +
      h +
      ",'width':" +
      w +
      ",'params':{}};</scr" +
      "ipt>" +
      '<script src="' +
      C.bannerBase +
      k +
      '"></scr' +
      "ipt></body></html>";
    box.appendChild(f);
    return box;
  }
  function after(ref, node) {
    if (ref && node && ref.parentNode) ref.parentNode.insertBefore(node, ref.nextSibling);
  }
  function run() {
    var vw = window.innerWidth || d.documentElement.clientWidth || 1024;
    var root = d.querySelector("#tool") || d.querySelector("article") || d.querySelector("main") || d.body;
    var kids = [];
    for (var i = 0; i < root.children.length; i++) {
      var t = root.children[i].tagName;
      if (t !== "SCRIPT" && t !== "STYLE") kids.push(root.children[i]);
    }
    var h1 = d.querySelector("h1");
    var hero = d.querySelector(".hero");
    var topRef = hero || h1;
    var topSize = vw >= 780 ? "728x90" : vw >= 500 ? "468x60" : "320x50";
    var top = has(C.banners[topSize]) ? null : banner(topSize);
    if (top) {
      var slot = d.getElementById("ad-top");
      if (slot) slot.appendChild(top);
      else if (topRef) after(topRef, top);
      else root.insertBefore(top, root.firstChild);
    }
    if (!has(C.nativeId)) {
      var nb = d.createElement("div");
      nb.className = "wf-ad wf-ad-native";
      nb.style.cssText = "margin:1.5rem 0";
      var nc = d.createElement("div");
      nc.id = C.nativeId;
      nb.appendChild(nc);
      var how = d.getElementById("how");
      if (how) how.parentNode.insertBefore(nb, how);
      else root.appendChild(nb);
      addScript(C.native, nb);
    }
    var mid728 = d.getElementById("ad-mid-728");
    if (mid728 && !has(C.banners["728x90"])) {
      var b728 = banner("728x90");
      if (b728) mid728.appendChild(b728);
    }
    var mid468 = d.getElementById("ad-mid-468");
    if (mid468 && !has(C.banners["468x60"])) {
      var b468 = banner("468x60");
      if (b468) mid468.appendChild(b468);
    }
    var mid300 = d.getElementById("ad-mid-300");
    if (mid300 && !has(C.banners["300x250"])) {
      var b300 = banner("300x250");
      if (b300) mid300.appendChild(b300);
    }
    if (!has(C.banners["300x250"]) && !mid300) {
      var b3 = banner("300x250");
      if (b3) root.appendChild(b3);
    }
    if (vw >= 780 && !has(C.banners["468x60"]) && topSize !== "468x60" && !mid468) {
      var b4 = banner("468x60");
      if (b4) root.appendChild(b4);
    }
    if (C.smart && !has(keyOf(C.smart))) {
      var p = d.createElement("p");
      p.className = "wf-ad wf-sponsored";
      p.style.cssText = "font-size:.8rem;opacity:.75;text-align:center;margin:1rem 0";
      var a = d.createElement("a");
      a.href = C.smart;
      a.target = "_blank";
      a.rel = "sponsored nofollow noopener";
      a.textContent = "Sponsored: recommended offers";
      p.appendChild(a);
      var foot = d.querySelector(".site-footer");
      if (foot) foot.parentNode.insertBefore(p, foot);
      else root.appendChild(p);
    }
    if (vw >= 1300) {
      var rails = [
        ["160x600", "left"],
        ["160x300", "right"],
      ];
      for (var r = 0; r < rails.length; r++) {
        if (has(C.banners[rails[r][0]])) continue;
        var rb = banner(rails[r][0], "position:fixed;top:110px;" + rails[r][1] + ":12px;margin:0;z-index:5;");
        if (rb) d.body.appendChild(rb);
      }
    }
    if (vw < 780) {
      var sticky = d.getElementById("ad-sticky-mobile");
      if (sticky && !has(C.banners["320x50"])) {
        var b50 = banner("320x50", "margin:0;");
        if (b50) sticky.appendChild(b50);
      }
    }
    addScript(C.social, d.body);
    addScript(C.pop, d.body);
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", run);
  else run();
})();