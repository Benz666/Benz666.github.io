/* Aurora design enhancements: glass header after scrolling, mobile menu, news slider arrows. */
(function () {
  "use strict";

  var header = document.getElementById("a-header");
  var menuBtn = document.getElementById("a-menu-btn");
  function setMenu(open) {
    if (!header || !menuBtn) return;
    header.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (header) {
    var onScroll = function () {
      var s = window.scrollY > 40;
      header.classList.toggle("is-scrolled", s);
      if (!s) setMenu(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(!header.classList.contains("menu-open")); });
    header.querySelectorAll(".a-menu-panel a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    document.addEventListener("click", function (e) { if (!header.contains(e.target)) setMenu(false); });
  }

  /* palette picker (demo only) */
  var picker = document.querySelector(".a-palette");
  if (picker) {
    var root = document.documentElement;
    var mark = function () {
      picker.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.pal === root.getAttribute("data-palette") ? "true" : "false"); });
    };
    picker.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-pal]"); if (!b) return;
      root.setAttribute("data-palette", b.dataset.pal);
      try { localStorage.setItem("aurora-palette", b.dataset.pal); } catch (err) {}
      mark();
    });
    mark();
  }

  var slider = document.getElementById("a-slider");
  var arrows = document.querySelector(".a-slider-arrows");
  if (slider && arrows) {
    arrows.hidden = false;
    var buttons = arrows.querySelectorAll("button");
    var update = function () {
      var max = slider.scrollWidth - slider.clientWidth - 2;
      buttons[0].disabled = slider.scrollLeft <= 2;
      buttons[1].disabled = slider.scrollLeft >= max;
    };
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var step = slider.querySelector(".a-slide").getBoundingClientRect().width + 24;
        slider.scrollBy({ left: step * Number(b.dataset.slide), behavior: "smooth" });
      });
    });
    slider.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();
