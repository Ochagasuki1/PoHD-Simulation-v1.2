import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Key, ExternalLink } from 'lucide-react';
import { useGetApiConnectorsByEngine } from '../hooks/useQueries';
import AddApiConnectorDialog from './AddApiConnectorDialog';
import UpdateTokenDialog from './UpdateTokenDialog';
import type { ApiConnector } from '../backend';

interface ApiConnectorManagerProps {
  engineId: string;
  isAdmin: boolean;
}

export default function ApiConnectorManager({ engineId, isAdmin }: ApiConnectorManagerProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [updateTokenDialogOpen, setUpdateTokenDialogOpen] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<ApiConnector | null>(null);
  const { data: connectors = [], isLoading } = useGetApiConnectorsByEngine(engineId);

  const handleUpdateToken = (connector: ApiConnector) => {
    setSelectedConnector(connector);
    setUpdateTokenDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {connectors.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground mb-3">
              APIコネクタが登録されていません
            </p>
            {isAdmin && (
              <Button 
                onClick={() => setAddDialogOpen(true)} 
                size="sm" 
                variant="outline"
                className="gap-2"
              >
                <Plus className="h-3 w-3" />
                コネクタ追加
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {connectors.map((connector) => (
                <div 
                  key={connector.id} 
                  className="p-3 rounded-lg border border-border/50 bg-background/50 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-medium truncate">{connector.id}</p>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {connector.authType}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {connector.baseUrl}
                      </p>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-2" />
                  </div>
                  {connector.accessToken && (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Key className="h-3 w-3" />
                      <span>トークン設定済み</span>
                    </div>
                  )}
                  {isAdmin && (
                    <Button
                      onClick={() => handleUpdateToken(connector)}
                      size="sm"
                      variant="ghost"
                      className="w-full h-7 text-xs gap-1"
                    >
                      <Key className="h-3 w-3" />
                      トークン更新
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {isAdmin && (
              <Button 
                onClick={() => setAddDialogOpen(true)} 
                size="sm" 
                variant="outline"
                className="w-full gap-2"
              >
                <Plus className="h-3 w-3" />
                コネクタ追加
              </Button>
            )}
          </>
        )}
      </div>

      {isAdmin && (
        <>
          <AddApiConnectorDialog
            engineId={engineId}
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
          />
          {selectedConnector && (
            <UpdateTokenDialog
              connector={selectedConnector}
              open={updateTokenDialogOpen}
              onOpenChange={setUpdateTokenDialogOpen}
            />
          )}
        </>
      )}
    </>
  );
}
