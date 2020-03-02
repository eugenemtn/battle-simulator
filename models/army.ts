import g from '../generator';
import s from '../services';

import Squad from './squad';

class Army {
    squads: Squad[];
    strategy: string;
    constructor(armySize: number, squadSize: number) {
        if (armySize < 2) {
            throw new Error(`${armySize} is less than 2. Battle is not possible`);
        }

        for (let squad in new g(0, armySize).iterator) {
            this.squads.push(new Squad(squadSize));
        }
    }

    get activeSquads() {
        return this.squads.filter(squad => squad.isActive)
    }

    get isActive() {
        return this.squads.findIndex(squad => squad.isActive) > -1;
    }

    attack(enemy: Army) {
        const enemySquad = enemy.getTargetSquad(enemy);
    }

    getTargetSquad(enemy: Army) {
        switch (this.strategy) {
            case 'random':
                return enemy.activeSquads[s.random(0, enemy.activeSquads.length)];
            case 'weakest':
                let minDamage: number = enemy.activeSquads[0].attack();
                let weakestIndex: number | null = null;
                for (let index in enemy.activeSquads) {
                    if (enemy.activeSquads[index].attack() < minDamage) {
                        minDamage = enemy.activeSquads[index].attack();
                        weakestIndex = +index;
                    }
                }
                return enemy.squads[weakestIndex];
            case 'strongest':
                let maxDamage: number = enemy.activeSquads[0].attack();
                let strongestIndex: number | null = null;
                for (let index in enemy.activeSquads) {
                    if (enemy.activeSquads[index].attack() > maxDamage) {
                        maxDamage = enemy.activeSquads[index].attack();
                        strongestIndex = +index;
                    }
                }
                return enemy.squads[strongestIndex];
            default:
                throw new Error('Unknown strategy type');
        }
    }
}

export default Army;
