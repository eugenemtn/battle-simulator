class GeneratorClass {
    public iterator: IterableIterator<number>;
    constructor(start: number, end: number) {
        this.iterator = this.generator(start, end);
    }
    *generator(start: number, end: number): IterableIterator<number> {
        for (let i = start; i <= end; i++) yield i;
    }   
}

export default GeneratorClass;
