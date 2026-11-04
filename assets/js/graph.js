/* Research & Skills Graph.
   Data: /assets/data/graph.json (generated from _data/graph/nodes.json and edges.json).
   Rendering only; edit the data files to change content.
   Accessibility: every node is a focusable button (Tab / Shift+Tab, Enter or Space to select,
   Escape to clear). A server-rendered list version is always available below the graph. */
(function () {
  "use strict";

  var canvas = document.getElementById("graph-canvas");
  if (!canvas) return;
  var section = document.getElementById("graph");
  var ui = section.querySelector(".graph-ui");
  var list = document.getElementById("graph-list");
  var panel = document.getElementById("graph-panel");

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var narrow = window.matchMedia && window.matchMedia("(max-width: 560px)").matches;
  var GROUP_ORDER = ["domain", "method", "tool", "project"];
  var GROUP_LABEL = { domain: "Research area", method: "Method", tool: "Software / tool", project: "Project" };

  function start() {
    if (!window.d3) return; // CDN blocked: the list version stays visible
    if (narrow) {
      // Small screens: the list is the default; offer the interactive view on request.
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "button";
      btn.textContent = "Show interactive graph";
      btn.addEventListener("click", function () { btn.remove(); build(); });
      list.parentNode.insertBefore(btn, list);
      return;
    }
    build();
  }

  function resolve(url, base) {
    if (/^[a-z]+:\/\//i.test(url)) return url;
    if (url.charAt(0) === "#") return (location.pathname === base + "/" || location.pathname === base + "/index.html") ? url : base + "/" + url;
    return base + url;
  }

  function build() {
    fetch(canvas.dataset.src).then(function (r) { return r.json(); }).then(function (data) {
      ui.hidden = false;
      list.open = false;
      draw(data);
    }).catch(function () { /* keep list */ });
  }

  function draw(data) {
    var d3 = window.d3;
    var base = data.baseurl || "";
    var nodes = data.nodes.map(function (n) { return Object.assign({}, n); });
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; n.neighbors = []; });
    var links = data.edges.filter(function (e) { return byId[e.source] && byId[e.target]; })
      .map(function (e) { return { source: e.source, target: e.target, relation: e.relation }; });
    links.forEach(function (l) {
      byId[l.source].neighbors.push({ node: byId[l.target], relation: l.relation, dir: "out" });
      byId[l.target].neighbors.push({ node: byId[l.source], relation: l.relation, dir: "in" });
    });
    nodes.sort(function (a, b) { return GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group); });

    var size = { domain: 17, method: 12, tool: 9, project: 13 };
    var width = canvas.clientWidth, height = canvas.clientHeight;

    var svg = d3.select(canvas).append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("role", "group")
      .attr("aria-label", "Research and skills graph with " + nodes.length + " nodes");
    var gRoot = svg.append("g");
    var tooltip = d3.select(canvas).append("div").attr("class", "graph-tooltip").attr("hidden", true);

    // Groups sit on elliptical rings that follow the canvas shape:
    // research areas in the middle, methods around them, tools and projects outside.
    var ring = { domain: 0.22, method: 0.55, tool: 0.95, project: 0.78 };
    var cx = width / 2, cy = height / 2, ax = width / 2 - 70, ay = height / 2 - 45;
    nodes.forEach(function (d, i) {           // deterministic start on the target ring
      var a = (i / nodes.length) * 2 * Math.PI * 3.1;
      d.x = cx + Math.cos(a) * ring[d.group] * ax;
      d.y = cy + Math.sin(a) * ring[d.group] * ay;
      d.halfLabel = Math.min(d.label.length, 34) * 3.1;
    });
    function ellipse(alpha) {
      nodes.forEach(function (d) {
        var ex = (d.x - cx) / ax, ey = (d.y - cy) / ay;
        var r = Math.sqrt(ex * ex + ey * ey) || 1e-6;
        var k = ((ring[d.group] - r) / r) * alpha * 0.25;
        d.vx += ex * k * ax;
        d.vy += ey * k * ay;
      });
    }
    var sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(function (d) { return d.id; }).distance(60).strength(0.12))
      .force("charge", d3.forceManyBody().strength(-180))
      .force("collide", d3.forceCollide().radius(function (d) { return size[d.group] + 8 + Math.min(d.halfLabel, 48) * 0.55; }).strength(0.9))
      .force("ellipse", ellipse)
      .stop();
    for (var i = 0; i < 500; i++) { sim.tick(); clampAll(); } // settle before first paint: no intro animation

    var link = gRoot.append("g").selectAll("line").data(links).join("line").attr("class", "link");

    var node = gRoot.append("g").selectAll("g").data(nodes).join("g")
      .attr("class", function (d) { return "node " + d.group; })
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr("aria-label", function (d) { return d.label + ", " + GROUP_LABEL[d.group] + ". " + d.description; });

    node.each(function (d) {
      var g = d3.select(this), s = size[d.group];
      if (d.group === "tool") g.append("rect").attr("class", "shape").attr("x", -s).attr("y", -s).attr("width", 2 * s).attr("height", 2 * s).attr("rx", 3);
      else if (d.group === "project") g.append("path").attr("class", "shape").attr("d", "M0," + (-s * 1.25) + "L" + (s * 1.25) + ",0L0," + (s * 1.25) + "L" + (-s * 1.25) + ",0Z");
      else g.append("circle").attr("class", "shape").attr("r", s);
      g.append("text").attr("text-anchor", "middle").attr("y", s + 14).text(d.label);
    });

    function render() {
      link.attr("x1", function (d) { return d.source.x; }).attr("y1", function (d) { return d.source.y; })
          .attr("x2", function (d) { return d.target.x; }).attr("y2", function (d) { return d.target.y; });
      node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
    }
    function clampAll() {
      nodes.forEach(function (d) {
        var hx = Math.max(size[d.group] + 4, d.halfLabel + 4);
        d.x = Math.max(hx, Math.min(width - hx, d.x));
        d.y = Math.max(size[d.group] + 6, Math.min(height - size[d.group] - 22, d.y));
      });
    }
    render();
    sim.on("tick", function () { clampAll(); render(); });

    // Zoom and pan
    var zoom = d3.zoom().scaleExtent([0.5, 3]).on("zoom", function (ev) { gRoot.attr("transform", ev.transform); });
    svg.call(zoom).on("dblclick.zoom", null);

    // Drag (re-heats the layout briefly; disabled animation under reduced motion)
    node.call(d3.drag()
      .on("start", function (ev, d) { if (!reduceMotion && !ev.active) sim.alphaTarget(0.2).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag", function (ev, d) { d.fx = ev.x; d.fy = ev.y; if (reduceMotion) { d.x = ev.x; d.y = ev.y; render(); } })
      .on("end", function (ev, d) { if (!ev.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    // Highlighting
    var selected = null;
    function highlight(d) {
      if (!d) { canvas.classList.remove("dim"); node.classed("hl", false); link.classed("hl", false); return; }
      var ids = {}; ids[d.id] = true;
      d.neighbors.forEach(function (n) { ids[n.node.id] = true; });
      canvas.classList.add("dim");
      node.classed("hl", function (n) { return ids[n.id]; });
      link.classed("hl", function (l) { return l.source.id === d.id || l.target.id === d.id; });
    }
    function showTip(ev, d) {
      var rect = canvas.getBoundingClientRect();
      var x, y;
      if (ev && ev.clientX) { x = ev.clientX - rect.left; y = ev.clientY - rect.top; }
      else { var t = d3.zoomTransform(svg.node()); x = t.applyX(d.x) * rect.width / width; y = t.applyY(d.y) * rect.height / height; }
      tooltip.attr("hidden", null)
        .html("<strong>" + esc(d.label) + "</strong><br>" + esc(d.description))
        .style("left", Math.min(x + 14, rect.width - 250) + "px")
        .style("top", Math.min(y + 14, rect.height - 90) + "px");
    }
    function hideTip() { tooltip.attr("hidden", true); }

    node.on("mouseenter", function (ev, d) { if (!selected) highlight(d); showTip(ev, d); })
        .on("mousemove", function (ev, d) { showTip(ev, d); })
        .on("mouseleave", function () { if (!selected) highlight(null); else highlight(selected); hideTip(); })
        .on("focus", function (ev, d) { if (!selected) highlight(d); showTip(null, d); })
        .on("blur", function () { hideTip(); if (!selected) highlight(null); })
        .on("click", function (ev, d) { select(d); })
        .on("keydown", function (ev, d) {
          if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); select(d); }
          if (ev.key === "Escape") { select(null); }
        });
    svg.on("click", function (ev) { if (ev.target === svg.node()) select(null); });

    function select(d) {
      selected = d;
      node.classed("selected", function (n) { return d && n.id === d.id; });
      highlight(d);
      renderPanel(d);
    }

    function renderPanel(d) {
      if (!d) { panel.innerHTML = '<p class="muted">Select a node to see what it is, how it connects, and related projects or papers.</p>'; return; }
      var html = '<p class="group-label"><span class="swatch swatch-' + d.group + '"></span>' + GROUP_LABEL[d.group] + "</p>";
      html += "<h3>" + esc(d.label) + "</h3><p>" + esc(d.description) + "</p>";
      GROUP_ORDER.forEach(function (g) {
        var ns = d.neighbors.filter(function (n) { return n.node.group === g; });
        if (!ns.length) return;
        html += '<p class="group-label"><span class="swatch swatch-' + g + '"></span>' + GROUP_LABEL[g] + "s</p><ul>";
        ns.forEach(function (n) {
          var rel = n.dir === "out" ? n.relation : "← " + n.relation;
          html += '<li><span class="muted small">' + esc(rel) + '</span> <button type="button" class="linklike" data-node="' + n.node.id + '">' + esc(n.node.label) + "</button></li>";
        });
        html += "</ul>";
      });
      if (d.links && d.links.length) {
        html += '<p class="group-label">Links</p><ul>';
        d.links.forEach(function (l) { html += '<li><a href="' + resolve(l.url, base) + '">' + esc(l.label) + "</a></li>"; });
        html += "</ul>";
      }
      panel.innerHTML = html;
      panel.querySelectorAll("button[data-node]").forEach(function (b) {
        b.addEventListener("click", function () {
          var target = byId[b.dataset.node];
          select(target);
          node.filter(function (n) { return n.id === target.id; }).node().focus();
        });
      });
    }

    // Legend: show / hide groups
    var hidden = {};
    section.querySelectorAll(".legend-item[data-group]").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = b.dataset.group;
        hidden[g] = !hidden[g];
        b.setAttribute("aria-pressed", !hidden[g]);
        node.attr("display", function (n) { return hidden[n.group] ? "none" : null; })
            .attr("tabindex", function (n) { return hidden[n.group] ? -1 : 0; });
        link.attr("display", function (l) { return hidden[l.source.group] || hidden[l.target.group] ? "none" : null; });
      });
    });
    document.getElementById("graph-reset").addEventListener("click", function () {
      select(null);
      svg.transition().duration(reduceMotion ? 0 : 300).call(zoom.transform, d3.zoomIdentity);
    });

    // "See in graph" links in Research Interests
    document.querySelectorAll("[data-graph-focus]").forEach(function (a) {
      a.addEventListener("click", function () {
        var target = byId[a.dataset.graphFocus];
        if (target) setTimeout(function () { select(target); }, reduceMotion ? 0 : 350);
      });
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
