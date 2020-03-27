var status = -1;
var nxitem = [[1012644,1004136,1102682,1102684,1052749], [1012631, 1000079, 1050215,1051262], [1702328,1702359,3010140,1052750]];
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
        cm.sendSimple("Oh no! It appears the #rCoronavirus #khas spread to MapleOrigin. But have no fear your grinding will still go on! For the month of April monsters will drop:\r\n\r\n #v4001332# - #t4001332#\r\n\r\nFwind us swome toiwet pwaper and we'll reward uwu with swome interwesting itwems uwu\r\n#b#L0# Exchange 5 Toilet Paper Rolls for an interwesting itwem!#l ");
    } else if (status == 1) {
		if (selection == 0) {
			if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
                if(cm.haveItem(4001332 , 5)) {
                    (cm.gainItem(4001332 , -5));
					var rand2;
                    if ((rand >= 1) && (rand <= 15)) {
                        rand2 = Math.floor(Math.random() * nxitem[0].length);
                    } else if ((rand >= 16) && (rand <= 75)) {
                        rand2 = Math.floor(Math.random() * nxitem[1].length);
                    }else{
                        rand2 = Math.floor(Math.random() * nxitem[2].length);
                        }
                    cm.gainItem([rand >= 1 && rand <= 15 ? nxitem[0][rand2] : rand >= 16 && rand <= 75 ? nxitem[1][rand2] : nxitem[2][rand2]]);
                    cm.dispose();
                } else {
                    cm.sendOk("You do not have enough Toilet Paper Rolls!");
                }
			} else {
				cm.sendOk("Please have atleast 3 spaces in your EQUIP tab");
			}
		} else {
            cm.sendOk("You do not have enough Toilet Paper Rolls!");
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}