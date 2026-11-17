---
layout: aurora-bas-project
title: Boron arsenide
short: AI-enhanced thermal transport in boron arsenide
subtitle: AI-enhanced thermal transport, from twin boundaries to phonons
description: Ben-Chi Ma's research connecting active-learning interatomic potentials, twin-boundary molecular dynamics, and three- and four-phonon transport in boron arsenide.
group: phd
order: 2.5
period: Ongoing
status: Ongoing research
extra_css: /assets/css/bas-project.css
social_image: /assets/img/bas/phonon-band-dos.png
question: >-
  How can we connect atomic-scale imperfections in boron arsenide to the phonon scattering
  that controls heat flow? I develop machine-learned interatomic potentials and transport
  workflows to study both interface resistance and the intrinsic thermal response of the crystal.
---

<section id="phonons" class="bas-section" aria-labelledby="phonons-title">
  <p class="bas-section-label">01 / Crystal-scale validation</p>
  <h2 id="phonons-title">Learning the forces. Checking the phonons.</h2>
  <p>Deep Potential (DP) and Moment Tensor Potential (MTP) models are trained on a common LDA reference dataset. Their relaxed lattice constants differ from DFT-LDA by approximately 0.020% and 0.015%, respectively. Harmonic phonon dispersion and density of states provide a further check beyond energy and force errors.</p>
  <figure class="bas-figure">
    <a href="{{ '/assets/img/bas/phonon-band-dos.png' | relative_url }}" target="_blank" rel="noopener" aria-label="Open the phonon dispersion and density of states figure at full resolution">
      <img src="{{ '/assets/img/bas/phonon-band-dos.png' | relative_url }}" alt="DFT-LDA, DP and MTP phonon branches largely overlap along the labelled high-symmetry path; normalized density of states is shown beside the dispersion." width="2638" height="1606" fetchpriority="high">
    </a>
    <figcaption><strong>Figure 1.</strong> Harmonic phonon dispersion and normalized DOS for crystalline BAs. Frequencies are in THz; DFT-LDA is the reference. Each model uses its own relaxed primitive cell. Agreement here tests the harmonic response, not all anharmonic scattering processes. <span class="bas-figure-action">Select the figure for full resolution.</span></figcaption>
  </figure>
</section>

<section id="twin-boundaries" class="bas-section" aria-labelledby="twins-title">
  <p class="bas-section-label">02 / Interface-resolved transport</p>
  <h2 id="twins-title">From a twin boundary to a thermal resistance.</h2>
  <p>In the interface branch of the project, I use active-learning DP models and non-equilibrium molecular dynamics (NEMD) to resolve heat flow across BAs twin boundaries. Temperature profiles locate the interface drop, while length-dependent calculations separate the finite simulation cell from an extrapolated interface response. Effective-medium descriptions connect this response to defect spacing.</p>
  <figure class="bas-figure">
    <a href="{{ '/assets/img/bas/twin-boundary.png' | relative_url }}" target="_blank" rel="noopener" aria-label="Open the twin-boundary temperature and extrapolation figure at full resolution">
      <img src="{{ '/assets/img/bas/twin-boundary.png' | relative_url }}" alt="Time-averaged NEMD temperature profile shows a drop at the twin region; inverse conductance plotted against inverse length is fit to obtain a finite intercept." width="2332" height="880" loading="lazy" decoding="async">
    </a>
    <figcaption><strong>Figure 2.</strong> A time-averaged NEMD temperature profile and a three-sample inverse-length extrapolation of boundary conductance. The fitted intercept is approximately 2.08 × 10<sup>−4</sup> K m² MW<sup>−1</sup>. This is a finite-sample extrapolation, not a device measurement. The twin-boundary model lineage is separate from the crystalline DP/MTP comparison.</figcaption>
  </figure>
</section>

