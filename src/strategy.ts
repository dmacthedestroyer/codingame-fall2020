import { minBy } from "./array";
import { Action, apply, GameState, validPlayerActions } from "./gamestate";
import { bfs } from "./graph";

/**
 * Choose the action that requires the shortest amount of turns to brew a potion
 * @param gameState current GameState to evaluate
 */
export function rushBrew(gamestate: GameState, depth: number = Number.MAX_VALUE): Action | null {
    function pathToBrew(gs: GameState): number {
        function neighbors(gs: GameState): GameState[] {
            return validPlayerActions(gs.player, gs.actions).map(a => apply(gs, a))
        }
        function test(gs: GameState): boolean {
            return gs.player.score > gamestate.player.score
        }

        return bfs(gs, neighbors, test, depth).length
    }
    const allActions = validPlayerActions(gamestate.player, gamestate.actions),
        chosen = minBy(allActions, a => pathToBrew(apply(gamestate, a)))

    return chosen
}