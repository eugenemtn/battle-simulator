import StrategyInterface from './interface';
import Army from '../models/army';
import Squad from '../models/squad';

import RandomStrategy from './random';
import WeakestStrategy from './weakest';
import StrongestStrategy from './strongest';

class AbstractStrategy {
    type: string;
    private _strategy: StrategyInterface;

    constructor(strategy: string) {
        this.setStrategy(strategy);
        this.type = strategy;
    }

    resolveTarget(enemy: Army): Squad {
        return this._strategy.getTargetSquad(enemy);
    }

    setStrategy(strategy: string): void {
        switch (strategy) {
            case 'random':
                this._strategy = new RandomStrategy();
                break;
            case 'weakest':
                this._strategy = new WeakestStrategy();
                break;
            case 'strongest':
                this._strategy = new StrongestStrategy();
                break;
            default:
                throw new Error('Unknown strategy type');
        }
        this.type = strategy;
    }
}

export default AbstractStrategy;
