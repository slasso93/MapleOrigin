/*
  Donor Shop NPC
  @author slasso
*/

importPackage(Packages.tools);
importPackage(Packages.constants.inventory);
importPackage(Packages.client.inventory);

var status;
var nxGach = 5220020;
var pashima = [1102423, 1102424, 1102425, 1102426, 1102427, 1102428, 1102429];
var cardigan = [1053518, 1053519, 1053520, 1053521, 1053522, 1053523];
var ribbon = [1005462,1005463,1005464,1005465,1005466,1005467,1005468,1005469];
var beret = [1005471,1005472,1005473,1005474,1005475,1005476];
var lilyAndNero = [1005563,1053594,1005562,1053593];
var jesterSpirit = [1005585,1005586,1053617,1053618,1073464,1703024];
var forestWitch = [1005587,1053619,1073465,1703025];
var blingCoral = [1053584,1053585,1703007];
var backpack = [1053586,1053587,1053588,1053589,1053590];
var fluffyBunny = [1005455,1053513];
var starryLight = [1005336,1005337,1053423,1053424,1073348,1073349,1702913];
var shimerring = [1051566,1071117];
var anorak = [1005436,1053505];
var sleepy = [1005506,1005507,1053547,1053546];

var item;
var type;
var costs = {
	pashima: 200,
	cardigan: 175,
	ribbon: 30,
	beret: 70,
	fifteen:15,
	twenty:20,
	thirty:30,
	fifty:50,
	seventy:70,
	eighty:80,
	seventyfive:75,
	hundred:100,
	hundredtwentyfive:125,
	hundredfifty:150,
	
};

