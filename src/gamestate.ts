const actionTypes = ["BREW", "CAST", "OPPONENT_CAST", "REST", "WAIT"] as const;
export type ActionType = typeof actionTypes[number];
export function parseActionType(input: string): ActionType | Error {
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
            a.actionType == "REST" || a.actionType == "WAIT" ||
            ((a.actionType == "BREW" || (a.actionType == "CAST" && a.castable)) &&
                player.inventory[0] + a.inventoryCost[0] >= 0 &&
                player.inventory[1] + a.inventoryCost[1] >= 0 &&
                player.inventory[2] + a.inventoryCost[2] >= 0 &&
                player.inventory[3] + a.inventoryCost[3] >= 0 &&
                player.inventory.reduce((sum, inv, i) => sum + inv + a.inventoryCost[i], 0) <= 10)
    );
}

export function apply(gameState: GameState, action: Action): GameState {
    if (action.actionType === "WAIT") {
        return gameState
    }
    const { player, actions, ...rest } = gameState;
    if (action.actionType === "REST") {
        return {
            player,
            actions: actions.map(a => ({ ...a, castable: a.actionType === "CAST" ? true : a.castable })),
            ...rest
        }
    }
    const newPlayer: Player = {
        score: player.score + action.price,
        inventory: [
            player.inventory[0] + action.inventoryCost[0],
            player.inventory[1] + action.inventoryCost[1],
            player.inventory[2] + action.inventoryCost[2],
            player.inventory[3] + action.inventoryCost[3],
        ],
    },
        newAction = { ...action, castable: action.repeatable };


    return {
        player: newPlayer,
        actions: actions.map(a => a.actionId === action.actionId ? newAction : a),
        ...rest
    };
}