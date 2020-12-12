function enter(pi) {
	if (pi.getPlayer().gmLevel() < 3) {
		pi.playerMessage(5, "Area has been temporarily blocked off");
		return false;
	} else {
		pi.getPlayer().changeMap(273010000, "enter00"); 
		return true;
	}
	
}  