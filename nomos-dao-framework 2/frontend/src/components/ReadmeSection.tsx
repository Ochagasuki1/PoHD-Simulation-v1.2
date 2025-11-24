import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function ReadmeSection() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const readmeContent = `# Nomos DAO Framework

**Proof of Intentionality for Web2 Communities**

<div align="center">
  <img src="./assets/generated/nomos-logo-transparent.png" alt="Nomos DAO Framework Logo" width="200"/>
</div>

---

## 🌟 Overview

Nomos DAO Framework is an **open-source, modular governance system** designed to bring decentralized autonomous organization capabilities to Web2 communities. Built with a unique **3-layer architecture**, the framework enables seamless integration with platforms like TikTok, YouTube, and other social media ecosystems.

The framework consists of three independent repositories:

- **[nomos-core](https://github.com/your-org/nomos-core)** — Motoko backend implementing core DAO logic, Proof of Intentionality mechanisms, and the 3-layer architecture
- **[nomos-engines](https://github.com/your-org/nomos-engines)** — Platform-specific engine modules for TikTok, YouTube, and other Web2 communities
- **[nomos-ui](https://github.com/your-org/nomos-ui)** — React frontend providing visualization, management interface, and user experience

<div align="center">
  <img src="./assets/generated/dashboard-mockup.png" alt="Dashboard Mockup" width="800"/>
</div>

---

## 🏗️ Architecture

Nomos DAO Framework implements a **3-layer modular architecture**:

### Layer 1: Engine Layer
- Swappable DAO logic modules for different Web2 platforms
- Platform-specific rules and engagement metrics
- Standardized API interfaces for engine interoperability

<div align="center">
  <img src="./assets/generated/engine-swap-icon-transparent.png" alt="Engine Swap Icon" width="64"/>
</div>

### Layer 2: Engine Output Layer
- **Influence Score** calculation and management
- **Voting Power** computation based on community engagement
- Standardized output format for governance layer
- Real-time metrics visualization

### Layer 3: Governance & Distribution Layer
- **Reward Pool** management system
- **Automated reward distribution** based on Layer 2 outputs
- **DAO voting and governance** mechanisms
- Distribution ratio calculation and history tracking

<div align="center">
  <img src="./assets/generated/dao-network-hero.png" alt="DAO Network Architecture" width="600"/>
</div>

---

## ✨ Key Features

### 🔄 Modular Engine Swapping
- **Hot-swappable engines** for different Web2 platforms
- Switch engines via GUI or DAO voting
- Independent engine development and contribution
- Platform-specific logic encapsulation

### 🔌 API Connector System ("Fuel Hose")
- **External API integration** for TikTok, YouTube, and more
- **OAuth2 and API key authentication** support
- Secure token management and auto-refresh
- Pre-configured templates for popular platforms

### 🗳️ Proof of Intentionality
- Transparent governance based on community engagement
- Influence scoring system
- Weighted voting power calculation
- Automated reward distribution

### 🌐 Internet Computer Backend
- Built on the **Internet Computer Protocol**
- Decentralized data persistence
- Secure canister-based architecture
- Scalable and cost-effective infrastructure

### 📊 Comprehensive Dashboard
- Real-time Layer 2 and Layer 3 metrics visualization
- Member influence scores and voting power display
- Reward pool and distribution tracking
- Active votes and governance overview

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- DFX SDK (for Internet Computer development)
- Git

### Quick Start

1. **Clone the repositories:**
   \`\`\`bash
   git clone https://github.com/your-org/nomos-core.git
   git clone https://github.com/your-org/nomos-engines.git
   git clone https://github.com/your-org/nomos-ui.git
   \`\`\`

2. **Set up the backend (nomos-core):**
   \`\`\`bash
   cd nomos-core
   dfx start --background
   dfx deploy
   \`\`\`

3. **Set up the frontend (nomos-ui):**
   \`\`\`bash
   cd nomos-ui/frontend
   pnpm install
   pnpm start
   \`\`\`

4. **Access the application:**
   Open your browser and navigate to \`http://localhost:3000\`

For detailed setup instructions, see:
- [Frontend README](./frontend/README.md)
- [Technical Specification](./TECHNICAL_SPECIFICATION.md)

---

## 📚 Documentation

- **[Technical Specification](./TECHNICAL_SPECIFICATION.md)** — Complete technical documentation
- **[Frontend README](./frontend/README.md)** — Frontend setup and architecture
- **[License](./LICENSE)** — MIT License details

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or creating new engine modules, your help is appreciated.

### How to Contribute
1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

**Copyright (c) 2025 Ochagasuki1, caffeine.ai, Grok, Open AI**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🌐 Community & Support

- **GitHub Issues:** [Report bugs or request features](https://github.com/your-org/nomos-core/issues)
- **Discussions:** [Join the conversation](https://github.com/your-org/nomos-core/discussions)

---

## 🙏 Acknowledgments

Built with ❤️ using [caffeine.ai](https://caffeine.ai)

**Open Modular DAO Framework for Web2 Communities**

---

## 🗺️ Roadmap

- [x] Core 3-layer architecture implementation
- [x] Internet Identity authentication
- [x] Layer 2 and Layer 3 metrics visualization
- [x] API connector system with OAuth2 support
- [ ] TikTok engine implementation
- [ ] YouTube engine implementation
- [ ] Multi-language support (Japanese, English, Spanish)
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Cross-chain bridge integration

---

<div align="center">
  <strong>Star ⭐ this repository if you find it useful!</strong>
</div>`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>GitHub README Front Section</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(readmeContent, 'readme')}
              className="gap-2"
            >
              {copiedSection === 'readme' ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy All
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Usage Instructions:</strong>
              </p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Copy the entire README content using the button above</li>
                <li>Create or replace your <code className="bg-background px-1 rounded">README.md</code> file in the project root</li>
                <li>Paste the content into the file</li>
                <li>Update repository URLs (replace <code className="bg-background px-1 rounded">your-org</code> with your GitHub organization/username)</li>
                <li>Ensure all image assets are in the correct paths (<code className="bg-background px-1 rounded">./assets/generated/</code>)</li>
                <li>Commit and push to GitHub</li>
              </ol>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="flex items-start gap-4">
                <img 
                  src="/assets/generated/nomos-logo-transparent.png" 
                  alt="Nomos Logo" 
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Nomos DAO Framework</h3>
                  <p className="text-sm text-muted-foreground">
                    Proof of Intentionality for Web2 Communities
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">📋 README Sections Included:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Title and tagline with logo</li>
                    <li>Overview of modular architecture</li>
                    <li>Visual banners (logo, dashboard mockup, network hero, engine swap icon)</li>
                    <li>3-layer architecture explanation</li>
                    <li>Key features (engine swapping, API connectors, Proof of Intentionality)</li>
                    <li>Getting started guide with quick start commands</li>
                    <li>Documentation links</li>
                    <li>Contributing guidelines</li>
                    <li>MIT License notice with copyright</li>
                    <li>Community and support information</li>
                    <li>Roadmap</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <h4 className="font-medium mb-2">🖼️ Visual Assets Used:</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <img 
                        src="/assets/generated/nomos-logo-transparent.png" 
                        alt="Logo" 
                        className="h-20 w-20 object-contain mx-auto mb-2 border rounded-lg p-2"
                      />
                      <p className="text-xs text-muted-foreground">Logo</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src="/assets/generated/dashboard-mockup.png" 
                        alt="Dashboard" 
                        className="h-20 w-full object-cover mx-auto mb-2 border rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground">Dashboard</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src="/assets/generated/dao-network-hero.png" 
                        alt="Network" 
                        className="h-20 w-full object-cover mx-auto mb-2 border rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground">Network</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src="/assets/generated/engine-swap-icon-transparent.png" 
                        alt="Engine Swap" 
                        className="h-20 w-20 object-contain mx-auto mb-2 border rounded-lg p-2"
                      />
                      <p className="text-xs text-muted-foreground">Engine Swap</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  <span>
                    This README is optimized for GitHub presentation with Markdown formatting,
                    visual appeal, and comprehensive documentation.
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="font-medium mb-2 text-sm">Preview (Markdown):</h4>
              <pre className="text-xs bg-background p-4 rounded overflow-x-auto max-h-96 overflow-y-auto">
                {readmeContent}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
