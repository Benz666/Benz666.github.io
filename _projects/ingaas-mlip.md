---
title: Machine-learned interatomic potentials for thermal transport in InGaAs alloys
short: MLIPs for InGaAs thermal transport
group: phd
order: 2
period: Ongoing
status: Manuscript in preparation
question: >-
  In₁₋ₓGaₓAs is central to optoelectronic and high-speed devices, and its random cation occupation
  creates many local bonding environments. Composition-specific DFT is accurate but expensive.
  Can machine-learned potentials give atomistic-fidelity lattice thermal conductivity across compositions?
methods:
  - Self-trained concurrent-learning Deep Potential (DP) models (DeePMD-kit, DP-GEN) on DFT (VASP) data
  - Benchmarks against the MACE foundation potential
  - Phonon dispersion and anharmonic lattice thermal conductivity with phono3py; ALAMODE cross-checks
  - Virtual-crystal approximation for alloy compositions
contributions:
  - Trained and validated the self-trained DP models
  - Built a reproducible MLIP-to-phonon workflow
findings: Presented at ICT 2026; manuscript in preparation. Quantitative results will be shared after publication.
---

Work with Zhihao Xu and Prof. Tengfei Luo. The ICT 2026 talk is listed under Talks.
