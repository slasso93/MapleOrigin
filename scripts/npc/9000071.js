/*
  Event NPC (All Seasons)
  @author slasso && Kris
  @version 1.0
*/

importPackage(Packages.tools);
importPackage(Packages.constants.inventory);
importPackage(Packages.client.inventory);

var status;
var exchangeItem = 4032176;
var costume = [1003196,1050513,1051582,1072278,1702248,1004874,1012179,1052031,1000026,1050119,1070005,1082101,1001036,1051131,1071016,1012007,1050019,1051484,1072253,1702210,1002225]
var equipment = [1002728,1012011,1012012,1012013,1012014,1072427,1072428,1072432,1072429,1072431,1302080,1332032];
var rings = [1112290,1112178,1112199,1115015,1115034,1115123];
var pets = [5000828,5000933,5000934,5000935];
var chairs = [3015034,3015405,3015433,3010767,3015420,3015421,3015422];

var item;
var type;
var costs = {
	costume:1,
	equipment:1,
	rings:1,
	pets:1,
	chairs:1,
	twentyfive:25,
	fifty:50,
	hundred:100,
	hundredfifty:150,
	twohundredfifty:250,
	threehundred:300,
	fivehundred:500,
	sixhundred:600,
	sevenhundredfifty:750,
	onethousand:1000,
};

