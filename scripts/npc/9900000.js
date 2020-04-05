var status = -1;

var item = 
[[1012315,1115041,1115130,1012644,1004136,1102682,1102684,1052749,1012631, 1000079,1050215,1051262,1702328,1702359,1052750] /*Nx Items*/
,[3010140] /*Chairs*/
,[2022179,2022273] /*ATK and MATK Pots*/
,[2048010, 2048011, 2048012, 2048013, 2048001, 2048004,2048010, 2048011,2048010, 2048011] /*Scrolls*/
,[1012684]]; /*Mask*/
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
        cm.sendSimple("Oh no! It appears the #rCoronavirus #khas spread to MapleOrigin. But have no fear your grinding will still go on! For the month of April monsters will drop:\r\n\r\n #v4001332# - #z4001332#\r\n\r\nFwind us swome toiwet pwaper and we'll reward uwu with swome interwesting itwems uwu\r\n#b#L0# Exchange 10 Toilet Rolls fwor an interwesting itwem!#l\r\n");
    } else if (status == 1) {
		if (selection == 0) {
            if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
                if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.SETUP).isFull(2)) {
                    if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).isFull(2)) {
                        if(cm.haveItem(4001332 , 5)) {
                            (cm.gainItem(4001332 , -5));
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
                            cm.sendOk("You do not have enough #r#z4001332#!");
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
            cm.sendOk("You do not have enough #r#z4001332#!");
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}