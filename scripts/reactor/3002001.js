function act() {
	rm.dropItems();
	var eim = rm.getEventInstance();
    eim.setProperty(5 + "stageclear", "true");
    eim.showClearEffect(true);

    eim.giveEventPlayersStageReward(5);
}
