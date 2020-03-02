import v from '../validation';

export class Unit {
    health: number;
    recharge: number;
    constructor(recharge: number) {
        if (!v.inRange(recharge, 100, 2000)) {
            throw new Error('invalid recharge period value')
        }
        this.health = 100;
        this.recharge = recharge;
    }
}
