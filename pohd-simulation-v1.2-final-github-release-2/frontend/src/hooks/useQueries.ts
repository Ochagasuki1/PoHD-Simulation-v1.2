import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useInitializeUsers() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.initializeUsers();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulation'] });
    },
  });
}

export function useRunDailyStep() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.runDailyStep();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulation'] });
    },
  });
}

export function useResetSimulation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.resetSimulation();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulation'] });
    },
  });
}

export function useSimulationState() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['simulation', 'state'],
    queryFn: async () => {
      if (!actor) return null;
      
      const [
        currentDay,
        currentYear,
        userCount,
        averageHCS,
        totalVDF,
        totalCW,
        gdpIndex,
      ] = await Promise.all([
        actor.getCurrentDay(),
        actor.getCurrentYearQuery(),
        actor.getUserCount(),
        actor.getAverageHCS(),
        actor.getTotalVDF(),
        actor.getTotalCW(),
        actor.getGDPIndex(),
      ]);

      return {
        currentDay: Number(currentDay),
        currentYear: Number(currentYear),
        userCount: Number(userCount),
        averageHCS,
        totalVDF,
        totalCW,
        gdpIndex,
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: false,
  });
}

export function useHistoricalData() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['simulation', 'historical'],
    queryFn: async () => {
      if (!actor) return null;
      
      const [hcsData, cwData, gdpData] = await Promise.all([
        actor.getHistoricalHCS(),
        actor.getHistoricalCW(),
        actor.getHistoricalGDP(),
      ]);

      return {
        hcs: hcsData,
        cw: cwData,
        gdp: gdpData,
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: false,
  });
}
