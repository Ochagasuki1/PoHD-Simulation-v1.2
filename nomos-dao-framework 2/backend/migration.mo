import OrderedMap "mo:base/OrderedMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {
  type OldDaoInfo = {
    name : Text;
    description : Text;
    settings : Text;
  };

  type OldEngineInfo = {
    id : Text;
    name : Text;
    description : Text;
    settings : Text;
  };

  type OldVoteRecord = {
    proposalId : Text;
    voter : Principal;
    vote : Bool;
    timestamp : Int;
  };

  type OldUserProfile = {
    name : Text;
    role : {
      #admin;
      #user;
      #guest;
    };
  };

  type OldApiConnector = {
    id : Text;
    engineId : Text;
    baseUrl : Text;
    authType : Text;
    accessToken : ?Text;
    settings : Text;
  };

  type OldActor = {
    daoInfo : ?OldDaoInfo;
    activeEngine : ?OldEngineInfo;
    availableEngines : OrderedMap.Map<Text, OldEngineInfo>;
    voteHistory : OrderedMap.Map<Text, [OldVoteRecord]>;
    userProfiles : OrderedMap.Map<Principal, OldUserProfile>;
    apiConnectors : OrderedMap.Map<Text, OldApiConnector>;
  };

  type NewDaoInfo = {
    name : Text;
    description : Text;
    settings : Text;
  };

  type NewEngineInfo = {
    id : Text;
    name : Text;
    description : Text;
    settings : Text;
  };

  type NewVoteRecord = {
    proposalId : Text;
    voter : Principal;
    vote : Bool;
    timestamp : Int;
  };

  type NewUserProfile = {
    name : Text;
    role : {
      #admin;
      #user;
      #guest;
    };
  };

  type NewApiConnector = {
    id : Text;
    engineId : Text;
    baseUrl : Text;
    authType : Text;
    accessToken : ?Text;
    settings : Text;
  };

  type Layer2Output = {
    memberId : Principal;
    influenceScore : Nat;
    votingPower : Nat;
    engineMetrics : Text;
  };

  type Layer3Data = {
    rewardPool : Nat;
    distributionRatios : Text;
    activeVotes : Nat;
    distributionHistory : Text;
  };

  type NewActor = {
    daoInfo : ?NewDaoInfo;
    activeEngine : ?NewEngineInfo;
    availableEngines : OrderedMap.Map<Text, NewEngineInfo>;
    voteHistory : OrderedMap.Map<Text, [NewVoteRecord]>;
    userProfiles : OrderedMap.Map<Principal, NewUserProfile>;
    apiConnectors : OrderedMap.Map<Text, NewApiConnector>;
    layer2Outputs : OrderedMap.Map<Principal, Layer2Output>;
    layer3Data : ?Layer3Data;
  };

  public func run(old : OldActor) : NewActor {
    let principalMap = OrderedMap.Make<Principal>(Principal.compare);
    {
      daoInfo = old.daoInfo;
      activeEngine = old.activeEngine;
      availableEngines = old.availableEngines;
      voteHistory = old.voteHistory;
      userProfiles = old.userProfiles;
      apiConnectors = old.apiConnectors;
      layer2Outputs = principalMap.empty<Layer2Output>();
      layer3Data = null;
    };
  };
};
