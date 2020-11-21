import { GameState, Action, ActionType, parseActionType, Player } from "./gamestate"
import { maxBy } from './array'
import { rushBrew } from "./strategy";

function step(gameState: GameState): string {
  const choice = rushBrew(gameState, 5)

  if (choice) {
    return `${choice.actionType} ${choice.actionId}`
  }

  return "REST";
}

export function run() {
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
      actions.push({
        actionId: -1,
        actionType: "REST",
        inventoryCost: [0, 0, 0, 0],
        price: 0,
        tomeIndex: 0,
        taxCount: 0,
        castable: false,
        repeatable: false
      })

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
