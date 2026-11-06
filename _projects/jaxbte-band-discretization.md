---
title: Phonon band discretization for deterministic BTE solvers
short: Band discretization for the phonon BTE
group: phd
order: 4
period: 2026 – Present
status: Manuscript in preparation
question: >-
  Deterministic phonon BTE solvers group thousands of phonon modes into a limited number of bands.
  The grouping rule decides how well both bulk transport and interface transmission are represented.
  Which grouping is most accurate for a given band budget, and can the split be chosen without running the solver?
methods:
  - Frequency–mean-free-path band binning with conductivity-conserving band aggregation, implemented in JAX-BTE
  - A solver-free rule for splitting a band budget between frequency windows and mean-free-path sub-bins
  - Benchmarks on bulk, thin-film, interface and TDTR cases against reference solutions
contributions:
  - Designed and implemented the binning schemes and the band-budget selector, with unit tests
  - Built the benchmark suite and the analysis
findings: >-
  Among the binning schemes benchmarked, frequency–mean-free-path binning is the only one that keeps
  both bulk thermal transport and interface transmission accurate at a fixed band budget.
  Quantitative results will be shared after publication.
---

Code contributions were made to the JAX-BTE solver. Details will be added after publication.
