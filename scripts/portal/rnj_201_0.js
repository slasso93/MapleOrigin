importPackage(Packages.tools);

function enter(pi) {
    var reactorIn = pi.getMap().getReactorByName("rnj31_out");
    //var reactorOut = pi.getPlayer().getClient().getChannelServer().getMapFactory().getMap(926100200).getReactorByName("rnj3_out1");
    if (reactorIn.getState() == 1) {
        pi.playPortalSound(); pi.warp(926100200, 1);
        return true;
    } else {
	    pi.playerMessage(5, "The door is not opened yet.");
        return false;
    }
}
