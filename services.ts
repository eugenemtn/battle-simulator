function random(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function geometricMean(sequence: number[]): number {
    const reduced = sequence.reduce((acc, value) => acc * value);
    const root = sequence.length;
    return Math.pow(reduced, 1 / root );
}

export default { random }
