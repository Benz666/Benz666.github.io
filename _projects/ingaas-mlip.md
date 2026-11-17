---
title: Machine-learned interatomic potentials for thermal transport in InGaAs alloys
short: MLIPs for InGaAs thermal transport
group: phd
order: 2
period: Mar. 2025 – Present
status: Manuscript in preparation
question: >-
  In₁₋ₓGaₓAs is central to optoelectronic and high-speed devices, and its random cation occupation
  creates many local bonding environments. Composition-specific DFT is accurate but expensive.
  Can machine-learned potentials give atomistic-fidelity lattice thermal conductivity across compositions?
methods:
  - MLPhonon, my open-source workflow from machine-learned interatomic potentials to lattice dynamics and thermal transport (relaxation, non-analytical correction, second- and third-order force constants, phono3py transport, virtual-crystal alloys and q-mesh extrapolation)
  - Self-trained concurrent-learning Deep Potential (DP) models (DeePMD-kit, DP-GEN) on DFT (VASP) data
  - Benchmarks against the MACE foundation potential
  - Phonon dispersion and anharmonic lattice thermal conductivity with phono3py; ALAMODE cross-checks
  - Virtual-crystal approximation for alloy compositions
contributions:
  - Developed MLPhonon, the configuration-driven MLIP–lattice-dynamics workflow used in this project and reused for AlN/GaN/AlGaN
  - Trained and validated the self-trained DP models
code: https://github.com/Benz666/MLPhonon
findings: Presented at ICT 2026; manuscript in preparation. Quantitative results will be shared after publication.
---

Part of the Phonon Olympics project, a multi-institution effort in which several research groups compute the thermal conductivity of InGaAs across compositions; this work is our group's contribution. Work with Zhihao Xu and Prof. Tengfei Luo. The ICT 2026 talk is listed under Talks.
