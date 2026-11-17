---
title: Multiscale thermal modeling of GaN power and RF transistors
short: Multiscale thermal modeling of GaN transistors
group: phd
order: 3
period: Sept. 2025 – Present
status: Ongoing
sponsor: Lockheed Martin
question: >-
  Heat in GaN transistors is generated in nanometer-scale hot spots near the gate, where phonon
  transport is non-diffusive, but it leaves the device through micrometer- to millimeter-scale layers.
  How do we predict channel temperature across these scales, and which design choices (substrate,
  thinning, carrier) actually matter?
methods:
  - First-principles phonon properties as input to the phonon Boltzmann transport equation
  - AlN, GaN and AlGaN alloy phonon transport from a foundation machine-learning interatomic potential (MACE), with the virtual-crystal approximation and q-mesh extrapolation, checked against DFT references (MLPhonon workflow)
  - GPU-accelerated multi-band deterministic BTE coupled with Fourier conduction
  - Finite-volume and analytical die-scale thermal models
  - An effective-conductivity correction that carries non-Fourier near-junction heating into fast Fourier models
  - GaN/Si interface conductance from the diffuse mismatch model, compared with TDTR measurements
  - Physics-informed neural networks for the phonon BTE (collaboration)
contributions:
  - Built the coupled BTE–Fourier modeling workflow for device structures
  - Built the MLIP-to-device material pipeline that hands AlGaN barrier-layer phonon properties to the device BTE solver
  - Analyzed junction-to-backside thermal resistance of a GaN-on-Si power FET versus substrate thinning, die attach, carrier and substrate material
  - Validated the die-scale model against a commercial device datasheet
  - Co-authored the PINN–BTE paper in Materials Today Physics (2025)
findings: Results are not public.
---

Sponsored by Lockheed Martin. Presented at SHTC 2025 and SciML@ND 2026 (see Talks).
