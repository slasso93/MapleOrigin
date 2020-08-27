importPackage(Packages.tools);

function enter(pi) {
    var reactor = pi.getMap().getReactorByName("jnr3_out2");
    if (reactor.getState() == 1) {
        reactor.resetReactorActions(0);
        reactor.getMap().broadcastMessage(MaplePacketCreator.triggerReactor(reactor, 0));
	    pi.playPortalSound(); pi.warp(926110202, 0);
        return true;
    } else {
	    pi.playerMessage(5, "The door is not opened yet.");
        return false;
    }
}
