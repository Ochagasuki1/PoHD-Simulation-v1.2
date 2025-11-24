import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { getNomosCoreClient } from '../api/nomos-core-client';
import type { DaoInfo, EngineInfo, UserProfile, VoteRecord, ApiConnector, Layer2Output, Layer3Data } from '../backend';
import { UserRole } from '../backend';
import { toast } from 'sonner';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const client = getNomosCoreClient(actor);

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      return client.getCallerUserProfile();
    },
    enabled: client.isReady() && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: client.isReady() && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      return client.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('プロファイルを保存しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<UserRole>({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      if (!client.isReady()) return UserRole.guest;
      return client.getCallerUserRole();
    },
    enabled: client.isReady() && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!client.isReady()) return false;
      return client.isCallerAdmin();
    },
    enabled: client.isReady() && !isFetching,
  });
}

// DAO Info Queries
export function useGetDaoInfo() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<DaoInfo | null>({
    queryKey: ['daoInfo'],
    queryFn: async () => {
      if (!client.isReady()) return null;
      return client.getDaoInfo();
    },
    enabled: client.isReady() && !isFetching,
  });
}

export function useSetDaoInfo() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (info: DaoInfo) => {
      return client.setDaoInfo(info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daoInfo'] });
      toast.success('DAO情報を更新しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}

// Engine Queries
export function useGetAvailableEngines() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<EngineInfo[]>({
    queryKey: ['availableEngines'],
    queryFn: async () => {
      if (!client.isReady()) return [];
      return client.getAvailableEngines();
    },
    enabled: client.isReady() && !isFetching,
  });
}

export function useGetActiveEngine() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<EngineInfo | null>({
    queryKey: ['activeEngine'],
    queryFn: async () => {
      if (!client.isReady()) return null;
      return client.getActiveEngine();
    },
    enabled: client.isReady() && !isFetching,
  });
}

export function useAddEngine() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (engine: EngineInfo) => {
      return client.addEngine(engine);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableEngines'] });
      toast.success('エンジンを追加しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}

export function useSetActiveEngine() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (engineId: string) => {
      return client.setActiveEngine(engineId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeEngine'] });
      toast.success('アクティブエンジンを変更しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}

// Vote Queries
export function useGetVoteHistory() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<VoteRecord[]>({
    queryKey: ['voteHistory'],
    queryFn: async () => {
      if (!client.isReady()) return [];
      return client.getVoteHistory('');
    },
    enabled: client.isReady() && !isFetching,
  });
}

export function useAddVoteRecord() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, vote }: { proposalId: string; vote: boolean }) => {
      return client.addVoteRecord(proposalId, vote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voteHistory'] });
      toast.success('投票を記録しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}

// API Connector Queries
export function useGetApiConnectorsByEngine(engineId: string) {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<ApiConnector[]>({
    queryKey: ['apiConnectors', engineId],
    queryFn: async () => {
      if (!client.isReady()) return [];
      return client.getApiConnectorsByEngine(engineId);
    },
    enabled: client.isReady() && !isFetching && !!engineId,
  });
}

export function useAddApiConnector() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connector: ApiConnector) => {
      return client.addApiConnector(connector);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['apiConnectors', variables.engineId] });
      toast.success('APIコネクタを追加しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}

export function useUpdateApiConnectorAuth() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newToken }: { id: string; newToken: string }) => {
      return client.updateApiConnectorAuth(id, newToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiConnectors'] });
      toast.success('認証トークンを更新しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}

export function useGetTikTokConnectorTemplate() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<ApiConnector>({
    queryKey: ['tiktokTemplate'],
    queryFn: async () => {
      return client.getTikTokConnectorTemplate();
    },
    enabled: client.isReady() && !isFetching,
  });
}

// Layer 2 Queries
export function useGetLayer2Outputs() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<Layer2Output[]>({
    queryKey: ['layer2Outputs'],
    queryFn: async () => {
      if (!client.isReady()) return [];
      return client.getLayer2Outputs();
    },
    enabled: client.isReady() && !isFetching,
  });
}

export function useAddLayer2Output() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (output: Layer2Output) => {
      return client.addLayer2Output(output);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layer2Outputs'] });
      toast.success('Layer 2出力を追加しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}

// Layer 3 Queries
export function useGetLayer3Data() {
  const { actor, isFetching } = useActor();
  const client = getNomosCoreClient(actor);

  return useQuery<Layer3Data | null>({
    queryKey: ['layer3Data'],
    queryFn: async () => {
      if (!client.isReady()) return null;
      return client.getLayer3Data();
    },
    enabled: client.isReady() && !isFetching,
  });
}

export function useSetLayer3Data() {
  const { actor } = useActor();
  const client = getNomosCoreClient(actor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Layer3Data) => {
      return client.setLayer3Data(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layer3Data'] });
      toast.success('Layer 3データを更新しました');
    },
    onError: (error: Error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });
}
