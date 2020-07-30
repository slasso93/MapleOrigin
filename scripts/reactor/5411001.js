/* @Author slasso
* 5411001.js: Summons Krexel.
*/

function summonBoss() {
        rm.spawnMonster(9420521, -175, -213);
        rm.changeMusic("Bgm09/TimeAttack");
        rm.mapMessage(6, "As you wish, here comes Krexel!");
}

function act() {
	if (rm.getReactor().getMap().getMonsterById(9420521) == null) {
		rm.schedule("summonBoss", 2000);
	}
}
