/*
	NLC Taxi
*/

var status = 0;
var goToMansion = false;
var goToDMG = false;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 2 && mode == 0) {
		cm.sendOk("Alright, see you next time.");
		cm.dispose();
	return;
	}
    if (mode == 1) {
		status++;
	} else {
		status--;
	}
    if (status == -1) {
		cm.dispose();
    } else if (cm.getMapId() == 682000000) {
		if (status == 0) {
			cm.sendSimple ("Where to, boss? \r\n#b#L0#New Leaf City#l\r\n#L1#Crimson Forest: Dead Man's Gorge#k");
		} else if (status == 1) {
			if (selection == 0) {
				goToMansion = false;
				cm.sendYesNo ("You want to go to #bNew Leaf City#k?");
			} else if (selection == 1) {
				goToMansion = true;
				cm.sendYesNo ("You're sure you want to go to #bDead Man's Gorge#k?");
			}
		} else if (status == 2) {
			var map;
			if (goToMansion){
				map = 630010004;
			} else {
				map = 600000000;
			}
				cm.warp (map, 0);
				cm.dispose();
		}
    } else if (cm.getMapId() == 630010004) {
		if (status == 0) {
			cm.sendSimple ("Where to, boss? \r\n#b#L0#New Leaf City#l\r\n#L1#Haunted Mansion#k");
		} else if (status == 1) {
			if (selection == 0) {
				goToMansion = false;
				cm.sendYesNo ("You want to go to #bNew Leaf City#k?");
			} else if (selection == 1) {
				goToMansion = true;
				cm.sendYesNo ("You're sure you want to enter the #bMansion#k?");
			}
		} else if (status == 2) {
			var map;
			if (goToMansion){
				map = 682000000;
			} else {
				map = 600000000;
			}
				cm.warp (map, 0);
				cm.dispose();
		}
    } else {
		if (status == 0){
			cm.sendSimple ("Be warned adventurers, time is being distorted up ahead making travel dangerous! However, I can teleport you to either of these distortions, where would you like to go?\r\n#b#L0#Leafre in Flames\r\n#L1#Distorted Temple of Time#k");
		} else if (status == 1){
			if (selection == 0) {
				goToMansion = false;
				cm.sendYesNo ("You want to go to the #bLeafre in Flames#k?");
			} else if (selection == 1) {
				goToMansion = true;
				cm.sendYesNo ("You want to go to #bDistorted Temple of Time#k?");
			}
		} else if (status == 2) {
			if (goToDMG){
				map = 272020000;
			} else if (goToMansion){
				map = 272020000;
			} else {
				map = 272000100;
			}
			cm.warp (map, 0);
			cm.dispose();
						
		}
    }
}