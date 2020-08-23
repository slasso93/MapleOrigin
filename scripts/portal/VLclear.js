

importPackage(Packages.server.expeditions);

 function enter(pi) {
    var eim = pi.getEventInstance();

    if (eim && eim.isEventCleared()) {
        if (pi.reachedRewardLimit(MapleExpeditionType.VONLEON)) {
            pi.getPlayer().changeMap(82100, "von02");
        } else if (!eim.giveEventReward(pi.getPlayer())) {
            pi.playerMessage(5, "Please make room in your inventory before leaving this place!");
        } else {
            pi.getPlayer().changeMap(82100, "von02");
        }
    } else if (!eim) {
            pi.getPlayer().changeMap(82100, "von02");
    } else {
    	pi.playerMessage(5, "Von Leon's rage is too strong making the portal unstable!");
	}

    return false;
}
