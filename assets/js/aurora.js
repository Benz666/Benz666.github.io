/* Design demo enhancements: compact header after scrolling, news slider arrows. */
(function () {
  "use strict";

  var header = document.getElementById("a-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
