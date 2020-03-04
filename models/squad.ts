import s from '../services';
import g from '../generator';

import Soldier from './soldier';
import Vehicle from './vehicle';

class Squad {
    units: (Soldier|Vehicle)[] = [];

    constructor(squadSize: number) {
        if (squadSize > 10 || squadSize < 5) {
            throw new Error(`${squadSize} is less than 5 or is greater than 10`);
        }
        for (let member of new g(0, squadSize).iterator) {
            let isSoldier: boolean = Math.random() < 0.5;
            let unit: (Soldier|Vehicle|null) = null;

            if (isSoldier) {
                this.units.push(this._createSoldier());
                return;
            }

            this.units.push(this._createVehicle());
        }
    }

    private _createSoldier(): Soldier {
        return new Soldier(s.random(100, 2000));
    }

    private _createVehicle(): Vehicle {
        let crew: (Soldier)[] = [];
        const crewSize = s.random(1, 3);

        for (let operator of new g(1, crewSize).iterator) {
            crew.push(this._createSoldier());
        }
            
        return new Vehicle(s.random(1000, 2000), crewSize, crew);
    }

    get isActive(): boolean {
        return this.units.findIndex(unit => unit.isActive) > -1;
    }

    get activeUnits(): (Soldier|Vehicle)[] {
        return this.units.filter(unit => unit.isActive);
    }

    get probability(): number {
        const sequence = this.activeUnits.map(unit => unit.probability);
        return s.geometricMean(sequence);
    }

    get squadHealth(): number {
        const reducer = (acc: number, value: (Soldier | Vehicle)) => {
            if (isVehicle(value)) {
                return acc + value.vehicleHealth;
            }
            return acc + value.health;
        }
        function isVehicle(unit: Soldier | Vehicle): unit is Vehicle {
            return (unit as Vehicle).vehicleHealth !== undefined;
        }
        return this.activeUnits.reduce(reducer, 0);
    }

    takeDamage(points: number): void | undefined {
        if (!this.activeUnits.length) {
            throw new Error('Can\'t handle more damage. No active units');
        }

        const unitDamage: number = points / this.activeUnits.length;
        for (let unit of this.activeUnits) {
            unit.takeDamage(unitDamage);
        }
    }

    attack(): number {
        let sum: number = 0;
        for (let unit of this.activeUnits) {
            let damage = unit.attack();
            sum += damage ? damage : 0;
            unit.ascend();
        }
        return sum;
    }
}

export default Squad;