function start() {
	status=-1;
	cm.sendSimple("You currently have #r#c" + nxGach + "# #b#e#z" + nxGach + "##k#n\r\nWhat would you like to do?\r\n" +
			"#L1# #b[1] Pashima for #r200 #b#e#z" + nxGach + "##k#n\r\n" +
			"#L2# #b[2] Baggy Cardigan for #r175 #b#e#z" + nxGach + "##k#n\r\n" +
			"#L3# #b[3] Butterfly Ribbon for #r30 #b#e#z" + nxGach + "##k#n\r\n" +
			"#L4# #b[4] Oversized Beret for #r70 #b#e#z" + nxGach + "##k#n\r\n" +
			"#L5# #b[5] Lily and Nero Set #k#n\r\n" +
			"#L6# #b[6] Jester Spirit Set #k#n\r\n" +
			"#L7# #b[7] Forest Witch Set #k#n\r\n" +
			"#L8# #b[8] Bling Coral Set #k#n\r\n" +
			"#L9# #b[9] Backpack Outfit Set #k#n\r\n" +
			"#L10# #b[10] Fluffy Bunny Set #k#n\r\n" +
			"#L11# #b[11] Starry Light Set #k#n\r\n" +
			"#L12# #b[12] Shimmering Starlight Set #k#n\r\n" +
			"#L13# #b[13] Yellow Anorak Set #k#n\r\n" +
			"#L14# #b[14] Sleepy Set Set #k#n\r\n"
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
			type = 'pashima';
            var selStr = "#ePashima Shop #r200 #bNX Gachapon Each#k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach + "##k#n\r\n";
            for (var i = 0; i < pashima.length; i++)
				selStr += "\r\n#L" + i + "##v" + pashima[i] + "##e#z" + pashima[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 2) {
			type = 'cardigan';
            var selStr = "#eBaggy Cardigan Shop #r175 #bNX Gachapon Each#k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach + "##k#n\r\n";
            for (var i = 0; i < cardigan.length; i++)
                selStr += "\r\n#L" + i + "##v" + cardigan[i] + "##e#z" + cardigan[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 3) {
			type = 'ribbon';
            var selStr = "#eButterfly Ribbon Shop #r30 #bNX Gachapon Each#k\n\r\nYou currently have #r#c" + nxGach +"# #b#e#z" + nxGach + "##k#n\r\n";
			for (var i = 0; i < ribbon.length; i++)
				selStr += "\r\n#L" + i + "##v" + ribbon[i] + "##e#z" + ribbon[i] + "##n";
            cm.sendSimple(selStr);
        } else if (s == 4) {
			type = 'beret';
		    var selStr = "#eOversized Beret Shop #r70 #bNX Gachapon Each#k\n\r\nYou currently have #r#c" + nxGach +"# #b#e#z" + nxGach + "##k#n\r\n";
            for (var i = 0; i < beret.length; i++)
				selStr += "\r\n#L" + i + "##v" + beret[i] + "##e#z" + beret[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 5) { 
			type = 'lilyAndNero';
		    var selStr = "#eLily and Nero Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nHats:#r30 #bNX Gachapon Each\r\n#kOveralls:#r70 #bNX Gachapon Each";
           for (var i = 0; i < lilyAndNero.length; i++)
				selStr += "\r\n#L" + i + "##v" + lilyAndNero[i] + "##e#z" + lilyAndNero[i] + "##n";
				
            cm.sendSimple(selStr);
        } else if (s == 6) { 
			type = 'jesterSpirit';
		    var selStr = "#eJester Spirit Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nHats:#r50 #bNX Gachapon Each\r\n#kOveralls:#r150 #bNX Gachapon Each\r\n#kShoes:#r15 #bNX Gachapon Each\r\n#kWeapons:#r150 #bNX Gachapon Each";
            for (var i = 0; i < jesterSpirit.length; i++)
				selStr += "\r\n#L" + i + "##v" + jesterSpirit[i] + "##e#z" + jesterSpirit[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 7) { 
			type = 'forestWitch';
		    var selStr = "#eForest Witch Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nHats:#r50 #bNX Gachapon Each\r\n#kOveralls:#r75 #bNX Gachapon Each\r\n#kShoes:#r15 #bNX Gachapon Each\r\n#kWeapons:#r100 #bNX Gachapon Each";
            for (var i = 0; i < forestWitch.length; i++)
				selStr += "\r\n#L" + i + "##v" + forestWitch[i] + "##e#z" + forestWitch[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 8) {
			type = 'blingCoral';
		    var selStr = "#eBling Coral Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\n#kOveralls:#r30 #bNX Gachapon Each\r\n#kWeapons:#r75 #bNX Gachapon Each";
            for (var i = 0; i < blingCoral.length; i++)
				selStr += "\r\n#L" + i + "##v" + blingCoral[i] + "##e#z" + blingCoral[i] + "##n";
			
            cm.sendSimple(selStr);	
		} else if (s == 9) {
			type = 'backpack';
		    var selStr = "#eBackpack Outfit Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nOveralls:#r75 #bNX Gachapon Each";
            for (var i = 0; i < backpack.length; i++)
				selStr += "\r\n#L" + i + "##v" + backpack[i] + "##e#z" + backpack[i] + "##n";
			
            cm.sendSimple(selStr);
		} else if (s == 10) {
			type = 'fluffyBunny';
		    var selStr = "#eFluffy Bunny Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nHats:#r100 #bNX Gachapon Each\r\n#kOveralls:#r100 #bNX Gachapon Each\r\n";
            for (var i = 0; i < fluffyBunny.length; i++)
				selStr += "\r\n#L" + i + "##v" + fluffyBunny[i] + "##e#z" + fluffyBunny[i] + "##n";
			
            cm.sendSimple(selStr);
		} else if (s == 11) {
			type = 'starryLight';
		    var selStr = "#eStarry Light Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nHats:#r50 #bNX Gachapon Each\r\n#kOveralls:#r125 #bNX Gachapon Each\r\n#kShoes:#r20 #bNX Gachapon Each\r\n#kWeapons:#r150 #bNX Gachapon Each";
            for (var i = 0; i < starryLight.length; i++)
				selStr += "\r\n#L" + i + "##v" + starryLight[i] + "##e#z" + starryLight[i] + "##n";
			
            cm.sendSimple(selStr);
		} else if (s == 12) {
			type = 'shimerring';
		    var selStr = "#eShimmering Starlight Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nOveralls:#r80 #bNX Gachapon Each\r\n#kShoes:#r15 #bNX Gachapon Each";
            for (var i = 0; i < shimerring.length; i++)
				selStr += "\r\n#L" + i + "##v" + shimerring[i] + "##e#z" + shimerring[i] + "##n";
			
            cm.sendSimple(selStr);
		} else if (s == 13) {
			type = 'anorak';
		    var selStr = "#eYellow Anorak Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nHats:#r50 #bNX Gachapon Each\r\n#kOveralls:#r50 #bNX Gachapon Each";
            for (var i = 0; i < anorak.length; i++)
				selStr += "\r\n#L" + i + "##v" + anorak[i] + "##e#z" + anorak[i] + "##n";
			
            cm.sendSimple(selStr);
		} else if (s == 14) {
			type = 'sleepy';
		    var selStr = "#eSleepy Set Shop #k\n\r\nYou currently have #r#c" + nxGach + "# #b#e#z" + nxGach +
			"##k#n\r\nHats:#r80 #bNX Gachapon Each\r\n#kOveralls:#r50 #bNX Gachapon Each";
            for (var i = 0; i < sleepy.length; i++)
				selStr += "\r\n#L" + i + "##v" + sleepy[i] + "##e#z" + sleepy[i] + "##n";
			
            cm.sendSimple(selStr);
		}
    } else if(status == 1) {
		if (type) {
			if (type == 'pashima') item = pashima[s];
			if (type == 'cardigan') item = cardigan[s];
			if (type == 'ribbon') item = ribbon[s];
			if (type == 'beret') item = beret[s];
			if (type == 'lilyAndNero') item = lilyAndNero[s];
			if (type == 'jesterSpirit') item = jesterSpirit[s];
			if (type == 'forestWitch') item = forestWitch[s];
			if (type == 'blingCoral') item = blingCoral[s];
			if (type == 'backpack') item = backpack[s];
			if (type == 'fluffyBunny') item = fluffyBunny[s];
			if (type == 'starryLight') item = starryLight[s];
			if (type == 'shimerring') item = shimerring[s];
			if (type == 'anorak') item = anorak[s];
			if (type == 'sleepy') item = sleepy[s];
			
			cm.sendYesNo("Are you sure you want to buy #i" + item + "##e#b#z" + item +"?");
		}
	} else if (status == 2) {
        var text = cm.getText();
			if (item == jesterSpirit[4]  || item == forestWitch[2] || item == shimerring[1]){//COST = 15
				type ="fifteen";
			} else if (item == starryLight[4] || item == starryLight[5]){ // COST =20
				type ="twenty";
			} else if (item == lilyAndNero[0] || item == lilyAndNero[2] || item == blingCoral[0] || item == blingCoral[1] ){ //COST = 30
				type = "thirty";
			} else if (item == jesterSpirit[0] || item == jesterSpirit[1] || item == forestWitch[0] || item == starryLight[0] || item == starryLight[1] || item == anorak[0] || item == anorak[1] || item == sleepy[2] || item == sleepy[3]){//COST = 50
				type = "fifty";
			} else if (item == lilyAndNero [1] || item == lilyAndNero[3]) {//COST = 70
				type = "seventy";
			} else if (item == forestWitch[1] || item == blingCoral[2] || item == backpack[0] || item == backpack[1] || item == backpack[2] || item == backpack[3] || item == backpack[4]){ //COST = 75
				type ="seventyfive";
			} else if (item == shimerring[0] || item == sleepy[0] || item == sleepy[1]){ // COST = 80
				type ="eighty";
			} else if (item == forestWitch[3] || item == fluffyBunny[0] || item == fluffyBunny[1]) {// COST = 100
				type ="hundred";
			} else if (item == starryLight[2] || item == starryLight[3]){ // COST = 125
				type ="hundredtwentyfive";
			} else if (item == jesterSpirit[2] || item == jesterSpirit[3] || item == jesterSpirit[5] || item == starryLight[6]){//COST = 150
				type ="hundredfifty";
			}
			
			if (!cm.haveItem(5220020, costs[type])) {
                cm.sendOk("#e#rYou'll need " + costs[type] + "#b#e#z " + nxGach + "##k#n");
            } else if (cm.getPlayer().getInventory(ItemConstants.getInventoryType(item)).isFull(0)) {
                cm.sendOk("Your inventory is full! Please make room and try again.");
            } else {
				cm.gainItem(5220020, -costs[type]);
				cm.gainItem(item, 1);
				
			}
		cm.dispose();
	}
	
}

