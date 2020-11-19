import { GameState } from "./main";

const gameState: GameState = {
  actions: [
    {
      actionId: 50,
      actionType: "BREW",
      inventoryCost: [-2, 0, -2, -2],
      price: 10,
      tomeIndex: 0,
      taxCount: 0,
      castable: false,
      repeatable: false,
    },
    {
      actionId: 74,
      actionType: "BREW",
      inventoryCost: [-3, -1, -1, -1],
      price: 14,
      tomeIndex: 0,
      taxCount: 0,
      castable: false,
      repeatable: false,
    },
    {
      actionId: 54,
      actionType: "BREW",
      inventoryCost: [0, -2, -2, -2],
      price: 12,
      tomeIndex: 0,
      taxCount: 0,
      castable: false,
      repeatable: false,
    },
    {
      actionId: 69,
      actionType: "BREW",
      inventoryCost: [-2, -2, 0, 0],
      price: 13,
      tomeIndex: 0,
      taxCount: 0,
      castable: false,
      repeatable: false,
    },
    {
      actionId: 76,
      actionType: "BREW",
      inventoryCost: [-1, -1, -1, -1],
      price: 18,
      tomeIndex: 0,
      taxCount: 0,
      castable: false,
      repeatable: false,
    },
    {
      actionId: 78,
      actionType: "CAST",
      inventoryCost: [2, 0, 0, 0],
      price: 0,
      tomeIndex: -1,
      taxCount: -1,
      castable: true,
      repeatable: false,
    },
    {
      actionId: 79,
      actionType: "CAST",
      inventoryCost: [-1, 1, 0, 0],
      price: 0,
      tomeIndex: -1,
      taxCount: -1,
      castable: true,
      repeatable: false,
    },
    {
      actionId: 80,
      actionType: "CAST",
      inventoryCost: [0, -1, 0, 0],
      price: 0,
      tomeIndex: -1,
      taxCount: -1,
      castable: true,
      repeatable: false,
    },
    {
      actionId: 81,
      actionType: "CAST",
      inventoryCost: [0, 0, 1, 1],
      price: 0,
      tomeIndex: -1,
      taxCount: -1,
      castable: true,
      repeatable: false,
    },
    {
      actionId: 82,
      actionType: "OPPONENT_CAST",
      inventoryCost: [2, 0, 0, 0],
      price: 0,
      tomeIndex: -1,
      taxCount: -1,
      castable: true,
      repeatable: false,
    },
    {
      actionId: 83,
      actionType: "OPPONENT_CAST",
      inventoryCost: [-1, 1, 0, 0],
      price: 0,
      tomeIndex: -1,
      taxCount: -1,
      castable: false,
      repeatable: false,
    },
    {
      actionId: 84,
      actionType: "OPPONENT_CAST",
      inventoryCost: [0, -1, 0, 0],
      price: 0,
      tomeIndex: -1,
      taxCount: -1,
      castable: false,
      repeatable: false,
    },
    {
      actionId: 85,
      actionType: "OPPONENT_CAST",
      inventoryCost: [0, 0, 1, 1],
      price: 0,
      tomeIndex: -1,
      taxCount: -1,
      castable: true,
      repeatable: false,
    },
  ],
  player: { inventory: [3, 0, 0, 0], score: 0 },
  enemy: { inventory: [5, 1, 3, 0], score: 0 },
};
