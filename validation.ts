import g from './generator';

const validation = {
    inRange(value: number, start: number, end: number) {
        let sequence = [];

        for (let member of new g(start, end).iterator) {
            sequence.push(member);
        }

        return sequence.indexOf(value) > -1;
    }
}

export default validation;
