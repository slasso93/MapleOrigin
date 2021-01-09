/*
  Event NPC (All Seasons)
  @author Huy & Kris
  @version 1.1
*/

importPackage(Packages.tools);
importPackage(Packages.constants.inventory);
importPackage(Packages.client.inventory);

var status;
var exchangeItem = 4032942;
var shop = [5570000, 2049100, 5220020, 2049003, 2022282, 2022283];
var price = [50, 10, 8, 8, 2, 2];

var item;
var type;
var costs = {
	shop:1,
	hammer: 50,
	chaos: 10,
	CSS: 8,
	NXGach: 8,
	NX: 4,
	naricain: 2,
  	subani: 2,
};

function start() {
	status=-1;
	cm.sendSimple("Hi! I can exchange #v4032942# for various rewards! What would u like to buy? (More to come!)#b\r\n" +
	"#L1# Go to Event Store  #b\r\n"
	);
}

function action (m,t,s) {
    if (m < 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        if (s == 1) {
			type = 'shop';
			var selStr = "You currently have #r#c" + exchangeItem + "# #b#e#z" + exchangeItem + "##k#n\r\nWhat would you like to do?\r\n";
            for (var i = 0; i < shop.length; i++)
				selStr += "\r\n#L" + i + "##v" + shop[i] + "##e#z" + shop[i] + "##n" + " for " + price[i] + " Event Coins";
				selStr += "\r\n#L6#Buy #r10,000 #b#eNX#n#k for 4 Event Coins\r\n"
				cm.sendSimple(selStr);
		} 
    } else if(status == 1) {
		if (type) {
			if (type == 'shop' && s != 6){
				item = shop[s]
				cm.sendYesNo("Are you sure you want to buy #i" + item + "##e#b#z" + item +"?");
			} else if (s == 6) {
				type = 'NX';
				cm.gainItem(exchangeItem, -costs[type]);
				cm.getPlayer().getCashShop().gainCash(1, 10000);
				cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have earned 10,000 NX"));
				cm.dispose();
			}
		}
	} else if (status == 2) {
        var text = cm.getText();
		if (item == shop[0]){//COST = 50
			type ="hammer";
		} else if (item == shop[1]){//COST = 10d
			type ="chaos";
		} else if (item == shop[2]){//COST = 8
			type = "NXGach";
		} else if (item == shop[3]){
			type = "CSS";
		} else if (item == shop[4]){//COST = 2
			type ="naricain";
		} else if (item == shop[5]){//COST = 2
			type="naricain";
		}
		if (!cm.haveItem(exchangeItem, costs[type])) {
			cm.sendOk("#e#rYou'll need " + costs[type] + "#b#e#z " + exchangeItem + "##k#n");
		} else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(item)).isFull(0)) {
			cm.sendOk("Your inventory is full! Please make room and try again.");
		} else {
			cm.gainItem(exchangeItem, -costs[type]);
			cm.gainItem(item, 1);
		}
		cm.dispose();
	}
	
}

