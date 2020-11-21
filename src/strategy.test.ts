import { rushBrew } from "./strategy"
import { newGameState, newPlayer, newAction } from './gamestate.test'

describe("rushBrew", () => {
    it("picks a brew if possible", () => {
        const actual = rushBrew(newGameState({
            player: newPlayer({
                inventory: [1, 2, 0, 0]
            }),
            actions: [
                newAction({ actionId: 1, actionType: "CAST", inventoryCost: [-1, -1, 1, 0], price: 0, castable: true }),
                newAction({ actionId: 2, actionType: "BREW", inventoryCost: [-1, -1, 0, 0], price: 1 })
            ]
        }))

        expect(actual.actionId).toEqual(2)
    })

    it("chooses the quickest cast to brew", () => {
        const actual = rushBrew(newGameState({
            player: newPlayer({
                inventory: [3, 3, 0, 1]
            }),
            actions: [
                newAction({ actionId: 1, actionType: "BREW", inventoryCost: [0, 0, 0, -2], price: 1 }),
                newAction({ actionId: 2, actionType: "BREW", inventoryCost: [0, 0, -2, 0], price: 1 }),
                newAction({ actionId: 3, actionType: "CAST", inventoryCost: [-1, 0, 1, 0], castable: true }),
                newAction({ actionId: 4, actionType: "CAST", inventoryCost: [0, -1, 0, 1], castable: true }),
                newAction({ actionId: 5, actionType: "REST" }),
            ]
        }))
        expect(actual.actionId).toEqual(4)
    })
})