
var common = [1702337, 1702340, 1702347, 1702427, 1702428, 1702479, 1702523, 1702550, 1702554, 1702564, 1702571, 1702576, 1702600, 1702606, 1702639, 1702647, 1702687, 1702698, 1702776, 1702780, 1702826, 1702845, 1702906, 
				1702352, 1702366, 1702427, 1702461, 1702485,1702503, 1702488, 1702526, 1702534, 1702541];
var uncommon = [1702350, 1702363, 1702366, 1702398, 1702453, 1702461, 1702488, 1702507, 1702525, 1702533, 1702559, 1702560, 1702589, 1702620, 1702629, 1702651, 1702753, 1702765, 1702769, 1702813, 1702560, 1702565, 1702571, 
				1702589, 1702616,1702377, 1702680, 1702793, 1702766, 1702840, 1702767]; 
var rare = [1702342, 1702360, 1702364, 1702367, 1702368, 1702379, 1702556, 1702617, 1702625, 1702633, 1702681, 1702697, 1702727, 1702752, 1702787, 1702865, 1702876, 1702927, 1702639, 1702671, 1702676, 1702718, 1702719, 1702706, 
				1702728, 1702746, 1702733, 1702795, 1702876, 1702557];
var urare = [1702748, 1702745, 1702753, 1702917, 1702724, 1702581, 1702773, 1702887, 1702627, 1702672, 1702771, 1702358, 1702401, 1702408, 1702415, 1702456, 1702505, 1702565, 1702585, 1702593, 1702594, 1702675, 1702770, 1702784, 1702814, 1092064];


function getRandom(min, max) {
    if (min > max) {
        return(-1);
    }

    if (min == max) {
        return(min);
    }

    return(min + parseInt(Math.random() * (max - min + 1)));
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
		cm.dispose();
	else {
		if (mode == 0 && status == 0)
			cm.dispose();

		if (mode == 1)
			status++;
		else
			status--;

        
		if (status == 0) { // confirm selection with yes/no
			cm.sendYesNo("#i3991013##i3991023##i3991006##i3991000##i3991002##i3991007##i3991000##i3991015##i3991014##i3991013#\r\n" + 
						"Hello #h #!\r\n\r\nWant to try your luck at the #r#eNX Gachapon?#n#k You can earn assorted up to date NX WEAPONS! \r\nRemember that each spin will cost you a\r\n\r\n#i5220020##t5220020#");
        } else if (status == 1) { // finalize the purchase
		    var vp = cm.getPlayer().getClient().getVotePoints();
            if (!cm.haveItem(5220020, 1)) {
				cm.sendOk("Sorry you do not have an #i5220020##e#b#z5220020##n#k! #i5220020##e#b#z5220020##k#n can be purchased from Mia in the FM.");
            } else if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(0)) {
                cm.sendOk("Your inventory is full! Please make room and try again.");
            } else {
				var roll = getRandom(0, 10); // random number from 0-10 to decide which array to choose from
				var item = -1;
				if (roll >= 0 && roll <= 4)
					item = common[getRandom(0, common.length - 1)];
				else if (roll >= 5 && roll <= 7)
					item = uncommon[getRandom(0, uncommon.length - 1)];
				else if (roll >= 8 && roll <= 9)
					item = rare[getRandom(0, rare.length - 1)];
				else if (roll == 10)
					item = urare[getRandom(0, urare.length - 1)];
				
				if (item != -1) {					
					cm.gainItem(5220020, -1);
					cm.gainItem(item, 1);
					cm.sendOk("#b#eCongratulations!#n#k You have obtained a #e#b#v" + item + "##z" + item + "#");
				}
            }
            cm.dispose();
        }
	}
}
