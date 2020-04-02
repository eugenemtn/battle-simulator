import StrategyInterface from './interface';
import Army from '../models/army';
import Squad from '../models/squad';

class StrongestStrategy implements StrategyInterface {
    getTargetSquad(enemy: Army): Squad {
        let maxDamage: number | null = enemy.activeSquads[0].attack();
        let strongestIndex: number = -1;
        for (let index in enemy.activeSquads) {
            if (enemy.activeSquads[index].attack() > maxDamage) {
                maxDamage = enemy.activeSquads[index].attack();
                strongestIndex = +index;
            }
        }
        return strongestIndex > -1 ? enemy.activeSquads[strongestIndex] : enemy.activeSquads[0];
    }
}

export default StrongestStrategy;
