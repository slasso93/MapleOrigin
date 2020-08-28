importPackage(Packages.tools);

function enter(pi) {
    var reactorIn = pi.getMap().getReactorByName("rnj31_out");
    var reactorOut = pi.getMap().getReactorByName("rnj3_out1");
    if (reactorOut.getState() == 1) {
        reactorOut.resetReactorActions(0);
        reactorOut.getMap().broadcastMessage(MaplePacketCreator.triggerReactor(reactorOut, 0));
        reactorIn.resetReactorActions(0);
        reactorIn.getMap().broadcastMessage(MaplePacketCreator.triggerReactor(reactorIn, 0));
	    pi.playPortalSound(); pi.warp(926100201, 0);
        return true;
    } else {
	    pi.playerMessage(5, "The door is not opened yet.");
        return false;
    }
}
