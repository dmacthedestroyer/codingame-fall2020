const actionTypes = ["BREW", "CAST", "OPPONENT_CAST"] as const;
export type ActionType = typeof actionTypes[number];
function parseActionType(input: string): ActionType | Error {
  return (
    actionTypes.find((x) => x == input) ||
    new Error(`no ActionType found for input '${input}'`)
  );
}
export type Action = {
  actionId: number;
  actionType: ActionType;
  inventoryCost: Inventory;
  price: number;
  tomeIndex: number;
  taxCount: number;
  castable: boolean;
  repeatable: boolean;
};

export type Inventory = [number, number, number, number];

export type Player = {
  inventory: Inventory;
  score: number;
};

export type GameState = {
  actions: Action[];
  player: Player;
  enemy: Player;
};
export function validPlayerActions(player: Player, actions: Action[]) {
  return actions.filter(
    (a) =>
      (a.actionType == "BREW" || (a.actionType == "CAST" && a.castable)) &&
      player.inventory.reduce(
        (valid, x, i) => valid && x + a.inventoryCost[i] >= 0,
        true
      )
  );
}

export function apply(player: Player, recipe: Action): [Player, Action] {
  const newPlayer: Player = {
      score: player.score + recipe.price,
      inventory: [
        player.inventory[0] + recipe.inventoryCost[0],
        player.inventory[1] + recipe.inventoryCost[1],
        player.inventory[2] + recipe.inventoryCost[2],
        player.inventory[3] + recipe.inventoryCost[3],
      ],
    },
    newRecipe = { ...recipe, castable: recipe.repeatable };

  return [newPlayer, newRecipe];
}

function maxBy<T>(ts: T[], f: (t: T) => number): T | null {
  let max: T | null = null,
    maxValue: number | null = null;

  for (const t of ts) {
    const tValue = f(t);
    if (maxValue == null || tValue > maxValue) {
      max = t;
      maxValue = tValue;
    }
  }

  return max;
}

function step(gameState: GameState): string {
  const eligibleRecipes = gameState.actions.filter(
      (r) =>
        r.actionType == "BREW" &&
        r.inventoryCost.reduce(
          (eligible, c, i) => eligible && c <= gameState.player.inventory[i],
          true
        )
    ),
    chosenRecipe = maxBy(eligibleRecipes, (r) => r.price);

  if (chosenRecipe)
    return `${chosenRecipe.actionType} ${chosenRecipe.actionId}`;
  return "WAIT";
}

function main() {
  // game loop
  while (true) {
    function parseGameState(): GameState {
      const actions = parseActions(),
        player = parsePlayer(),
        enemy = parsePlayer();

      return { actions, player, enemy };
    }
    function parseActions(): Action[] {
      const actionCount: number = parseInt(readline()); // the number of spells and recipes in play
      function parseAction(): Action {
        var inputs: string[] = readline().split(" ");
        const actionId: number = parseInt(inputs[0]); // the unique ID of this spell or recipe
        const actionType = parseActionType(inputs[1]); // in the first league: BREW; later: CAST, OPPONENT_CAST, LEARN, BREW
        if (actionType instanceof Error) {
          throw actionType;
        }
        const delta0: number = parseInt(inputs[2]); // tier-0 ingredient change
        const delta1: number = parseInt(inputs[3]); // tier-1 ingredient change
        const delta2: number = parseInt(inputs[4]); // tier-2 ingredient change
        const delta3: number = parseInt(inputs[5]); // tier-3 ingredient change
        const price: number = parseInt(inputs[6]); // the price in rupees if this is a potion
        const tomeIndex: number = parseInt(inputs[7]); // in the first two leagues: always 0; later: the index in the tome if this is a tome spell, equal to the read-ahead tax; For brews, this is the value of the current urgency bonus
        const taxCount: number = parseInt(inputs[8]); // in the first two leagues: always 0; later: the amount of taxed tier-0 ingredients you gain from learning this spell; For brews, this is how many times you can still gain an urgency bonus
        const castable: boolean = inputs[9] !== "0"; // in the first league: always 0; later: 1 if this is a castable player spell
        const repeatable: boolean = inputs[10] !== "0"; // for the first two leagues: always 0; later: 1 if this is a repeatable player spell

        return {
          actionId,
          actionType,
          inventoryCost: [delta0, delta1, delta2, delta3],
          price,
          tomeIndex,
          taxCount,
          castable,
          repeatable,
        };
      }
      const actions: Action[] = [];
      for (let i = 0; i < actionCount; i++) {
        actions.push(parseAction());
      }

      return actions;
    }
    function parsePlayer(): Player {
      var inputs: string[] = readline().split(" ");
      return {
        inventory: [
          parseInt(inputs[0]),
          parseInt(inputs[1]),
          parseInt(inputs[2]),
          parseInt(inputs[3]),
        ],
        score: parseInt(inputs[4]),
      };
    }

    const gameState = parseGameState();
    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    console.error(JSON.stringify(gameState));

    // in the first league: BREW <id> | WAIT; later: BREW <id> | CAST <id> [<times>] | LEARN <id> | REST | WAIT
    console.log(step(gameState));
  }
}

export function run() {
  main();
}
