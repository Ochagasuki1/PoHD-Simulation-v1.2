import OrderedMap "mo:base/OrderedMap";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";




actor PoHDSimulation {

  transient let natMap = OrderedMap.Make<Nat>(Nat.compare);

  var users : OrderedMap.Map<Nat, User> = natMap.empty<User>();
  var historicalHCS : [Float] = [];
  var historicalCW : [Float] = [];
  var historicalGDP : [Float] = [];
  var currentDay : Nat = 0;
  var totalVDF : Float = 0.0;
  var totalCW : Float = 0.0;
  var gdpIndex : Float = 1.0;

  let alpha : Float = 0.15;
  let beta : Float = 0.10;
  let gamma : Float = 0.05;
  let burnEventYear : Nat = 2035;
  let burnEventMultiplier : Float = 1.111;
  let initialYear : Nat = 2026;
  let daysPerYear : Nat = 365;

  type User = {
    hcs : Float;
    mealsClaimed : Nat;
    vdfHours : Float;
    forgettingScore : ?Float;
  };

  public func initializeUsers() : async () {
    let initialUsers = Array.tabulate<(Nat, User)>(
      1000,
      func(i) {
        (
          i,
          {
            hcs = 0.5 + Float.fromInt(Int.abs(i)) * 0.0005;
            mealsClaimed = 0;
            vdfHours = 0.0;
            forgettingScore = null;
          },
        );
      },
    );
    users := natMap.fromIter<User>(Iter.fromArray(initialUsers));
  };

  public func runDailyStep() : async () {
    let updatedUsers = Array.map<(Nat, User), (Nat, User)>(
      Iter.toArray(natMap.entries(users)),
      func((id, user)) {
        let newHCS = updateHCS(user.hcs, user.mealsClaimed);
        let newVDF = user.vdfHours + Float.fromInt(Int.abs(id)) * 0.01;
        let newMeals = if (currentDay % 7 == 0) 0 else user.mealsClaimed;

        (
          id,
          {
            hcs = newHCS;
            mealsClaimed = newMeals;
            vdfHours = newVDF;
            forgettingScore = user.forgettingScore;
          },
        );
      },
    );

    users := natMap.fromIter<User>(Iter.fromArray(updatedUsers));
    updateAggregates();
    currentDay += 1;
  };

  func updateHCS(currentHCS : Float, mealsClaimed : Nat) : Float {
    let mealBonus = if (mealsClaimed < 3 and currentHCS >= 0.7) 0.05 else 0.0;
    let stressFactor = 1.0 - (Float.fromInt(Int.abs(mealsClaimed)) * 0.01);
    let randomStep = Float.fromInt(Int.abs(currentDay)) * 0.0001;

    currentHCS + (alpha * mealBonus) + (beta * stressFactor) + (gamma * randomStep);
  };

  func updateAggregates() {
    let totalHCS = Array.foldLeft<(Nat, User), Float>(
      Iter.toArray(natMap.entries(users)),
      0.0,
      func(acc, (_, user)) { acc + user.hcs },
    );

    let avgHCS = totalHCS / 1000.0;
    totalVDF += Float.fromInt(Int.abs(currentDay)) * 0.1;
    totalCW += (0.3 * totalVDF) + (0.5 * avgHCS) + (0.2 * totalVDF * 0.1);

    let yearsPassed = Float.fromInt(Int.abs(currentDay)) / 365.0;
    let gdpGrowth = Float.exp(0.03 * yearsPassed);
    let phdFactor = Float.pow(totalCW, 0.4);
    let hcsFactor = Float.pow(avgHCS, 0.3);
    let burnFactor = if (getCurrentYear() == burnEventYear) burnEventMultiplier else 1.0;

    gdpIndex := gdpGrowth * phdFactor * hcsFactor * Float.pow(burnFactor, 0.3);

    historicalHCS := Array.append(historicalHCS, [avgHCS]);
    historicalCW := Array.append(historicalCW, [totalCW]);
    historicalGDP := Array.append(historicalGDP, [gdpIndex]);
  };

  func getCurrentYear() : Nat {
    initialYear + (currentDay / daysPerYear);
  };

  public query func getHistoricalHCS() : async [Float] {
    historicalHCS;
  };

  public query func getHistoricalCW() : async [Float] {
    historicalCW;
  };

  public query func getHistoricalGDP() : async [Float] {
    historicalGDP;
  };

  public query func getCurrentDay() : async Nat {
    currentDay;
  };

  public query func getCurrentYearQuery() : async Nat {
    getCurrentYear();
  };

  public query func getTotalVDF() : async Float {
    totalVDF;
  };

  public query func getTotalCW() : async Float {
    totalCW;
  };

  public query func getGDPIndex() : async Float {
    gdpIndex;
  };

  public query func getUserCount() : async Nat {
    natMap.size(users);
  };

  public query func getAverageHCS() : async Float {
    let totalHCS = Array.foldLeft<(Nat, User), Float>(
      Iter.toArray(natMap.entries(users)),
      0.0,
      func(acc, (_, user)) { acc + user.hcs },
    );
    totalHCS / 1000.0;
  };

  public func resetSimulation() : async () {
    users := natMap.empty<User>();
    historicalHCS := [];
    historicalCW := [];
    historicalGDP := [];
    currentDay := 0;
    totalVDF := 0.0;
    totalCW := 0.0;
    gdpIndex := 1.0;
  };
};

