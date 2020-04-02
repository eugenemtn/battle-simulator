import StrategyInterface from './interface';
import Army from '../models/army';
import Squad from '../models/squad';

class WeakestStrategy implements StrategyInterface {
    getTargetSquad(enemy: Army): Squad {
        let minDamage: number = enemy.activeSquads[0].calculateDamage();
        let weakestIndex: number = -1;
        for (let index in enemy.activeSquads) {
            if (enemy.activeSquads[index].calculateDamage() < minDamage) {
                minDamage = enemy.activeSquads[index].calculateDamage();
                weakestIndex = +index;
            }
        }
        return weakestIndex > -1 ? enemy.activeSquads[weakestIndex] : enemy.activeSquads[0];
    }
}

export default WeakestStrategy;
