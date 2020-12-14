

importPackage(Packages.server.expeditions);

 function enter(pi) {
    var eim = pi.getEventInstance();

    if (eim && eim.isEventCleared()) {
        if (pi.reachedRewardLimit(MapleExpeditionType.ARKARIUM)) {
            pi.getPlayer().changeMap(272020110, "AkayrumEnter");
        } else if (!eim.giveEventReward(pi.getPlayer())) {
            pi.playerMessage(5, "Please make room in your inventory before leaving this place!");
        } else {
            pi.getClient().getWorldServer().removeUnclaimed(MapleExpeditionBossLog.BossLogEntry.ARKARIUM, pi.getPlayer().getId());
            pi.getPlayer().changeMap(272020110, "AkayrumEnter");
        }
    } else if (!eim) {
            pi.getPlayer().changeMap(272020110, "AkayrumEnter");
    } else {
    	pi.playerMessage(5, "Arkarium's rage is too strong making the portal unstable!");
	}

    return false;
}
