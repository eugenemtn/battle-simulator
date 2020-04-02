import Army from '../models/army';
import Squad from '../models/squad';

interface StrategyInterface {
    getTargetSquad(enemy: Army): Squad;
}

export default StrategyInterface;
