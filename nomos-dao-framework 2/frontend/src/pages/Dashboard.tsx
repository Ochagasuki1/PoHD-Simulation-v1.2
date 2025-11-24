import DaoOverview from '../components/DaoOverview';
import EngineManager from '../components/EngineManager';
import Layer2Metrics from '../components/Layer2Metrics';
import Layer3Metrics from '../components/Layer3Metrics';
import { 
  useGetDaoInfo, 
  useGetActiveEngine, 
  useGetAvailableEngines, 
  useGetCallerUserProfile,
  useGetLayer2Outputs,
  useGetLayer3Data
} from '../hooks/useQueries';

export default function Dashboard() {
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: daoInfo } = useGetDaoInfo();
  const { data: activeEngine } = useGetActiveEngine();
  const { data: availableEngines } = useGetAvailableEngines();
  const { data: layer2Outputs } = useGetLayer2Outputs();
  const { data: layer3Data } = useGetLayer3Data();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <DaoOverview 
        daoInfo={daoInfo} 
        activeEngine={activeEngine}
        userProfile={userProfile}
      />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Layer2Metrics outputs={layer2Outputs || []} />
        <Layer3Metrics data={layer3Data} />
      </div>

      <EngineManager 
        activeEngine={activeEngine}
        availableEngines={availableEngines || []}
        userProfile={userProfile}
      />
    </div>
  );
}
