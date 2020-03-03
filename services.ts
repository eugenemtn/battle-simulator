function random(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function geometricMean(sequence: number[]): number {
    if (!sequence.length) {
        return 0;
    }
    const reduced = sequence.reduce((acc, value) => acc * value);
    return Math.pow(reduced, 1 / sequence.length);
}

export default { random, geometricMean }
