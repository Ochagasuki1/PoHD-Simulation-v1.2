import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { ArrowRight, Github, Boxes, Zap } from 'lucide-react';

export default function Hero() {
  const { login, loginStatus } = useInternetIdentity();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />
      <div className="absolute inset-0 bg-[url('/assets/generated/dao-network-hero.dim_800x600.png')] bg-cover bg-center opacity-10" />
      
      <div className="container relative mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Zap className="h-4 w-4" />
            Web2コミュニティ向けモジュラーDAO
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Nomos DAO Framework
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Proof of Intentionalityとエンジン交換アーキテクチャを実装した、
            次世代のモジュラー型DAOフレームワーク
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={handleLogin}
              disabled={loginStatus === 'logging-in'}
              className="gap-2 text-lg px-8"
            >
              今すぐ始める
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-6 pt-16">
            <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                <Boxes className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg">モジュラー設計</h3>
              <p className="text-sm text-muted-foreground">
                交換可能なエンジンで様々なWeb2コミュニティに対応
              </p>
            </div>

            <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto">
                <img src="/assets/generated/engine-swap-icon-transparent.dim_64x64.png" alt="Engine" className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">エンジン交換</h3>
              <p className="text-sm text-muted-foreground">
                GUI操作または投票でエンジンを簡単に切り替え
              </p>
            </div>

            <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg">Proof of Intentionality</h3>
              <p className="text-sm text-muted-foreground">
                意図の証明メカニズムで透明性の高いガバナンス
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