<section id="thermal-transport" class="bas-section" aria-labelledby="transport-title">
  <p class="bas-section-label">03 / Anharmonic transport</p>
  <h2 id="transport-title">Resolving three- and four-phonon transport.</h2>
  <p>I extend the crystalline models to second-, third- and fourth-order interatomic force constants, then solve phonon Boltzmann transport equations. The temperature sweeps below include natural-isotope scattering and compare the retained three-phonon inverse-BTE route with a hybrid treatment that also includes four-phonon scattering.</p>
  <figure class="bas-figure">
    <a href="{{ '/assets/img/bas/thermal-conductivity.png' | relative_url }}" target="_blank" rel="noopener" aria-label="Open the temperature-dependent thermal conductivity figure at full resolution">
      <img src="{{ '/assets/img/bas/thermal-conductivity.png' | relative_url }}" alt="DP and MTP temperature-dependent average conductivity: isotope plus three-phonon inverse results are higher than hybrid three-plus-four-phonon results. A DFT-LDA iterative three-phonon reference is included." width="2332" height="924" loading="lazy" decoding="async">
    </a>
    <figcaption><strong>Figure 3.</strong> Average lattice thermal conductivity on a 20³ q-mesh. The blue curves use kALDo inverse BTE with imported ShengBTE-format IFCs; gold curves use ShengBTE/FourPhonon with three-phonon iteration and four-phonon RTA-like scattering. The dotted DFT-LDA reference uses three-phonon iterative ShengBTE. The hybrid calculation is not a fully iterative four-phonon solve; differences between curves include solver and integration choices as well as the scattering model.</figcaption>
  </figure>
  <details class="bas-methods">
    <summary>Calculation conditions and interpretation</summary>
    <ul>
      <li>Crystalline training reference: 2,000 LDA AIMD configurations, 128 atoms, six temperatures from 50 to 900 K.</li>
      <li>IFC supercell: 4 × 4 × 4 repetitions of the two-atom primitive cell, giving 128 atoms.</li>
      <li>Third-order IFC range: fifth nearest neighbors. Fourth-order IFC range: second nearest neighbors.</li>
      <li>The DP and MTP hybrid curves use scalebroad = 0.1. The DFT-LDA three-phonon iterative reference uses scalebroad = 0.2.</li>
      <li>Conductivity is the mean of the three diagonal tensor components. No boundary-limited device conductivity is inferred from these crystal calculations.</li>
    </ul>
  </details>
</section>

<section id="validation" class="bas-section" aria-labelledby="validation-title">
  <p class="bas-section-label">04 / Numerical validation</p>
  <h2 id="validation-title">Testing the calculation, not just reporting a number.</h2>
  <p>Transport predictions depend on how force constants are generated, how reciprocal space is sampled, and how the collision problem is solved. I compare these choices explicitly rather than treating a completed job as evidence of convergence.</p>
  <figure class="bas-figure">
    <a href="{{ '/assets/img/bas/mesh-validation.png' | relative_url }}" target="_blank" rel="noopener" aria-label="Open the reciprocal-space mesh sensitivity figure at full resolution">
      <img src="{{ '/assets/img/bas/mesh-validation.png' | relative_url }}" alt="Native-DP kALDo inverse conductivity approaches 2304 watts per meter kelvin with increasing mesh size; the 18-cubed mesh differs from 20-cubed by approximately 0.6 percent." width="2332" height="858" loading="lazy" decoding="async">
    </a>
    <figcaption><strong>Figure 4.</strong> q-mesh sensitivity for the <em>native-DP kALDo IFC route</em> at 300 K with isotope and three-phonon scattering. The 18³ result is approximately 0.6% below 20³. This is a separate IFC-generation branch from Figure 3; the test does not establish mesh convergence for every plotted workflow or the infinite-mesh limit.</figcaption>
  </figure>
</section>

<section id="contributions" class="bas-section bas-contributions" aria-labelledby="contributions-title">
  <p class="bas-section-label">My contributions</p>
  <h2 id="contributions-title">Connecting the methods into a research workflow.</h2>
  <dl>
    <div><dt>Model development</dt><dd>Developed active-learning DP models for twin-boundary structures, and trained and tested crystalline DP/MTP models against a shared first-principles reference.</dd></div>
    <div><dt>Transport and validation</dt><dd>Built the NEMD and lattice-dynamics workflows, compared IFC-generation and BTE-solver routes, and analyzed finite-size, mesh and solver sensitivity.</dd></div>
    <div><dt>Scientific computing</dt><dd>Automated CPU/GPU cluster calculations, data conversion, result collection and figure generation with explicit provenance and environment separation.</dd></div>
  </dl>
  <p class="bas-outlook">The goal is a model-guided connection between BAs microstructure and thermal performance, providing material-level inputs for semiconductor thermal-management design.</p>
</section>
