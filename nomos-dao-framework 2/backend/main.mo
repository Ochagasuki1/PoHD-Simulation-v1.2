import AccessControl "authorization/access-control";
import Principal "mo:base/Principal";
import OrderedMap "mo:base/OrderedMap";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Migration "migration";

(with migration = Migration.run)
actor NomosCore {
  // アクセスコントロール状態の初期化
  let accessControlState = AccessControl.initState();

  // DAO情報型
  public type DaoInfo = {
    name : Text;
    description : Text;
    settings : Text;
  };

  // エンジン情報型
  public type EngineInfo = {
    id : Text;
    name : Text;
    description : Text;
    settings : Text;
  };

  // 投票履歴型
  public type VoteRecord = {
    proposalId : Text;
    voter : Principal;
    vote : Bool;
    timestamp : Int;
  };

  // ユーザープロファイル型
  public type UserProfile = {
    name : Text;
    role : AccessControl.UserRole;
  };

  // APIコネクタ型
  public type ApiConnector = {
    id : Text;
    engineId : Text;
    baseUrl : Text;
    authType : Text;
    accessToken : ?Text;
    settings : Text;
  };

  // Layer 2: エンジン出力層データ型
  public type Layer2Output = {
    memberId : Principal;
    influenceScore : Nat;
    votingPower : Nat;
    engineMetrics : Text;
  };

  // Layer 3: ガバナンス・配布層データ型
  public type Layer3Data = {
    rewardPool : Nat;
    distributionRatios : Text;
    activeVotes : Nat;
    distributionHistory : Text;
  };

  // OrderedMapの初期化
  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);
  transient let textMap = OrderedMap.Make<Text>(Text.compare);

  // データストア
  var daoInfo : ?DaoInfo = null;
  var activeEngine : ?EngineInfo = null;
  var availableEngines = textMap.empty<EngineInfo>();
  var voteHistory = textMap.empty<[VoteRecord]>();
  var userProfiles = principalMap.empty<UserProfile>();
  var apiConnectors = textMap.empty<ApiConnector>();
  var layer2Outputs = principalMap.empty<Layer2Output>();
  var layer3Data : ?Layer3Data = null;

  // アクセスコントロールの初期化
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  // ユーザーの役割取得
  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  // ユーザーの役割割り当て
  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  // 管理者判定
  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // ユーザープロファイル取得
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  // 他ユーザーのプロファイル取得
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own profile");
    };
    principalMap.get(userProfiles, user);
  };

  // ユーザープロファイル保存
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles := principalMap.put(userProfiles, caller, profile);
  };

  // DAO情報取得
  public query func getDaoInfo() : async ?DaoInfo {
    daoInfo;
  };

  // DAO情報設定（管理者のみ）
  public shared ({ caller }) func setDaoInfo(info : DaoInfo) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can set DAO info");
    };
    daoInfo := ?info;
  };

  // 利用可能エンジン一覧取得
  public query func getAvailableEngines() : async [EngineInfo] {
    Iter.toArray(textMap.vals(availableEngines));
  };

  // エンジン追加（管理者のみ）
  public shared ({ caller }) func addEngine(engine : EngineInfo) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can add engines");
    };
    availableEngines := textMap.put(availableEngines, engine.id, engine);
  };

  // アクティブエンジン取得
  public query func getActiveEngine() : async ?EngineInfo {
    activeEngine;
  };

  // アクティブエンジン設定（管理者のみ）
  public shared ({ caller }) func setActiveEngine(engineId : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can set active engine");
    };
    switch (textMap.get(availableEngines, engineId)) {
      case (?engine) { activeEngine := ?engine };
      case null { Debug.trap("Engine not found") };
    };
  };

  // 投票履歴取得
  public query func getVoteHistory(proposalId : Text) : async [VoteRecord] {
    switch (textMap.get(voteHistory, proposalId)) {
      case (?records) { records };
      case null { [] };
    };
  };

  // 投票記録追加
  public shared ({ caller }) func addVoteRecord(proposalId : Text, vote : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can vote");
    };

    let record : VoteRecord = {
      proposalId;
      voter = caller;
      vote;
      timestamp = 0;
    };

    let existingRecords = switch (textMap.get(voteHistory, proposalId)) {
      case (?records) { records };
      case null { [] };
    };

    voteHistory := textMap.put(voteHistory, proposalId, Array.append(existingRecords, [record]));
  };

  // APIコネクタ追加（管理者のみ）
  public shared ({ caller }) func addApiConnector(connector : ApiConnector) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can add API connectors");
    };
    apiConnectors := textMap.put(apiConnectors, connector.id, connector);
  };

  // エンジン別APIコネクタ取得
  public query func getApiConnectorsByEngine(engineId : Text) : async [ApiConnector] {
    let connectors = Iter.toArray(textMap.vals(apiConnectors));
    Array.filter(connectors, func(c : ApiConnector) : Bool { c.engineId == engineId });
  };

  // APIコネクタ認証情報更新
  public shared ({ caller }) func updateApiConnectorAuth(id : Text, newToken : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can update API connector auth");
    };

    switch (textMap.get(apiConnectors, id)) {
      case (?connector) {
        let updatedConnector : ApiConnector = {
          connector with accessToken = ?newToken;
        };
        apiConnectors := textMap.put(apiConnectors, id, updatedConnector);
      };
      case null { Debug.trap("API connector not found") };
    };
  };

  // TikTokコネクタテンプレート取得
  public query func getTikTokConnectorTemplate() : async ApiConnector {
    {
      id = "tiktok";
      engineId = "tiktok";
      baseUrl = "https://open-api.tiktok.com/";
      authType = "OAuth2";
      accessToken = null;
      settings = "{ \"scopes\": [\"user.info.basic\", \"video.upload\"], \"redirect_uri\": \"...\" }";
    };
  };

  // Layer 2: エンジン出力取得
  public query func getLayer2Outputs() : async [Layer2Output] {
    Iter.toArray(principalMap.vals(layer2Outputs));
  };

  // Layer 2: エンジン出力追加（管理者のみ）
  public shared ({ caller }) func addLayer2Output(output : Layer2Output) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can add Layer 2 outputs");
    };
    layer2Outputs := principalMap.put(layer2Outputs, output.memberId, output);
  };

  // Layer 3: ガバナンス・配布データ取得
  public query func getLayer3Data() : async ?Layer3Data {
    layer3Data;
  };

  // Layer 3: ガバナンス・配布データ設定（管理者のみ）
  public shared ({ caller }) func setLayer3Data(data : Layer3Data) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can set Layer 3 data");
    };
    layer3Data := ?data;
  };
};
