var status = -1;

var item = 
[[1004981, 1004200, 1004989, 1002310,1102857, 1042329, 1062211, 1052503, 1042170, 1053203, 1051594, 1050524, 1053197, 1053198,1092065, 1702682, 1702705, 1702890, 1112160, 1112272, 1492026, 1482025, 1472058, 1462043, 1442053, 1432042, 1422033, 1412029, 1402041, 1302071, 1312034, 1322056, 1332059, 1382042, 1442186,1442187,1442188,1442189,1442190] /*Nx Items*/
,[3015234, 3015235, 3010065, 3010034, 3010273,3010142, 3011000, 3015394] /*Chairs*/
,[2022179,2022273] /*ATK and MATK Pots*/
,[2048010, 2048011, 2048012, 2048013, 2048001, 2048004,2048010, 2048011,2048010, 2048011, 2049001] /*Scrolls*/
,[1142551, 1022237]]; /*Medal*/
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
        cm.sendSimple("The lazy, hazy days of summer! We look forward to it all year long when school is over and we take your summer holidays. Summer sun and days on Maple with all your friends together. Somehow summer never seems to last long enough. Starting from this moment it’s time for you to get some:\r\n\r\n #v4001165# - #z4001165#\r\n\r\nBring me them and I shall reward you with the Summer fun surprises!\r\n#b#L0# Exchange 2 Sunshine for a Summer Surprise!#l\r\n");
    } else if (status == 1) {
		if (selection == 0) {
            if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
                if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.SETUP).isFull(2)) {
                    if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).isFull(2)) {
                        if(cm.haveItem(4001165 , 2)) {
                            (cm.gainItem(4001165 , -2));
                            var rand2;
                            if ((rand >= 1) && (rand <= 60)) {
                                rand2 = Math.floor(Math.random() * item[0].length);
                            } else if ((rand >= 61) && (rand <= 70 )) {
                                rand2 = Math.floor(Math.random() * item[1].length);
                            }else if ((rand >= 71) && (rand <= 80)) {
                                rand2 = Math.floor(Math.random() * item[2].length);
                            }else if ((rand >= 81) && (rand <= 95)) {
                                rand2 = Math.floor(Math.random() * item[3].length);
                            }else{
                                rand2 = Math.floor(Math.random() * item[4].length);
                                }
                            cm.gainItem([rand >= 1 && rand <= 60 ? item[0][rand2] : rand >= 61 && rand <= 70 ? item[1][rand2] : rand >= 71 && rand <= 80 ? item[2][rand2] :  rand >= 81 && rand <= 95 ? item[3][rand2] : item[4][rand2]]);
                            cm.dispose();
                        } else {
                            cm.sendOk("You do not have enough #r#z4001165#!");
                        }
                    } else {
                        cm.sendOk("Please have atleast 3 spaces in your USE tab");
                    }
                } else {
                    cm.sendOk("Please have atleast 3 spaces in your SETUP tab");
                }
            } else {
                cm.sendOk("Please have atleast 3 spaces in your EQUIP tab");
            }
		} else {
            cm.sendOk("You do not have enough #r#z4001165#!");
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}