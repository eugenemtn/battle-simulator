import StrategyInterface from './interface';
import Army from '../models/army';
import Squad from '../models/squad';

import Services from '../services';

class RandomStrategy implements StrategyInterface {
    getTargetSquad(enemy: Army): Squad {
        return enemy.activeSquads[Services.random(0, enemy.activeSquads.length - 1)];
    }
}

export default RandomStrategy;
