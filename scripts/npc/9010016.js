/*
Strider Votepoint (VP) NPC
*/

importPackage(Packages.tools);
importPackage(Packages.constants.inventory);
importPackage(Packages.client.inventory);

var status = 0;
var selectedItem;

var items = [
      { id: 2022282, cost: 5 }, // Naricain's
      { id: 2022283, cost: 5 }, // Subani's
      { id: 2049115, cost: 20 }, // innocence scroll 40%
      { id: 5041001, cost: 2, expiration: 1 }, // Hyper Teleport Rock 1 day
      { id: 5041001, cost: 10, expiration: 7 }, // Hyper Teleport Rock 7 day
      { id: 5450000, cost: 2, expiration: 7 }, // miu miu 7 days
      { id: 5520000, cost: 1, expiration: 90 }, // SoK
      { id: 5130000, cost: 1, expiration: 90 }, // charm
      { id: 5130000, cost: 4, expiration: 90, quantity: 5 }, // charm x5
      { id: 5510000, cost: 1, expiration: 90 }, // wheel
      { id: 5050000, cost: 1, expiration: 90 }, // ap reset
      { id: 5050001, cost: 1, expiration: 90 }, // sp reset 1st
      { id: 5050002, cost: 1, expiration: 90 }, // sp reset 2nd
      { id: 5050003, cost: 2, expiration: 90 }, // sp reset 3rd
      { id: 5050004, cost: 3, expiration: 90 } // sp reset 4th
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

		if (status == 0) { // first shop page
		    var vp = cm.getPlayer().getClient().getVotePoints();
			var shopStr = "Hello #b#e#h ##n#k, you currently have #r" + vp + " #b#eVotePoints#k#n\r\nWhat would you like to do?\r\n";

			for (var i = 0; i < items.length; i++) {
			    var item = items[i];

			    var expStr = "";
			    if (item.id == 5450000 || item.id == 5041001) // miu add (7 day) / hyper rock
			        expStr = "[" + item.expiration + " Day] ";
			    shopStr += "#L" + (i+1) + "# Buy #r" + (item.quantity || 1) + " #b#e" + expStr + "#z" + item.id + "##n#k for #r" + item.cost + "#k votepoints#l\r\n";
			}
		    cm.sendSimple(shopStr);
        } else if (status == 1) { // confirm selection with yes/no
			var item = items[selection - 1];
			var shopStr = "Are you sure you want to purchase #r" + (item.quantity || 1) + " #b#e#z" + item.id + "##n#k for #r" + item.cost + "#k votepoints#l\r\n";
            selectedItem = item;
		    cm.sendYesNo(shopStr);
        } else if (status == 2) { // finalize the purchase
		    var vp = cm.getPlayer().getClient().getVotePoints();
            if (vp < selectedItem.cost) {
                cm.sendOk("Sorry you do not have enough votepoints to make this purchase. #r#eRemember to keep voting for MapleOrigin on gtop100!");
            } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(selectedItem.id)).isFull(0)) {
                cm.sendOk("Your inventory is full! Please make room and try again.");
            } else {
                cm.getPlayer().getClient().useVotePoints(selectedItem.cost, selectedItem.id);
                cm.gainItem(selectedItem.id, selectedItem.quantity || 1);

                cm.sendOk("Thank you for spending your votepoints, remember to keep voting :)\r\nYou have #r" +
                        cm.getPlayer().getClient().getVotePoints() + " #b#e votepoints#n#k remaining." );
            }
            cm.dispose();
        }
    }
}
