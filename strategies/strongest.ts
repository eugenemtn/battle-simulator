import StrategyInterface from './interface';
import Army from '../models/army';
import Squad from '../models/squad';

class StrongestStrategy implements StrategyInterface {
    getTargetSquad(enemy: Army): Squad {
        let maxDamage: number | null = enemy.activeSquads[0].calculateDamage();
        let strongestIndex: number = -1;
        for (let index in enemy.activeSquads) {
            if (enemy.activeSquads[index].calculateDamage() > maxDamage) {
                maxDamage = enemy.activeSquads[index].calculateDamage();
                strongestIndex = +index;
            }
        }
        return strongestIndex > -1 ? enemy.activeSquads[strongestIndex] : enemy.activeSquads[0];
    }
}

export default StrongestStrategy;
