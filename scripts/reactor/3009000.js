/**
 * @author: Ronan, slasso
 * @reactor: Spine
 * @map: 930000200 - Forest of Poison Haze - Deteriorated Forest (Stage 2)
 * @func: Water Fountain
*/

function act() {
    if(rm.getReactor().getState() == 4) {
        var eim = rm.getEventInstance();
        eim.setProperty(2 + "stageclear", "true");
        eim.showClearEffect(true);

        eim.giveEventPlayersStageReward(2);
    }
}
