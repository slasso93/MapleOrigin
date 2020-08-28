importPackage(Packages.tools);

function enter(pi) {
    var reactorIn = pi.getMap().getReactorByName("jnr31_out");
    var reactorOut = pi.getMap().getReactorByName("jnr3_out1");
    if (reactorIn.getState() == 1) {
        reactorIn.resetReactorActions(0);
        reactorIn.getMap().broadcastMessage(MaplePacketCreator.triggerReactor(reactorIn, 0));
        reactorOut.resetReactorActions(0);
        reactorOut.getMap().broadcastMessage(MaplePacketCreator.triggerReactor(reactorOut, 0));
        pi.playPortalSound(); pi.warp(926110200, 1);
        return true;
    } else {
	    pi.playerMessage(5, "The door is not opened yet.");
        return false;
    }
}
