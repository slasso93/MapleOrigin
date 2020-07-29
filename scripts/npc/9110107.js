
/* Author: slasso
	NPC Name: 		Palanquin
	Map(s): 		Zipangu: Mushroom Shrine, Zipangu: Outside Ninja Castle
	Description: 	Takes you to and from Ninja Castle
*/
var status = 0;

function start() {
    if (cm.getPlayer().getMapId() == 800040000) { // ninja castle
        status=1;
        cm.sendYesNo("Huh, what?! You want to leave this place?");
    } else
        cm.sendNext("We are... the palanquin... bearers! Need to... get to... Ninja Castle? Talk to us! Talk to us!");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1)
            cm.sendYesNo("Huh, what?! You want to go to Ninja Castle?");
        else if (status == 2) {
            cm.sendNext("Got it! We are... the palanquin... bearers! We'll get you... there... faster than you can... " +
                "blink! And since we're in such a jolly mood, you don't even have to pay us!");
        } else if (status == 3) {
            cm.warp(cm.getPlayer().getMapId() == 800040000 ? 800000000 : 800040000);
            cm.dispose();
        }

    }
}
