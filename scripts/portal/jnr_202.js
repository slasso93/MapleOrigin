importPackage(Packages.tools);

function enter(pi) {
    var reactorIn = pi.getMap().getReactorByName("jnr32_out");
    //var reactorOut = pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(926110200).getReactorByName("jnr3_out2");
    if (reactorIn.getState() == 1) {
        pi.playPortalSound(); pi.warp(926110200, 2);
        return true;
    } else {
	    pi.playerMessage(5, "The door is not opened yet.");
        return false;
    }
}
