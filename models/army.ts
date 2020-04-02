import generateIterator from '../generator';
import services from '../services';

import Squad from './squad';
import Strategy from '../strategies/abstractStrategy';

class Army {
    squads: Squad[] = [];
    strategy: Strategy;

    constructor(armySize: number, squadSize: number, strategy: string) {
        if (armySize < 2) {
            throw new Error(`${armySize} is less than 2. Battle is not possible`);
        }
        this.strategy = new Strategy(strategy);
        for (let squad in new generateIterator(0, armySize).iterator) {
            this.squads.push(new Squad(squadSize));
        }
    }

    get activeSquads(): Squad[] {
        return this.squads.filter(squad => squad.isActive)
    }

    get isActive(): boolean {
        return this.squads.findIndex(squad => squad.isActive) > -1;
    }

    get armyHealth(): number {
        const reducer = (acc: number, value: Squad) => acc + value.squadHealth;
        return this.activeSquads.reduce(reducer, 0);
    }

    attack(enemy: Army): void {
        const enemySquad = this.getTargetSquad(enemy);
        if (!enemySquad) {
            return;
        }
        for (let squad of this.activeSquads) {
            if (squad.probability >= enemySquad.probability && squad.isActive && enemySquad.isActive) {
                enemySquad.takeDamage(squad.calculateDamage());
                squad.ascend();
            }
        }
    }

    getTargetSquad(enemy: Army): Squad | undefined {
        if (!enemy.activeSquads.length) {
            return;
        }
        return this.strategy.resolveTarget(enemy);
    }
}

export default Army;
