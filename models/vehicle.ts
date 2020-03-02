import v from '../validation';
import s from '../services';
import Soldier from './soldier';

class Vehicle extends Soldier {
    crewSize: number;
    crew: Soldier[];
    recharging: boolean;

    constructor(recharge: number, crewSize: number, crew: Soldier[]) {
        if (!v.inRange(recharge, 1000, 2000)) {
            throw new Error('invalid recharge value');
        }
        super(recharge);
        if (!v.inRange(crewSize, 1, 3)) {
            throw new Error('invalid operators value');
        }
        this.crewSize = crewSize;
        this.crew = crew;
    }

    get vehicleHealth(): number {
        let summaryHealth = 0;
        for (let member of this.crew) {
            summaryHealth += member.health;
        }
        summaryHealth += this.health;
        const result  = summaryHealth / (this.crew.length + 1);
        return result;
    }

    get isActive(): boolean {
        const operatorsAlive = this.crew.findIndex(member => member.isActive) > -1;
        return this.health > 0 && operatorsAlive;
    }

    calculateDamage(): number {
        const reducer = (acc: number, cV: Soldier): number => acc + cV.experience;
        return 0.1 + (this.crew.reduce(reducer, 0) / 100);
    }

    get probability(): number {
        const experiences = this.crew.map((member: Soldier): number => member.experience);
        return 0.5 * (1 + this.health / 100) * s.geometricMean(experiences);
    }

    takeDamage(points: number): void {
        this.health -= 0.6 * points;
        const crewAlive = this.crew.filter(member => member.isActive);
        const doubleDamageTakerIndex = s.random(0, crewAlive.length - 1);
        crewAlive[doubleDamageTakerIndex].health -= 0.2 * points;
        for (let index in crewAlive) {
            if (+index === doubleDamageTakerIndex) {
                continue;
            }
            const newHealth = crewAlive[index].health - 0.1 * points
            crewAlive[index].health = newHealth < 0 ? 0 : newHealth;
        }
    }
}

export default Vehicle;
