import g from '../generator';
import s from '../services';

import Squad from './squad';

class Army {
    squads: Squad[] = [];
    strategy: string;
    constructor(armySize: number, squadSize: number, strategy: string) {
        if (armySize < 2) {
            throw new Error(`${armySize} is less than 2. Battle is not possible`);
        }
        this.strategy = strategy;
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

    get armyHealth(): number {
        return this.activeSquads.reduce((acc: number, value: Squad) => acc + value.squadHealth, 0);
    }

    attack(enemy: Army): void {
        const enemySquad = enemy.getTargetSquad(enemy);
        if (!enemySquad) {
            return;
        }
        // console.log('ATTACK!!');
        for (let squad of this.activeSquads) {
            // console.log('PROBABILITIES: ', squad.probability, enemySquad.probability);
            // console.log('ATTACKER ACTIVE: ', squad.isActive);
            // console.log('DEFENDER ACTIVE: ', enemySquad.isActive);
            if (squad.probability >= enemySquad.probability && squad.isActive && enemySquad.isActive) {
                enemySquad.takeDamage(squad.attack());
            }
        }
    }

    getTargetSquad(enemy: Army) {
        if (!enemy.activeSquads.length) {
            return;
        }
        switch (this.strategy) {
            case 'random':
                return enemy.activeSquads[s.random(0, enemy.activeSquads.length - 1)];
            case 'weakest':
                let minDamage: number = enemy.activeSquads[0].attack();
                let weakestIndex: number = -1;
                for (let index in enemy.activeSquads) {
                    if (enemy.activeSquads[index].attack() < minDamage) {
                        minDamage = enemy.activeSquads[index].attack();
                        weakestIndex = +index;
                    }
                }
                return weakestIndex > -1 ? enemy.activeSquads[weakestIndex] : enemy.activeSquads[0];
            case 'strongest':
                let maxDamage: number | null = enemy.activeSquads[0].attack();
                let strongestIndex: number = -1;
                for (let index in enemy.activeSquads) {
                    if (enemy.activeSquads[index].attack() > maxDamage) {
                        maxDamage = enemy.activeSquads[index].attack();
                        strongestIndex = +index;
                    }
                }
                return strongestIndex > -1 ? enemy.activeSquads[strongestIndex] : enemy.activeSquads[0];
            default:
                throw new Error('Unknown strategy type');
        }
    }
}

export default Army;
