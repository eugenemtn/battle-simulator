import h from '../services';
import { Unit } from './unit';

class Soldier extends Unit {
    experience: number;
    recharging: boolean;

    constructor(recharge: number) {
        super(recharge);
        this.experience = 0;
        this.recharging = false;
    }
    
    get isActive(): boolean {
        return this.health > 0;
    }
    ascend(): void {
        if (this.experience === 50) {
            return;
        }
        this.experience += 1;
    }
    calculateDamage(): number {
        return 0.05 + this.experience / 100;
    }
    get probability() {
        const random: number = h.random(50 + this.experience, 100);
        return  0.5 * (1 + this.health / 100) * random / 100;
    }
    takeDamage(points: number) {
        if (this.health - points <= 0) {
            this.health = 0;
            return;
        }
        this.health -= points;
    }
    attack(): number | null {
        if (this.recharging) {
            return null;
        }
        this.recharging = true;
        setTimeout(() => {
            this.recharging = false
        }, this.recharge);
        return this.calculateDamage();
    }
}

export default Soldier;
