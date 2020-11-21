export function bfs<Node>(
    root: Node,
    neighbors: (n: Node) => Node[],
    test: (n: Node) => boolean,
    maxDepth: number = Number.MAX_VALUE
) {
    const nodes: [Node, Node[]][] = [[root, []]]
    const visited: Set<Node> = new Set()

    while (nodes.length > 0) {
        const [currentNode, currentPath] = nodes.shift()
        if (currentPath.length >= maxDepth || test(currentNode))
            return [...currentPath, currentNode];

        visited.add(currentNode);
        for (const neighbor of neighbors(currentNode)) {
            if (!visited.has(neighbor)) {
                const x: [Node, Node[]] = [neighbor, [...currentPath, currentNode]]
                nodes.push(x)
            }
        }
    }

    return []
}