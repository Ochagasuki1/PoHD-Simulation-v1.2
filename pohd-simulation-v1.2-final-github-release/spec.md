# PoHD Simulation v1.1   Motoko based Economic Simulation

## Overview
A Motoko-based simulation system that models Proof of Human Dignity (PoHD) economics with dynamic Human Capital Score (HCS) calculations, Community Wealth (CW) aggregation, and GDP index modeling. The application simulates a population of 1,000 beta users over a 15-year timeline (2026-2040) with Japanese language interface.

## Core Simulation Parameters
- α = 0.15, β = 0.10, γ = 0.05 for HCS dynamics
- Population: 1,000 simulated beta users
- Timeline: 2026-2040 with daily simulation steps
- 2035 Burn Event: +11.1% GDP correction milestone

## User Data Model
Each simulated user contains:
- Human Capital Score (HCS)
- Meals claimed counter
- VDF (Verifiable Delay Function) hours
- Optional forgetting score

## Daily Step Function
The simulation performs daily updates:
- Updates each user's HCS based on meal eligibility (HCS ≥ 0.7, maximum 3 meals/week)
- Applies stress inverse relationship to HCS
- Adds random step bonus to HCS
- Increments total VDF contribution probabilistically
- Resets weekly meal claims every 7 simulated days

## Economic Models
- **CW Growth Aggregator**: CW_t = ∫(0.3 * VDF + 0.5 * HCS + 0.2 * ProofOfForgetting)
- **GDP Index Model**: Y_t = A₀ e^{0.03t} * (PHD)^0.4 * (HCS)^0.3 * (1 + Burn_t)^0.3

## Backend Data Storage
The backend stores:
- Complete simulation state for all 1,000 users
- Historical data for HCS, CW, and GDP calculations
- Daily simulation results and aggregated metrics
- Timeline progression and milestone events

## Backend Operations
- Execute daily simulation steps for entire population
- Calculate aggregate HCS averages
- Compute total Community Wealth
- Generate GDP index progression
- Handle 2035 Burn Event milestone
- Provide simulation output endpoints
- Initialize user population with `initializeUsers()` function
- Run batch simulation for specified number of days

## Frontend Features
- Japanese language interface
- Simulation control panel with "βテスト開始" button
- Beta test mode that initializes users and runs 30 simulated days
- Confirmation toast message: "βテストモード起動：PoHDシミュレーションが開始されました。"
- Real-time visualization charts:
  - HCS growth curve over time
  - Total Community Wealth (displayed in millions)
  - GDP index evolution with 2035 milestone marker
- Timeline display (2026-2040)
- Simulation progress indicators

## GitHub Project Structure
The application includes a complete GitHub-ready project structure under `PoHD-simulation-v1`:

### Documentation Files
- **README.md**: Comprehensive project introduction in Japanese including:
  - Simulation purpose and overview
  - Mathematical model description with key parameters (α, β, γ, burn event)
  - **βテスト開始ガイド** section with detailed step-by-step setup:
    - Local development environment setup instructions
    - GitHub Actions CI/CD workflow explanation
    - Simulation execution guide
    - Chart interpretation guidelines
  - Beta Tester Quick Start section with step-by-step instructions:
    - Repository cloning commands
    - `dfx start` setup instructions
    - `pnpm run dev` development server launch
    - Dashboard simulation trigger guide
  - Cross-links to all major documentation files
  - Version information and usage instructions
- **LICENSE**: CC BY 4.0 license file
- **/docs/PoHD_v1.1_ModelSpec.md**: Mathematical equations summary (定理4,6,およびマクロ経済モデル) and Motoko implementation logic with cross-links to other documentation
- **/docs/simulation_results.md**: Template for testers to record HCS, CW, and GDP results with cross-links to beta test manual
- **/docs/beta_test_manual.md**: Comprehensive beta testing workflow guide including:
  - User initialization procedures
  - Daily simulation execution steps
  - HCS/CW/GDP result logging instructions
  - Finding submission guidelines using simulation_results.md
  - Cross-links to all related documentation

### Documentation Cross-Linking
All major documentation files include bidirectional cross-references:
- README.md links to PoHD_v1.1_ModelSpec.md, simulation_results.md, and beta_test_manual.md
- PoHD_v1.1_ModelSpec.md links back to README.md and references simulation_results.md
- beta_test_manual.md links to simulation_results.md and README.md
- simulation_results.md references beta_test_manual.md for workflow context

### CI/CD Configuration
- **.github/workflows/deploy.yml**: GitHub Actions workflow for building frontend and backend using `dfx build` on pushes to `main` branch

## Simulation Outputs
The system provides endpoints for:
- Average HCS over time
- Total Community Wealth aggregation
- GDP index progression with yearly evolution
- Population-wide statistics and trends
- Beta test initialization and batch simulation results

## Language Requirements
All documentation and application content must be consistently in Japanese with technical accuracy and publication-ready formatting suitable for GitHub repositories.
