# Nomos DAO Framework - Technical Specification

**Version:** 1.0  
**Last Updated:** November 23, 2025  
**License:** MIT License

---

## Overview

Nomos DAO Framework is an open modular DAO framework designed for Web2 communities. It implements Proof of Intentionality and a swappable engine architecture, enabling DAO operations tailored to various Web2 communities such as TikTok and YouTube. The framework adopts a 3-layer architecture:

- **Layer 1**: Engine Layer (swappable DAO logic modules)
- **Layer 2**: Engine Output Layer (voting power, influence scores, metrics visualization)
- **Layer 3**: Governance and Distribution Layer (reward pools, automated distribution logic, DAO voting/governance features)

---

## Architecture

The framework consists of three independent repositories:

### 1. nomos-core (Backend)

**Repository Role:** Core backend system for DAO management, voting systems, and data persistence.

**Key Features:**
- Implemented in Motoko for the Internet Computer
- Proof of Intentionality mechanism implementation
- Modular engine swapping architecture
- 3-layer architecture implementation (Layer 1-3)
- DAO data persistence (DAO settings, member information, voting history)
- Engine registration and management
- Voting system foundation
- API connector module (engines can register external REST API endpoints)

#### Layer 2: Engine Output Layer

Handles voting power, influence scores, and metrics visualization:

- Standardized engine output interface
- Influence score calculation and management
- Voting power computation
- Data standardization across engines
- Provides standardized data to Layer 3
- Metrics visualization data processing

#### Layer 3: Governance and Distribution Layer

Covers reward pools, automated distribution logic, and DAO voting/governance features:

- Reward pool management system
- Automated reward distribution mechanism
- Voting governance logic utilizing Layer 2 outputs
- Distribution ratio calculation and management
- Active vote management
- Integrated DAO voting and governance features

### 2. nomos-engines (Engine Modules)

**Repository Role:** Collection of swappable DAO logic modules for Web2 platform integrations.

**Key Features:**
- Collection of swappable DAO logic modules
- Platform-specific engines (TikTok, YouTube, etc.)
- Each engine provides independent logic and rule sets
- Standardized API interface
- Provides standardized outputs to Layer 2

### 3. nomos-ui (Frontend - Independent Repository)

**Repository Role:** Independent frontend repository for UI/UX, design system, and user interface.

**Key Features:**
- Fully independent frontend repository implemented in React + TypeScript + Tailwind CSS
- Independent design system and UI/UX architecture
- DAO visualization and management interface
- Engine switching functionality (GUI operation or voting-based)
- Japanese language support
- API connector management UI
- Layer 2 and Layer 3 metrics visualization dashboard
- Independent development, deployment, and contribution structure

---

## nomos-ui Repository Details

### Repository Purpose and Architecture Overview

nomos-ui is a completely independent frontend-only repository:

- Provides the user interface for the entire framework
- Handles communication with nomos-core backend
- Independent development, deployment, and contribution structure
- Extensibility through modular architecture
- 3-layer architecture visualization capabilities

### Communication Structure

Communication between nomos-ui and nomos-core:

- Abstraction through dedicated API client layer
- Communication via HTTPS calls or local identity
- Backend independence through standardized interfaces
- Error handling and retry functionality
- Layer 2 and Layer 3 data retrieval and display

### Theme and Design System Autonomy

Independent design system:

- Tailwind CSS + Shadcn/ui setup
- Custom color palette and typography
- Japanese font optimization
- Responsive design tokens
- Independent component library management

### Setup and Integration Workflow

Developer setup instructions:

- Independent clone and installation procedures
- Backend canister connection via environment variables
- Local development environment setup
- Backend binding process
- Detailed README documentation and setup guides

---

## Frontend Structure

### Folder Structure

