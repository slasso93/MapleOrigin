/*
Credits go to Travis of DeanMS ( xKillsAlotx on RaGEZONE)
Item Exchanger for scrolls
Modified by SharpAceX (Alan) for MapleSolaxia
Mia Trophy NPC
*/

importPackage(Packages.tools);

var status = 0;
var trophy = 4000038;
var chairs = new Array(3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009, 3010010, 3010011, 3010012, 3010013, 3010015, 3010016, 3010017, 3010018, 3010019, 3010022, 3010023, 3010024, 3010025, 3010026, 3010028, 3010040, 3010041, 3010043, 3010045, 3010046, 3010047, 3010057, 3010058, 3010060, 3010061, 3010062, 3010063, 3010064, 3010065, 3010066, 3010067, 3010069, 3010071, 3010072, 3010073, 3010080, 3010081, 3010082, 3010083, 3010084, 3010085, 3010097, 3010098, 3010099, 3010101, 3010106, 3010116, 3011000, 3012005, 3012010, 3012011, 3010038, 3010161, 3010175, 3010177, 3010191, 3010225, 03010230, 3010299, 3010457, 3010459, 3010490, 3010491, 3010492, 3010529, 011000, 018001, 3018002, 3018004, 3018006, 3019095);
var scrolls = new Array(2040603, 2044503, 2041024, 2041025, 2044703, 2044603, 2043303, 2040807, 2040806, 2040006, 2040007, 2043103, 2043203, 2043003, 2040506, 2044403, 2040903, 2040709, 2040710, 2040711, 2044303, 2043803, 2040403, 2044103, 2044203, 2044003, 2043703);
var weapons = new Array(1302020, 1302030, 1302033, 1302058, 1302064, 1302080, 1312032, 1322054, 1332025, 1332055, 1332056, 1372034, 1382009, 1382012, 1382039, 1402039, 1412011, 1412027, 1422014, 1422029, 1432012, 1432040, 1432046, 1442024, 1442030, 1442051, 1452016, 1452022, 1452045, 1462014, 1462019, 1462040, 1472030, 1472032, 1472055, 1482020, 1482021, 1482022, 1492020, 1492021, 1492022, 1092030, 1092045, 1092046, 1092047);

var relaunchItemsExpire90 = {
	1812000: 1, // Meso Magnet
	1812001: 1, // Item Pouch
	1812002: 1, // Auto HP Potion Pouch
	1812003: 1, // Auto MP Potion Pouch
	1812004: 1, // Wing Boots
	1812005: 1, // Binoculars
	5122000: 40, // Hearty Party Bear weather
	5041000: 20, // VIP Teleport Rock
	5130000: 20, // Safety Charm
	5510000: 20 // Wheel of Destiny
};

