importPackage(Packages.tools);

function enter(pi) {
    //var reactorIn = pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(926110201).getReactorByName("jnr31_out");
    var reactorOut = pi.getMap().getReactorByName("jnr3_out1");
    if (reactorOut.getState() == 1) {
	    pi.playPortalSound(); pi.warp(926110201, 0);
        return true;
    } else {
	    pi.playerMessage(5, "The door is not opened yet.");
        return false;
    }
}
