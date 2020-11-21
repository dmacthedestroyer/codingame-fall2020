import { platform } from "os";
import { Action, apply, GameState, Inventory, parseActionType, Player, validPlayerActions } from "./gamestate"

function merge<T>(defaultValue: T, vals: Partial<T>): T {
    const copy = { ...defaultValue }

    for (const x in vals) {
        copy[x] = vals[x]
    }

    return copy;
}

export function newAction(vals: Partial<Action>): Action {
    return merge<Action>({
        actionId: 0,
        actionType: "BREW",
        inventoryCost: [0, 0, 0, 0],
        price: 0,
        tomeIndex: 0,
        taxCount: 0,
        castable: true,
        repeatable: false
    }, vals)
}

export function newPlayer(vals: Partial<Player>): Player {
    return merge<Player>({
        inventory: [0, 0, 0, 0],
        score: 0
    }, vals)
}

export function newGameState(vals: Partial<GameState>): GameState {
    return merge<GameState>({
        player: newPlayer({}),
        enemy: newPlayer({}),
        actions: []
    }, vals)
}

describe("validPlayerActions(Action[], Player)", () => {
    const cases: [Action, Inventory, boolean][] = [
        [newAction({ actionType: "BREW", inventoryCost: [-1, -1, -1, -1] }), [0, 0, 0, 0], false],
        [newAction({ actionType: "BREW", inventoryCost: [-1, -1, -1, -1] }), [2, 2, 2, 1], true],
        [newAction({ actionType: "BREW", inventoryCost: [-1, -1, -2, -3] }), [1, 1, 2, 2], false],
        [newAction({ actionType: 'CAST', inventoryCost: [-1, 1, 0, 0] }), [1, 0, 0, 0], true],
        [newAction({ actionType: "CAST", inventoryCost: [-1, -1, 0, 3] }), [1, 3, 4, 2], false]
    ]
    cases.forEach(([action, inventory, expected]) => {
        it(`(${action.actionType}, ${action.inventoryCost}, ${action.castable}) + ${inventory} => ${expected}`, () => {
            const actual = validPlayerActions({ inventory, score: 0 }, [action])
            expect(actual.length > 0).toEqual(expected)
        })
    })

    it("allows rest", () => {
        const actual = validPlayerActions(newPlayer({}), [newAction({ actionType: "REST" })])
        expect(actual.length).toEqual(1)
    })
})

describe("apply(GameState, Action)", () => {
    describe("modifies player's inventory", () => {
        const testCases: [Inventory, Inventory, Inventory][] = [
            [[1, 2, 0, 0], [-1, -1, 0, 0], [0, 1, 0, 0]],
            [[4, 1, 0, 0], [-3, 0, 1, 0], [1, 1, 1, 0]]
        ]
        testCases.forEach(([playerInventory, inventoryCost, expected]) => {
            it(`[${playerInventory}] + [${inventoryCost}] -> [${expected}]`, () => {
                const action = newAction({ inventoryCost: inventoryCost }),
                    gameState = newGameState({
                        player: newPlayer({ inventory: playerInventory }),
                        actions: [action]
                    }),
                    { player: { inventory: actual } } = apply(gameState, action);
                expect(actual).toEqual(expected)
            })
        })
    })

    describe("sets spells as non-castable", () => {
        const action = newAction({ actionType: "CAST", castable: true }),
            gameState = newGameState({ player: newPlayer({}), actions: [action] }),

            { actions: [{ castable: actual }] } = apply(gameState, action)
        expect(actual).toEqual(false)
    })

    describe("resting sets castable to true for all player spells", () => {
        const action = newAction({ actionType: "REST" }),
            gamestate = newGameState({
                actions: [
                    newAction({ actionType: "OPPONENT_CAST", castable: false }),
                    newAction({ actionType: "CAST", castable: false })
                ]
            }),
            { actions: [{ castable: oppCastable }, { castable: playerCastable }] } = apply(gamestate, action)

        expect(oppCastable).toEqual(false);
        expect(playerCastable).toEqual(true)
    })
})