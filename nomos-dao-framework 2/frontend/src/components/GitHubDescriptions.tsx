import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Github, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const SHORT_DESCRIPTION = "Modular DAO framework for Web2 communities with Proof of Intentionality, 3-layer architecture, and swappable engines for TikTok, YouTube, and other platforms.";

const EXTENDED_DESCRIPTION = "Nomos DAO Framework is a modular governance system that brings decentralized autonomous organization capabilities to Web2 communities through Proof of Intentionality mechanisms. Built with a 3-layer architecture and swappable engine system, it enables seamless integration with platforms like TikTok, YouTube, and other social media ecosystems. Perfect for content creators and community managers looking to implement transparent, automated governance without requiring deep blockchain knowledge.";

const LONG_DESCRIPTION = `Nomos DAO Framework is an open-source, modular governance system designed to bring decentralized autonomous organization capabilities to Web2 communities. Built with a unique 3-layer architecture (Engine Layer, Output Layer, Governance & Distribution Layer), the framework enables seamless integration with platforms like TikTok, YouTube, and other social media ecosystems.

Key features include Proof of Intentionality mechanisms, swappable engine architecture for platform-specific logic, automated reward distribution, and comprehensive governance tools. The framework consists of three independent repositories: nomos-core (Motoko backend), nomos-engines (platform modules), and nomos-ui (React frontend), enabling independent development and contribution workflows.

Perfect for content creators, community managers, and Web2 platforms looking to implement transparent, automated governance and reward systems without requiring deep blockchain knowledge.`;

export default function GitHubDescriptions() {
  const [copiedShort, setCopiedShort] = useState(false);
  const [copiedExtended, setCopiedExtended] = useState(false);
  const [copiedLong, setCopiedLong] = useState(false);

  const copyToClipboard = async (text: string, type: 'short' | 'extended' | 'long') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'short') {
        setCopiedShort(true);
        setTimeout(() => setCopiedShort(false), 2000);
      } else if (type === 'extended') {
        setCopiedExtended(true);
        setTimeout(() => setCopiedExtended(false), 2000);
      } else {
        setCopiedLong(true);
        setTimeout(() => setCopiedLong(false), 2000);
      }
      toast.success('Copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Github className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">GitHub Repository Descriptions</h2>
          <p className="text-muted-foreground">Three versions for different use cases</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Short Description Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Short Description</CardTitle>
              </div>
              <Badge variant="outline">Concise</Badge>
            </div>
            <CardDescription>One-line description for repository header</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">English Version</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(SHORT_DESCRIPTION, 'short')}
                  className="gap-2"
                >
                  {copiedShort ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                <p className="text-sm leading-relaxed">{SHORT_DESCRIPTION}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Usage</p>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-sm leading-relaxed text-foreground/90">
                  This concise description appears at the top of your GitHub repository. It captures the core features (modular design, Web2 community support, Proof of Intentionality, 3-layer architecture, swappable engines) in one sentence, including specific platform names like TikTok and YouTube to immediately communicate value to target users.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Extended Description Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Extended Description</CardTitle>
              </div>
              <Badge variant="outline">Expanded</Badge>
            </div>
            <CardDescription>2-3 sentence summary for About section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">English Version</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(EXTENDED_DESCRIPTION, 'extended')}
                  className="gap-2"
                >
                  {copiedExtended ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                <p className="text-sm leading-relaxed">{EXTENDED_DESCRIPTION}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Usage</p>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-sm leading-relaxed text-foreground/90">
                  This extended description is ideal for GitHub's About section. It clearly explains the project's mission (bringing DAO capabilities to Web2 communities), technical features (Proof of Intentionality, 3-layer architecture, swappable engines), and target users (content creators, community managers). It also emphasizes accessibility by noting that deep blockchain knowledge is not required, appealing to Web2 users.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Long Description Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Long Description</CardTitle>
              </div>
              <Badge variant="outline">Detailed</Badge>
            </div>
            <CardDescription>Comprehensive overview for About section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">English Version</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(LONG_DESCRIPTION, 'long')}
                  className="gap-2"
                >
                  {copiedLong ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border border-border/50 max-h-64 overflow-y-auto">
                <p className="text-sm leading-relaxed whitespace-pre-line">{LONG_DESCRIPTION}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Usage</p>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-sm leading-relaxed text-foreground/90">
                  This comprehensive description is perfect for GitHub's About section. It clearly explains the project's mission (bringing DAO capabilities to Web2 communities), technical architecture (3-layer structure and modular design), key features, and target users (content creators, community managers, Web2 platforms). It also mentions the open-source nature and independent repository structure, communicating value to potential contributors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">How to Use These Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">1. Setting the Short Description</p>
              <p className="text-sm text-muted-foreground pl-4">
                Click the gear icon in the "About" section at the top right of your GitHub repository page, then paste it into the "Description" field.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">2. Using the Extended Description</p>
              <p className="text-sm text-muted-foreground pl-4">
                Use this as a concise summary in GitHub's About section. It's perfect when you need more detail than the Short Description but want to keep it brief.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">3. Using the Long Description</p>
              <p className="text-sm text-muted-foreground pl-4">
                Use this at the beginning of your README.md file or as a detailed explanation in the About section.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
