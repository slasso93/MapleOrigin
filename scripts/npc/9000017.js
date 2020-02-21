var status = -1;
var weapon = [[1702816],[1702530],[1702467, 1702676]];
var chair = [[3013000, 3010602], [3012011,3012005,3012010], [3010024 , 3010007 ,3010582 ,3010319]];
var nx = [[1005111, 1051551 ,1004911,1004852,], [1004911,1050438,1051506,1053127] , [1051551 , 1053293 ,1073194 ,1073175 ,1073176]];
var rand = Math.floor(Math.random()*100);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("Oh, Valentine's Day! The one perfect day of the year for confessing love is here once again!\r\n\r\n #v4140100# - #t4140100#\r\n\r\nFwind us swome heart chwocolates and we'll reward uwu with swome interwesting itwems uwu\r\n#b#L0# Exchange 5 Boxes for a Random Chair #b\r\n#L1# Exchange 10 Boxes for a Random NX Equipment#b\r\n#L2# Exchange 15 boxes for a Random NX Weapon #b\r\n#L3# Exchange 50 boxes for a Spwecial Medal #b\r\n");
    } else if (status == 1) {
		if (selection == 0) {
			if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.SETUP).isFull(2)) {
                if(cm.haveItem(4140100, 5)) {
                    (cm.gainItem(4140100, -5));
					var rand2;
                    if ((rand >= 1) && (rand <= 15)) {
                        rand2 = Math.floor(Math.random() * chair[0].length);
                    } else if ((rand >= 16) && (rand <= 75)) {
                        rand2 = Math.floor(Math.random() * chair[1].length);
                    }else{
                        rand2 = Math.floor(Math.random() * chair[2].length);
                        }
                    cm.gainItem([rand >= 1 && rand <= 15 ? chair[0][rand2] : rand >= 16 && rand <= 75 ? chair[1][rand2] : chair[2][rand2]]);
                    cm.dispose();
                } else {
                    cm.sendOk("You do not have enough chocolates!");
                }
			} else {
				cm.sendOk("Please have atleast 3 spaces in your EQUIP tab");
			}
		} else if (selection == 1) {
			if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
                if(cm.haveItem(4140100, 10)) {
                    (cm.gainItem(4140100, -10));
					var rand2;
                    if ((rand >= 1) && (rand <= 15)) {
                        rand2 = Math.floor(Math.random() * nx[0].length);
                    } else if ((rand >= 16) && (rand <= 75)) {
                        rand2 = Math.floor(Math.random() * nx[1].length);
                    }else{
                        rand2 = Math.floor(Math.random() * nx[2].length);
                        }
                    cm.gainItem([rand >= 1 && rand <= 15 ? nx[0][rand2] : rand >= 16 && rand <= 75 ? nx[1][rand2] : nx[2][rand2]]);
                    cm.dispose();
                } else {
                    cm.sendOk("You do not have enough chocolates!");
                }
			} else {
				cm.sendOk("Please have atleast 3 spaces in your EQUIP tab")
			} 
		} else if (selection == 2) {
			if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
                if(cm.haveItem(4140100, 15)) {
                    (cm.gainItem(4140100, -15));
					var rand2;
                    if ((rand >= 1) && (rand <= 15)) {
                        rand2 = Math.floor(Math.random() * weapon[0].length);
                    } else if ((rand >= 16) && (rand <= 75)) {
                        rand2 = Math.floor(Math.random() * weapon[1].length);
                    }else{
                        rand2 = Math.floor(Math.random() * weapon[2].length);
                        }
                    cm.gainItem([rand >= 1 && rand <= 15 ? weapon[0][rand2] : rand >= 16 && rand <= 75 ? weapon[1][rand2] : weapon[2][rand2]]);
                    cm.dispose();
                } else {
                    cm.sendOk("You do not have enough chocolates!");
                }
			} else {
				cm.sendOk("Please have atleast 3 spaces in your EQUIP tab")
			} 
		}  else if (selection == 3) {
			if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
                if(cm.haveItem(4140100, 50)) {
                    (cm.gainItem(4140100, -50));
                    (cm.gainItem(1142499, 1));
                } else {
                    cm.sendOk("You do not have enough chocolates!");
                }
			} else {
				cm.sendOk("Please have atleast 3 spaces in your EQUIP tab")
			} 
		}
    } else {
        cm.dispose();
    }
}