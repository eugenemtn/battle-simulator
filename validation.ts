import g from './generator';

const validation = {
    inRange(value: number, start: number, end: number) {
        let sequence = [];

        for (let member of new g(start, end).iterator) {
            sequence.push(member);
        }

        return value in sequence;
    }
}

export default validation;
