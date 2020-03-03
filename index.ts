import config from './config';
import Battlefield from './models/battlefield';

const ARMIES_LENGTH: number = config.armies > 2 ? config.armies : 2;
const ARMY_SIZE: number = config.squads > 2 ? config.squads : 2;
const SQUAD_SIZE: number = config.units >= 5 && config.units <= 10 ? config.units : 5;

try {
    const battle: Battlefield = new Battlefield(ARMIES_LENGTH, ARMY_SIZE, SQUAD_SIZE, config.strategies);
    battle.fight(config.attackPeriod);
} catch(error) {
    console.log(error);
}
