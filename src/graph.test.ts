import { bfs } from './graph'

describe("bfs", () => {
    describe("basic tests", () => {
        const graph = {
            a: ["b", "c"],
            b: ["a"],
            c: ["d", "e"]
        },
            neighbors = (k: string): string[] => graph[k] || [],
            run = (start: string, end: string) => bfs(start, neighbors, k => k === end)


        it("returns the full path if one exists", () => {
            const actual = run("a", "d")
            expect(actual).toEqual(['a', 'c', 'd'])
        })

        it("returns empty list if no path found", () => {
            const actual = run("a", "f")
            expect(actual).toEqual([])
        })
    })
})