var relaunchItemsPerm = [5450000, 1802369, 1802370, 1802371, 1022048]; // miu miu, pets equips (tiny fright, sadness, envy), transparent eye
var relaunchPets = [5000282, 5000283, 5000281]; // dire mors, wild invida, vile metus

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
			cm.sendSimple("Hello #b#e#h ##n#k, you currently have #r#c4000038##b #e#z4000038##n.#k \r\nWhat would you like to do?\r\n#k#L1# Buy #r5,000#k #b#eNX#n#k for #r5mil#k #b#eMesos#n#k #l\r\n#L2# Trade #r5#k #b#e#z4000038##n#k for #r1 random#k #b#echair#n#k #l\r\n#L3# Trade #r1#k #b#e#z4000038##n#k for #r2 random#k #e#bMaple Weapons#n#k #l\r\n#L4#Trade #r1#k #b#e#z4000038##n#k for a #e#b#z5030001##n#k#l\r\n#L5#Trade #r50#k #e#b#z4000038##n#k for #r1#k #e#b#z4001168##n#k #l#l\r\n#L6#Trade #r50#k #e#b#z4000038##n#k for #r1#k #e#b#z4001017##n#k #l#l\r\n#L7#Trade #r10#k #e#b#z4000038##n#k for #r1#k #b#e#z1472063##n#k for use in the Happyville raid! #l\r\n#L8#Trade #r1#k #b#e#z4000492##n#k for #b#eWIPE HYPE rewards#n#k #l\r\n#L9#Trade #r10#k #b#e#z5072000##n#k for #r1#k #b#e#z5076000##n#k #l\r\n#L10##rOne time#k #b#eFull SP Reset#n#k (level 120+ only) for #r10mil#k #b#eMesos#n#k");
		} else if (status == 1) {
			if (selection == 1) {
				if (cm.getMeso() >= 5000000) {
					cm.gainMeso(-5000000);
					cm.getPlayer().getCashShop().gainCash(1, 5000);
					cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have earned 5,000 NX"));

					cm.sendOk("Here is your 5,000 NX!");
					cm.logLeaf("5k NX");
				} else {
					cm.sendOk("Sorry, you don't have enough mesos!");
				}
				cm.dispose();
			} else if (selection == 2) {
				if (cm.haveItem(trophy, 5)) {
					var chair1 = chairs[Math.floor(Math.random() * chairs.length)];
					if (cm.canHold(chair1)) {
						cm.gainItem(trophy, -5);
						cm.gainItem(chair1);

						cm.sendOk("Here is your random chair!");
						cm.logLeaf("Chair ID: " + chair1);
					} else {
						cm.sendOk("Please make sure you have enough space to hold this chair!");
					}
				} else {
					cm.sendOk("Sorry, you don't enough Event Trophies!");
				}
				cm.dispose();
			} else if (selection == 3) {
				if (cm.haveItem(trophy, 1)) {
					var weapon1 = weapons[Math.floor(Math.random() * weapons.length)];
					var weapon2 = weapons[Math.floor(Math.random() * weapons.length)];
					var weapon3 = weapons[Math.floor(Math.random() * weapons.length)];
					if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(1)) {
						cm.gainItem(trophy, -1);
						cm.gainItem(weapon1, 1, true, true);
						cm.gainItem(weapon2, 1, true, true);
						//cm.gainItem(weapon3, 1, true, true);

						cm.sendOk("Here are your 2 random weapons!");
						cm.logLeaf("Maple Weapons IDs: " + weapon1 + "," + weapon2 + "," + weapon3);
					} else {
						cm.sendOk("Please make sure you have enough space to hold these weapons!");
					}
				} else {
					cm.sendOk("Sorry, you don't have an Event Trophy!");
				}
				cm.dispose();

			} else if (selection == 4) {
				if (cm.haveItem(trophy, 1)) {
					if (!cm.haveItem(5030000, 1)) {
						if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.CASH).isFull(1)) {
							cm.gainItem(trophy, -1);
							cm.gainItem(5030000, 1, false, true, 1000 * 60 * 60 * 24 * 10);
							//cm.gainItem(trophy, -1);
							cm.sendOk("Here is your Hired Merchant!");
							cm.logLeaf("10 day hired merchant");
						} else {
							cm.sendOk("Please make sure you have enough space to hold these items!");
						}
					} else {
						cm.sendOk("I can't give you a merchant if you already have one!");
					}
				} else {
					cm.sendOk("Sorry, you don't have an Event Trophy!");
				}
				cm.dispose();
			} else if (selection == 5) {
				if (cm.haveItem(trophy, 50)) {
					var goldenleaf = 4000313;
					if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).isFull(2)) {
						cm.gainItem(trophy, -50);
						cm.gainItem(goldenleaf, 1);
						//cm.gainItem(leaf, -50);
						cm.sendOk("Enjoy your Golden Maple Leaf");
						cm.logLeaf("1 Golden Maple Leaf");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
				} else {
					cm.sendOk("Sorry, you don't have enough Event Trophies!");
				}
				cm.dispose();
			} else if (selection == 8) {
				if (cm.haveItem(4000492, 1)) {
					if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(13) &&
						!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.SETUP).isFull(0) &&
						!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.CASH).isFull(7)) {
						var expires = 1000 * 24 * 60 * 60 * 90; // 90 days
						cm.gainItem(4000492, -1);

						for (var key in relaunchItemsExpire90) {
							cm.gainItem(parseInt(key), relaunchItemsExpire90[key], false, true, expires);
						}
						for (var i = 0; i < 4; i++)
							cm.gainItem(1112908, 1, false, true, expires); // for some reason you cant do 4 equips in one (aura rings)

						for (var i in relaunchItemsPerm)
							cm.gainItem(relaunchItemsPerm[i], 1);
						for (var i in relaunchPets)
							cm.gainItem(relaunchPets[i], 1, false, true, 10*365); // dry up in 10 year

						cm.sendOk("WIPE HYPE! Here are your item! Thanks for staying with MapleOrigin through the wipe. Happy Mapling!");
						cm.logLeaf("relaunch redemption");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
				} else {
					cm.sendOk("Sorry, you don't have a Certificate of Great Tester! Contact Light or slasso via discord to verify tester status.");
				}
				cm.dispose();
			} else if (selection == 9) {
				if (cm.haveItem(5072000, 10)) {
					var itemsmega = 5076000;
					if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
						//cm.gainItem(itemsmega, 1);
						cm.gainItem(5072000, -10);
						cm.gainItem(itemsmega, 1);
						cm.sendOk("Here is your Item Smega! Enjoy!");
						cm.logLeaf("1 Smega");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
				} else {
					cm.sendOk("Sorry, you don't have enough megaphones.");
				}
				cm.dispose();
			} else if (selection == 7) {
				if (cm.haveItem(trophy, 10)) {
					var magicmitten = 1472063;
					if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
						cm.gainItem(trophy, -10);
						cm.gainItem(magicmitten, 1);
						//cm.gainItem(trophy, -10);
						cm.sendOk("Here is your magic mitten! Enjoy the Happyville Raid!!");
						cm.logLeaf("1 Magic Mitten");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
				} else {
					cm.sendOk("Sorry, you don't have enough Event Trophies!");
				}
				cm.dispose();
			} else if (selection == 6) {
				if (cm.haveItem(trophy, 50)) {
					var eyeoffire = 4001017;
					if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)) {
						cm.gainItem(trophy, -50);
						cm.gainItem(eyeoffire, 1);
						//cm.gainItem(trophy, -50);
						cm.sendOk("Here is your eye of fire!");
						cm.logLeaf("1 Eye of Fire");
					} else {
						cm.sendOk("Please make sure you have enough space to hold these items!");
					}
				} else {
					cm.sendOk("Sorry, you don't have enough Event Trophies!");
				}
				cm.dispose();
			} else if (selection == 10) {
				if (cm.getPlayer().usedFullSpReset()) {
					cm.sendOk("You've already used your one time SP reset!");
				} else if (cm.getMeso() < 10000000) {
					cm.sendOk("Sorry, you don't enough mesos!");
				} else if (cm.getPlayer().getLevel() < 120) {
					cm.sendOk("You need to be at least level 120 to use my service!");
				} else {
					cm.getPlayer().resetSP();
					cm.gainMeso(-10000000);
					cm.sendOk("Enjoy your fresh start!");
				}
				cm.dispose();
			} else {
				cm.sendOk("Come back later!");
				cm.dispose();
			}
		}
	}
}
