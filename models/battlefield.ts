import g from '../generator';
import Army from './army';

class Battlefield {
    field: Army[] = [];
    private battle: number;
    strategies: string[];
    constructor(armiesCount: number, armySize: number, squadSize: number, strategies: string[]) {
        this.strategies = strategies;
        // Initialize battlefield
        for (let strategy of strategies) {
            this.field.push(new Army(armySize, squadSize, strategy));
        }
    }

    // Start fighting
    fight(attackPeriod: number): void {
        this.battle = setInterval(this.battleRound.bind(this), attackPeriod);
    }
    
    // Detect if we got a winner
    get oneSurvivor(): boolean {
        return this.activeArmies.length === 1;
    }

    // Filter only active armies
    get activeArmies(): Army[] {
        return this.field.filter(army => army.isActive);
    }

    // Run next round
    battleRound(): boolean {
        const activeArmies = this.activeArmies;
        for (let i = 0; i < activeArmies.length; i++) {
            for (let j = 0; j < activeArmies.length; j++) {
                if (j === i || !activeArmies[i].isActive || !activeArmies[j].isActive) continue;
                activeArmies[i].attack(activeArmies[j]);
                console.log(`Army ${i} attacks army ${j}.\n ${activeArmies[j].armyHealth} overall health left.\n ${activeArmies[j].activeSquads.length} active squads left`);
                if (this.oneSurvivor) {
                    clearInterval(this.battle);
                    console.log(`We\'ve got a winner!!!
                    The army with index ${j}, and it's strategy was ${activeArmies[j].strategy}`)
                    return false;
                }
            }
        }
        return true;
    }
}

export default Battlefield;
