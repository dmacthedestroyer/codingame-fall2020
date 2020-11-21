export function maxBy<T>(ts: T[], f: (t: T) => number): T | null {
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

export function minBy<T>(ts: T[], f: (t: T) => number): T | null {
    let min: T | null = null,
        minValue: number | null = null;

    for (const t of ts) {
        const tValue = f(t);
        if (minValue == null || tValue < minValue) {
            min = t;
            minValue = tValue;
        }
    }
    return min;
}
