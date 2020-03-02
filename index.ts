import g from './generator';
import config from './config';
import Army from './models/army';

const ARMIES_LENGTH = config.armies > 2 ? config.armies : 2;
const ARMY_SIZE = config.squads > 2 ? config.squads : 2;
const SQUAD_SIZE = config.units >= 5 && config.units <= 10 ? config.units : 5;

let battlefield: Army[] = [];

// Initialize battlefield
for (let army of new g(0, ARMIES_LENGTH).iterator) {
    battlefield.push(new Army(ARMY_SIZE, SQUAD_SIZE));
}

// Start fighting
const battle = setInterval(runRound, config.attackPeriod);

// Detect if we got a winner
function oneSurvivor(armies: Army[]): boolean {
    return getActiveArmies(armies).length === 1;
}

// Filter only active armies
function getActiveArmies(armies: Army[]): Army[] {
    return battlefield.filter(army => army.isActive);
}

// Run next round
function runRound(): boolean {
    const activeArmies = getActiveArmies(battlefield);
    for (let i = 0; i < activeArmies.length; i++) {
        for (let j = 0; j < activeArmies.length; j++) {
            if (j === i) continue;
            activeArmies[i].attack(activeArmies[j]);
            console.log(`Army ${i} hit army ${j}`);
            if (oneSurvivor(battlefield)) {
                clearInterval(battle);
                console.log(`We\'ve got a winner!!!
                 The army with index ${j}, and it's strategy was ${activeArmies[j].strategy}`)
                return false;
            }
        }
    }
    return true;
}