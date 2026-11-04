/* Small progressive enhancements. The page works without JavaScript. */
(function () {
  "use strict";

  /* ---- theme toggle: light / dark, remembered per browser ---- */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function labelToggle() {
    if (!toggle) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", "Switch to " + next + " theme");
    toggle.querySelector(".theme-toggle-text").textContent = next === "dark" ? "Dark" : "Light";
  }
  if (toggle) {
    labelToggle();
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      labelToggle();
    });
  }

  /* ---- publications: filter by year and project ---- */
  var toolbar = document.querySelector(".pub-toolbar");
  if (toolbar) {
    toolbar.hidden = false;
    var year = "all", project = "all";
    var tabs = toolbar.querySelectorAll(".tab");
    var select = document.getElementById("pub-project");
    function apply() {
      document.querySelectorAll(".pub-year").forEach(function (block) {
        var any = false;
        block.querySelectorAll(".pub").forEach(function (p) {
          var show = (year === "all" || p.dataset.year === year) &&
                     (project === "all" || p.dataset.project === project);
          p.hidden = !show;
          if (show) any = true;
        });
        block.hidden = !any;
      });
    }
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        year = b.dataset.year;
        tabs.forEach(function (x) { var on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on); });
        apply();
      });
    });
    if (select) select.addEventListener("change", function () { project = select.value; apply(); });
  }

  /* ---- copy BibTeX ---- */
  document.querySelectorAll(".copy-bib").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.parentElement.querySelector("code").textContent.trim();
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { btn.textContent = "Select and copy"; });
      } else { btn.textContent = "Select and copy"; }
    });
  });

  /* ---- highlight the nav item of the section in view ---- */
  var links = document.querySelectorAll('.navbar-list a[href^="#"]');
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          map[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
