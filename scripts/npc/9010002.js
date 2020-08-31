/*
@author slasso
Mia Trophy NPC
*/

importPackage(Packages.tools);
importPackage(Packages.constants.inventory);
importPackage(Packages.client.inventory);

var status = 0;
var selectedItem;

var chairs = new Array(3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009, 3010010, 3010011, 3010012, 3010013, 3010015, 3010016, 3010017, 3010018, 3010019, 3010022, 3010023, 3010024, 3010025, 3010026, 3010028, 3010040, 3010041, 3010043, 3010045, 3010046, 3010047, 3010057, 3010058, 3010060, 3010061, 3010062, 3010063, 3010064, 3010065, 3010066, 3010067, 3010069, 3010071, 3010072, 3010073, 3010080, 3010081, 3010082, 3010083, 3010084, 3010085, 3010097, 3010098, 3010099, 3010101, 3010106, 3010116, 3011000, 3012005, 3012010, 3012011, 3010038, 3010161, 3010175, 3010177, 3010191, 3010225, 03010230, 3010299, 3010457, 3010459, 3010490, 3010491, 3010492, 3010529, 011000, 018001, 3018002, 3018004, 3018006, 3019095);

var relaunchItems = [
    {id: 1142647 }, // origin medal
    {id: 5450000, expiration: 1 } // 1 day miu miu

];

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
		if (status == 0) {
			cm.sendSimple("Hello #b#e#h ##n#k!\r\nWhat would you like to do?\r\n" +
			"#L1#Buy #r1 #b#e#z2049117##n#k for #r450mil #b#eMesos#n#k#l\r\n" +
			"#L2#Buy #r5,000 #b#eNX#n#k for #r5mil #b#eMesos#n#k#l\r\n" +
			"#L3#Buy a #b#erandom chair#n#k for #r2.5mil #b#eMesos#n#k#l\r\n" +
			"#L4#Buy #r1 #b#e#z5072000##n#k for #r1mil #b#eMesos#n#k#l\r\n" +
			"#L5#Trade #r10 #b#e#z5072000##n#k for #r1 #b#e#z5076000##n#k#l\r\n" +
			"#L6#Buy #r1 #b#eNX Gachapon Ticket#n#k for #r20,000 #b#eNX#n#k#l\r\n" +
			"#L7#Buy #r12 #b#eNX Gachapon Ticket#n#k for #r200,000 #b#eNX#n#k#l\r\n" +
			"#L8#Redeem your #e#bwipe hype#n#k starter pack!#l\r\n"
			);
		} else if (status == 1) {
		    selectedItem = selection;
			if (selection == 1) {
			    cm.sendYesNo("Are you sure you want to buy #r1 #b#e#z2049117##n#k for #r450mil #b#eMesos#n#k?")
			} else if (selection == 2) {
			    cm.sendYesNo("Are you sure you want to buy #r5,000 #b#eNX#n#k for #r5mil #b#eMesos#n#k?")
			} else if (selection == 3) {
			    cm.sendYesNo("Are you sure you want to buy a #b#erandom chair#n#k for #r2.5mil #b#eMesos#n#k?")
            } else if (selection == 4) {
			    cm.sendYesNo("Are you sure you want to buy #r1 #b#e#z5072000##n#k for #r1mil #b#eMesos#n#k?")
            } else if (selection == 5) {
			    cm.sendYesNo("Are you sure you want to trade #r10 #b#e#z5072000##n#k for #r1 #b#e#z5076000##n#k?")
			} else if (selection == 6) {
			    cm.sendYesNo("Are you sure you want to buy #r1 #b#eNX Gachapon Ticket#n#k for #r20,000 #b#eNX#n#k?")
            } else if (selection == 7) {
			    cm.sendYesNo("Are you sure you want to buy #r12 #b#eNX Gachapon Ticket#n#k for #r200,000 #b#eNX#n#k?")
            } else if (selection == 8) {
			    cm.sendYesNo("Are you sure you want to redeem your #e#bwipe hype#n#k starter pack?")
            }
        } else if (status == 2) {
			if (selectedItem == 1) {
			    if (cm.getMeso() < 450000000) {
                    cm.sendOk("Sorry, you do not have enough #b#eMesos#n#k to make this purchase.");
                } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(2049117)).isFull(0)) {
                    cm.sendOk("Your inventory is full! Please make room and try again.");
                } else {
					cm.gainMeso(-450000000);
					cm.gainItem(2049117, 1);
					cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have earned 1 Innocence Scroll 90%"));

					cm.sendOk("Here is your Innocence Scroll 90%!");
					cm.logLeaf("Innocence Scroll 90%");
                }
			} else if (selectedItem == 2) {
			    if (cm.getMeso() < 5000000) {
                    cm.sendOk("Sorry, you do not have enough #b#eMesos#n#k to make this purchase.");
                } else {
					cm.gainMeso(-5000000);
					cm.getPlayer().getCashShop().gainCash(1, 5000);
					cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have earned 5,000 NX"));

					cm.sendOk("Here is your 5,000 NX!");
					cm.logLeaf("5k NX");
                }
			} else if (selectedItem == 3) {
			    var chair1 = chairs[Math.floor(Math.random() * chairs.length)];
			    if (cm.getMeso() < 2500000) {
                    cm.sendOk("Sorry, you do not have enough #b#eMesos#n#k to make this purchase.");
                } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(chair1)).isFull(0)) {
                    cm.sendOk("Your inventory is full! Please make room and try again.");
                } else {
					cm.gainMeso(-2500000);
					cm.gainItem(chair1, 1);

                    cm.sendOk("Here is your random chair!");
                    cm.logLeaf("Chair ID: " + chair1);
                }
			} else if (selectedItem == 4) {
			    if (cm.getMeso() < 1000000) {
                    cm.sendOk("Sorry, you do not have enough #b#eMesos#n#k to make this purchase.");
                } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(5072000)).isFull(0)) {
                    cm.sendOk("Your inventory is full! Please make room and try again.");
                } else {
					cm.gainMeso(-1000000);
					cm.gainItem(5072000, 1);
					cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have earned 1 Super Megaphone"));

					cm.sendOk("Here is your Super Megaphone!");
					cm.logLeaf("Super Megaphone");
                }
            } else if (selectedItem == 5) {
			    if (!cm.haveItem(5072000, 10)) {
                    cm.sendOk("Sorry, you do not have enough #b#e#z5072000##n#k to make this purchase.");
                } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(5076000)).isFull(0)) {
                    cm.sendOk("Your inventory is full! Please make room and try again.");
                } else {
					cm.gainItem(5072000, -10);
					cm.gainItem(5076000, 1);
					cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have earned 10 Item Megaphone"));

					cm.sendOk("Here is your 10 Item Megaphone!");
					cm.logLeaf("10 Item Megaphone");
                }
			} else if (selectedItem == 6) {
			    if (cm.getPlayer().getCashShop().getCash(1) < 20000) {
                    cm.sendOk("Sorry, you do not have enough #b#e#zMesos##n#k to make this purchase.");
                } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(5220020)).isFull(0)) {
                    cm.sendOk("Your inventory is full! Please make room and try again.");
                } else {
					cm.getPlayer().getCashShop().gainCash(1, -20000);
                    cm.gainItem(5220020, 1);
                    cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have paid 20,000 NX"));

                    cm.sendOk("Here is your NX Gachapon ticket!!");
                    cm.logLeaf("1 NX Gachapon");
                }
            } else if (selectedItem == 7) {
			    if (cm.getPlayer().getCashShop().getCash(1) < 200000) {
                    cm.sendOk("Sorry, you do not have enough #b#e#zMesos##n#k to make this purchase.");
                } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(5220020)).isFull(0)) {
                    cm.sendOk("Your inventory is full! Please make room and try again.");
                } else {
					cm.getPlayer().getCashShop().gainCash(1, -200000);
                    cm.gainItem(5220020, 12);
                    cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have paid 200,000 NX"));

                    cm.sendOk("Here is your NX Gachapon ticket bundle!!");
                    cm.logLeaf("12 NX Gachapon");
                }
            } else if (selectedItem == 8) {
                if (cm.getPlayer().getRewardPoints() < 1) {
                    cm.sendOk("You are not eligible to receive this reward!");
                } else {
                    var canHoldAll = true;
                    for (var i = 0; i < relaunchItems.length; i++) {
                        if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(relaunchItems[i].id)).isFull(0)) {
                            cm.sendOk("Your inventory is full! Please make room and try again.");
                            canHoldAll = false;
                            break;
                        }
                    }
                    if (canHoldAll) {
                        var itemStr = "";
                        cm.getPlayer().setRewardPoints(0);
                        for (var i = 0; i < relaunchItems.length; i++) {
                            cm.gainItem(relaunchItems[i].id, selectedItem.quantity || 1, false, true, (relaunchItems[i].expiration * 1000 * 60 * 60 * 24) || -1);
                            itemStr += "#v" + relaunchItems[i].id + "##e#b#z" + relaunchItems[i].id + "##n#k\r\n";
                        }

                        cm.sendOk("Here is your #e#bwipe hype#n#k reward package! Enjoy your time here at MapleOrigin!\r\n" + itemStr);
                    }
                }
            }
			cm.dispose();
        }
    }
}
