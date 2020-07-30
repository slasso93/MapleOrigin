
/* Author: slasso
	NPC Name: 		Naosuke
	Map: 		    Zipangu: Castle Corridor
	Description: 	Takes you to castellan toad
*/
var status = 0;
function start() {
    cm.sendNext("What are you...!?");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1)
            cm.sendYesNo("What? You want to go where? Do you even know where this place is?");
        else if (status == 2) {
            cm.sendNext("Fine. If you know what you're getting yourself into, I won't stop you. I just hope you stay safe so you can defeat the monster!");
        } else if (status == 3) {
            var mapCount = Math.floor(Math.random() * 15) + 1; // Phantom's Room 800040308 is the last map, if we land on 8, just spawn in room 300
            cm.warp(mapCount == 8 ? 800040300 : 800040300 + mapCount);
            cm.dispose();
        }

    }
}
