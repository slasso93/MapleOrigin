function enter(pi) {
	if (pi.getPlayer().getLevel() < 220)
		pi.playerMessage(5, "This portal is blocked.");
	else {
		pi.getPlayer().changeMap(98000, "prev00"); 
	}
}  