function start() {
	status=-1;
	cm.sendSimple("Mwerry Cwismess #b#e#h ##n#k eatz de seezon two bi jorlly!\r\n"+
			"You currently have #r#c" + exchangeItem + "# #b#e#z" + exchangeItem + "##k#n\r\nWhat would you like to do?\r\n" +
			"#L1# #bExchange #r#e#z" + exchangeItem + "##n#b for NX Costumes\r\n" +
			"#L2# #bExchange #r#e#z" + exchangeItem + "##n#b for Festive Equipment\r\n" +
			"#L3# #bExchange #r#e#z" + exchangeItem + "##n#b for Festive Rings\r\n" +
			"#L4# #bExchange #r#e#z" + exchangeItem + "##n#b for Festive Pets\r\n" +
			"#L5# #bExchange #r#e#z" + exchangeItem + "##n#b for Festive Chairs"
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
			type = 'costume';
			var selStr = "#eNX Equip Exchange\n\r\nYou currently have #r#c" + exchangeItem + "# #b#e#z" + exchangeItem + "##k#n\r\n" + 
			"\r\n#L0##v" + costume[0] + "##e#z" + costume[0] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L1##v" + costume[1] + "##e#z" + costume[1] + "# For #r100 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L2##v" + costume[2] + "##e#z" + costume[2] + "# For #r100 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L3##v" + costume[3] + "##e#z" + costume[3] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L4##v" + costume[4] + "##e#z" + costume[4] + "# For #r100 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L5##v" + costume[5] + "##e#z" + costume[5] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L6##v" + costume[6] + "##e#z" + costume[6] + "# For #r25 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L7##v" + costume[7] + "##e#z" + costume[7] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L8##v" + costume[8] + "##e#z" + costume[8] + "# For #r150 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L9##v" + costume[9] + "##e#z" + costume[9] + "# For #r250 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L10##v" + costume[10] + "##e#z" + costume[10] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L11##v" + costume[11] + "##e#z" + costume[11] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L12##v" + costume[12] + "##e#z" + costume[12] + "# For #r150 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L13##v" + costume[13] + "##e#z" + costume[13] + "# For #r250 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L14##v" + costume[14] + "##e#z" + costume[14] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L15##v" + costume[15] + "##e#z" + costume[15] + "# For #r100 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L16##v" + costume[16] + "##e#z" + costume[16] + "# For #r250 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L17##v" + costume[17] + "##e#z" + costume[17] + "# For #r250 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L18##v" + costume[18] + "##e#z" + costume[18] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L19##v" + costume[19] + "##e#z" + costume[19] + "# For #r100 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L20##v" + costume[20] + "##e#z" + costume[20] + "# For #r150 #b#e#z" + exchangeItem + "##k " ;
            cm.sendSimple(selStr);
        } else if (s == 2) {
			type = 'equipment';
            var selStr = "#eEquipment Exchange\n\r\nYou currently have #r#c" + exchangeItem + "# #b#e#z" + exchangeItem + "##k#n\r\n" + 
			"\r\n#L0##v" + equipment[0] + "##e#z" + equipment[0] + "# For #r100 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L1##v" + equipment[1] + "##e#z" + equipment[1] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L2##v" + equipment[2] + "##e#z" + equipment[2] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L3##v" + equipment[3] + "##e#z" + equipment[3] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L4##v" + equipment[4] + "##e#z" + equipment[4] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L5##v" + equipment[5] + "##e#z" + equipment[5] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L6##v" + equipment[6] + "##e#z" + equipment[6] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L7##v" + equipment[7] + "##e#z" + equipment[7] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L8##v" + equipment[8] + "##e#z" + equipment[8] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L9##v" + equipment[9] + "##e#z" + equipment[9] + "# For #r300 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L10##v" + equipment[10] + "##e#z" + equipment[10] + "# For #r100 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L11##v" + equipment[11] + "##e#z" + equipment[11] + "# For #r25 #b#e#z" + exchangeItem + "##k " ;
            cm.sendSimple(selStr);
        } else if (s == 3) {
			type = 'rings';
            var selStr = "#eRing Exchange\n\r\nYou currently have #r#c" + exchangeItem + "# #b#e#z" + exchangeItem + "##k#n\r\n" + 
			"\r\n#L0##v" + rings[0] + "##e#z" + rings[0] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L1##v" + rings[1] + "##e#z" + rings[1] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L2##v" + rings[2] + "##e#z" + rings[2] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L3##v" + rings[3] + "##e#z" + rings[3] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L4##v" + rings[4] + "##e#z" + rings[4] + "# For #r50 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L5##v" + rings[5] + "##e#z" + rings[5] + "# For #r50 #b#e#z" + exchangeItem + "##k ";
            cm.sendSimple(selStr);
        } else if (s == 4) {
			type = 'pets';
            var selStr = "#ePet Exchange\n\r\nYou currently have #r#c" + exchangeItem + "# #b#e#z" + exchangeItem + "##k#n\r\n" + 
			"\r\n#L0##v" + pets[0] + "##e#z" + pets[0] + "# For #r500 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L1##v" + pets[1] + "##e#z" + pets[1] + "# For #r1000 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L2##v" + pets[2] + "##e#z" + pets[2] + "# For #r1000 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L3##v" + pets[3] + "##e#z" + pets[3] + "# For #r1000 #b#e#z" + exchangeItem + "##k ";
            cm.sendSimple(selStr);
        } else if (s == 5) {
			type = 'chairs';
            var selStr = "#eChair Exchange\n\r\nYou currently have #r#c" + exchangeItem + "# #b#e#z" + exchangeItem + "##k#n\r\n" + 
			"\r\n#L0##v" + chairs[0] + "##e#z" + chairs[0] + "# For #r750 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L1##v" + chairs[1] + "##e#z" + chairs[1] + "# For #r600 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L2##v" + chairs[2] + "##e#z" + chairs[2] + "# For #r600 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L3##v" + chairs[3] + "##e#z" + chairs[3] + "# For #r500 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L4##v" + chairs[4] + "##e#z" + chairs[4] + "# For #r500 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L5##v" + chairs[5] + "##e#z" + chairs[5] + "# For #r500 #b#e#z" + exchangeItem + "##k " +
			"\r\n#L6##v" + chairs[6] + "##e#z" + chairs[6] + "# For #r500 #b#e#z" + exchangeItem + "##k ";
            cm.sendSimple(selStr);
        }
    } else if(status == 1) {
		if (type) {
			if (type == 'costume') item = costume[s];
			if (type == 'equipment') item = equipment[s];
			if (type == 'rings') item = rings[s];
			if (type == 'pets') item = pets[s];
			if (type == 'chairs') item = chairs[s];

			
			cm.sendYesNo("Are you sure you want to buy #i" + item + "##e#b#z" + item +"?");
		}
	} else if (status == 2) {
        var text = cm.getText();
			if (item == pets[1] || item == pets[2] || item == pets[3]){ // COST = 1000
				type ="onethousand";
			} else if (item == chairs[0]){
				type ="sevenhundredfifty";
			} else if (item == chairs[1] || item == chairs[2]){
				type ="sixhundred";
			} else if (item == pets[0] || item == chairs[3] || item == chairs[4] || item == chairs[5] || item == chairs[6]){ // COST = 500
				type ="fivehundred";
			} else if (item == equipment[1] || item == equipment[2] || item == equipment[3] || item == equipment[4] || item == equipment[5] || item == equipment[6] || item == equipment[7] || item == equipment[8] || item == equipment[9] || item == equipment[10]) { // COST = 300
				type="threehundred";
			} else if (item == costume[9] || item == costume[13] || item == costume[16] || item == costume[17]){ // COST = 250
				type ="twohundredfifty";
			} else if (item == costume[8] || item == costume[12] || item == costume[20]){ // COST = 150
				type ="hundredfifty";
			} else if (item == costume[1] || item == costume[2] || item == costume[4] || item == costume[15] || item == costume[19] || item == equipment[0] || item == equipment[10]){
				type ="hundred";
			} else if (item == costume[0] || item == costume[3] || item == costume[5] || item == costume[7] || item == costume[10] || item == costume[11] || item == costume[14] || item == costume[18] || item == rings[0] || item == rings[1] || item == rings[2] || item == rings[3] || item == rings[4] || item == rings[5]){ // cost 50
				type ="fifty";
			} else if (item == costume[11]) { // COST = 25
				type ="twentyfive";
			}
			if (!cm.haveItem(exchangeItem, costs[type])) {
                cm.sendOk("#e#rYou'll need " + costs[type] + "#b#e#z " + exchangeItem + "##k#n");
            } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(item)).isFull(0)) {
                cm.sendOk("Your inventory is full! Please make room and try again.");
            } else {
				cm.gainItem(exchangeItem, -costs[type]);
				if (item == pets[0] || item == pets[1] || item == pets[2] || item == pets[3]){
					cm.gainItem(item, 1, false, true, 10 * 365 * 1000 * 60 * 60 * 24);
				} else {
					cm.gainItem(item, 1);
				}
			}
		cm.dispose();
	}
	
}

