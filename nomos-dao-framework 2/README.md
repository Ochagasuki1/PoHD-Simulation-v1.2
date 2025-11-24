# Nomos DAO Framework

**Modular DAO Framework for Web2 Communities with Proof of Intentionality**

<div align="center">
  <img src="./assets/generated/nomos-logo-transparent.png" alt="Nomos DAO Framework Logo" width="200"/>
</div>

---

## 🌟 Overview

Nomos DAO Framework is an **open-source, modular governance system** that brings decentralized autonomous organization capabilities to Web2 communities. Built with a unique **3-layer architecture**, the framework enables seamless integration with platforms like TikTok, YouTube, and other social media ecosystems through its innovative **engine-swapping architecture** and **Proof of Intentionality** mechanism.

<div align="center">
  <img src="./assets/generated/dashboard-mockup.png" alt="Dashboard Mockup" width="800"/>
</div>

The framework consists of three independent repositories:

- **[nomos-core](https://github.com/your-org/nomos-core)** — Motoko backend implementing core DAO logic, Proof of Intentionality mechanisms, and the 3-layer architecture
- **[nomos-engines](https://github.com/your-org/nomos-engines)** — Platform-specific engine modules for TikTok, YouTube, and other Web2 communities
- **[nomos-ui](https://github.com/your-org/nomos-ui)** — React frontend providing visualization, management interface, and user experience

---

## 🏗️ Architecture

Nomos DAO Framework implements a **3-layer modular architecture** that separates concerns and enables flexible, scalable DAO operations:

<div align="center">
  <img src="./assets/generated/dao-network-hero.png" alt="DAO Network Architecture" width="700"/>
</div>

### Layer 1: Engine Layer
The foundation of platform-specific logic and rules.

- **Swappable DAO logic modules** for different Web2 platforms
- Platform-specific engagement rules and metrics
- Standardized API interfaces for engine interoperability
- Hot-swappable architecture via GUI or DAO voting

<div align="center">
  <img src="./assets/generated/engine-swap-icon-transparent.png" alt="Engine Swap Icon" width="64"/>
  <p><em>Engine swapping enables seamless platform transitions</em></p>
</div>

### Layer 2: Engine Output Layer
Standardized metrics and influence calculation.

- **Influence Score** calculation and management
- **Voting Power** computation based on community engagement
- Standardized output format for governance layer
- Real-time metrics visualization and tracking
- Cross-engine data normalization

### Layer 3: Governance & Distribution Layer
Automated governance and reward distribution.

- **Reward Pool** management system
- **Automated reward distribution** based on Layer 2 outputs
- **DAO voting and governance** mechanisms
- Distribution ratio calculation and history tracking
- Transparent governance based on Proof of Intentionality

---

## ✨ Key Features

### 🔄 Modular Engine Swapping
- **Hot-swappable engines** for different Web2 platforms (TikTok, YouTube, etc.)
- Switch engines via GUI or DAO voting mechanisms
- Independent engine development and community contribution
- Platform-specific logic encapsulation without core changes

### 🔌 API Connector System ("Fuel Hose")
- **External API integration** for TikTok, YouTube, and more
- **OAuth2 and API key authentication** support
- Secure token management with auto-refresh capabilities
- Pre-configured templates for popular platforms
- Extensible connector architecture for custom integrations

### 🗳️ Proof of Intentionality
- Transparent governance based on verified community engagement
- Multi-dimensional influence scoring system
- Weighted voting power calculation
- Automated reward distribution aligned with contribution
- Fair and transparent decision-making processes

### 🌐 Internet Computer Backend
- Built on the **Internet Computer Protocol** for true decentralization
- Decentralized data persistence with canister architecture
- Secure, tamper-proof smart contract execution
- Scalable and cost-effective infrastructure
- No traditional cloud hosting dependencies

### 📊 Comprehensive Dashboard
- Real-time Layer 2 and Layer 3 metrics visualization
- Member influence scores and voting power display
- Reward pool status and distribution tracking
- Active votes and governance overview
- Intuitive admin controls for DAO management

### 🔐 Internet Identity Authentication
- Secure, privacy-preserving authentication
- No passwords or email required
- Cross-device identity management
- Role-based access control (Admin, User, Guest)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and **pnpm** (or npm)
- **DFX SDK** for Internet Computer development ([Install DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install/))
- **Git** for version control

### Quick Start

#### 1. Clone the Repositories

