import Soldier from './models/soldier';

const soldier = new Soldier(120);
for (let i = 0; i < 12; i++) {
    console.log(soldier.isAttackSuccessful());
}