var status = -1;
var exchangeItem = 4000440;

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
        cm.sendSimple("The monsters are advancing.. I can't fight. I was badly injured by the Primitive Boars...#b\r\n#L0#Hey, take these boar hides. You can recover from them.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 500)) {
	    cm.sendNext("You don't have enough... I need at least 500.");
	    cm.dispose();
	} else {
	    cm.sendGetNumber("Hey, that's a good idea! I can give you #i2049001##v2049001# for each 500 #i" + exchangeItem + "##t" + exchangeItem + "# you give me. How many do you want? (Current Items: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 500), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 500));
	}
    } else if (status == 2) {
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 500) {
	    if (!cm.canHold(2049001, selection)) {
		cm.sendOk("Please make some space in ETC tab.");
	    } else {
		cm.gainItem(2049001, selection);
		cm.gainItem(exchangeItem, -(selection * 500));
		cm.sendOk("Thanks!");
	    }
	}
        cm.dispose();
    }
}
