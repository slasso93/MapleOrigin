/*
  Donor Shop NPC
  @author slasso
*/

var status = 0;

var rings = [1112135, 1115124, 1112196, 1112195, 1112161, 1112198, 1112165, 1112171, 1115108, 1112238, 1115035, 1115009, 1115008, 1112273, 1115011, 1112277, 1112283, 1115019];
var wings = [1102758, 1102378, 1102376, 1102624, 1102487, 1102184, 1102252, 1102253, 1102273, 1102318, 1102338, 1102349, 1102532, 1102546, 1102547, 1102548, 1102554, 1102604, 
				1102630, 1102642, 1102668, 1102697, 1102698, 1102699, 1102723, 1102724, 1102729, 1102758, 1102779, 1102798, 1102806, 1102823, 1102824, 1102874, 1102376, 1102377, 
				1102378, 1102385, 1102386, 1102450, 1102451, 1102452, 1102453];
var pets = [5000060, 5000111, 5000146, 5000176, 5000200, 5000243, 5000261, 5000270, 5000271, 5000272, 5000273, 5000293, 5000294, 5000295, 5000317, 5000621, 5000275];

var fhair = Array(37450, 38940, 38680, 38860, 39190, 39410, 39230, 39040);
var mhair = Array(38340, 40650, 40060, 40300, 37160, 40390, 40400, 40510);
var mface = new Array(23086, 24012, 25025, 25011, 21078, 25050);
var fface = new Array(25044, 24079, 26096, 28020, 27017, 27053, 21094);
var beauty = -1;

var type;
var costs = {
	rings: 2,
	pets: 5,
	name: 10,
	wings: 10,
	hair: 5,
	face: 5
};

function start() {
    cm.sendSimple("Hi! I can exchange #v4000492# for various donor items! What would u like to buy? (More to come!)#b\r\n" + 
			"#L1# Buy Chat & Label Rings for 2 CoGT  #b\r\n" + 
			"#L2# Buy Pets for 5 CoGT#b\r\n" + 
			"#L3# Name Change for 10 CoGT#b\r\n" + 
			"#L4# Buy Wings for 10 CoGT\r\n" + 
			"#L5# Haircut for 5 CoGT \r\n" +
			"#L6# Plastic Surgery for 5 CoGT"
	);
}

function action (m,t,s) {
    if (m < 1) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 1) {
        if (s == 1) {
			type = 'rings';
            var selStr = "#e#kRing Shop:#n #r2#b #e#z4000492##n#k\r\n#bRings are +1 all stats#b";
            for (var i = 0; i < rings.length; i++)
				selStr += "\r\n#L" + i + "##v" + rings[i] + "##e#z" + rings[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 2) {
			type = 'pets';
            var selStr = "#e#kPet Shop:#n #r5#b #e#z4000492##n#k\r\nFun Fact: For 1m free nx #bCLICK HERE #b";
            for (var i = 0; i < pets.length; i++)
                selStr += "\r\n#L" + i + "##v" + pets[i] + "##e#z" + pets[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 3) {
            var selStr = "#e#kName Change Shop:#n #r10#b #e#z4000492##n#k\r\nPlease enter your new name below.";
            cm.sendGetText(selStr);
        } else if (s == 4) {
			type = 'wings';
		    var selStr = "#e#kWing Shop:#n #r10#b #e#z4000492##n#k\r\nFun Fact: For 1m free nx #bCLICK HERE #b";
            for (var i = 0; i < wings.length; i++)
				selStr += "\r\n#L" + i + "##v" + wings[i] + "##e#z" + wings[i] + "##n";
			
            cm.sendSimple(selStr);
        } else if (s == 5) { //Hair selection
            beauty = 1;
            hairnew = Array();
            if (cm.getPlayer().getGender() == 0)
                for(var i = 0; i < mhair.length; i++)
                    hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair()% 10));
            if (cm.getPlayer().getGender() == 1)
                for(var i = 0; i < fhair.length; i++)
                    hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
            cm.sendStyle("#eWant a new Hairstyle? If you have 5 #b#t4000492##k I'll change it for you!", hairnew);
        } else if (s == 3) { //Face Selection
           beauty = 2;
            facenew = Array();
            if (cm.getPlayer().getGender() == 0) {
                for(var i = 0; i < mface.length; i++)
                    facenew.push(mface[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
            }
            if (cm.getPlayer().getGender() == 1) {
                for(var i = 0; i < fface.length; i++)
                    facenew.push(fface[i] + parseInt(cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100)));
            }
            cm.sendStyle("#eWant Plastic Surgery? If you have a #b#t4000492##k I'll change it for you!", facenew);
        }
    } else if (status == 2) {
        var text = cm.getText();

        if (beauty == 1) { // hair
            if (cm.haveItem(4000492, costs.hair)) {
                cm.gainItem(4000492, -costs.hair);
                cm.setHair(hairnew[s]);
                cm.sendOk("#eEnjoy your new and improved Haircut!");
            } else
                cm.sendOk("#e#rYou'll need " + costs.hair + " #b#t4000492##k");
        } else if (beauty == 2) { // face
            if (cm.haveItem(4000492, costs.face)) {
               cm.gainItem(4000492, -costs.face);
               cm.setFace(facenew[s]);
               cm.sendOk("#eEnjoy your new and improved Face!");
            } else
                cm.sendOk("#e#rYou'll need " + costs.face + " #b#t4000492##k");
        } else if (text != null) { // name change
			if (cm.haveItem(4000492, costs.name)) {
				var canCreate = Packages.client.MapleCharacter.canCreateChar(text);
				if (canCreate) {
					cm.gainItem(4000492, -costs.name);
					cm.getPlayer().setName(text);
					cm.getPlayer().changeName(text);
					cm.sendOk("Your name has been changed to #b" + text + "#k. You will have to login again for this to take effect.", 1);
				} else {
					cm.sendNext("I'm afraid you can't use the name #b" + text + "#k or it is already taken.", 1);
				}
			} else {
                cm.sendOk("#e#rYou'll need " + costs.name + " #b#t4000492##k");
			}
        } else { // item purchase
			if (cm.haveItem(4000492, costs[type])) {
				cm.gainItem(4000492, -costs[type]);
				if (type == 'rings') cm.gainItem(rings[s], 1);
				if (type == 'pets') cm.gainItem(pets[s], 1, false, true, 10 * 365 * 1000 * 60 * 60 * 24); // 10 years before it dries up
				if (type == 'wings') cm.gainItem(wings[s], 1);
				
			} else {
                cm.sendOk("#e#rYou'll need " + costs[type] + " #b#t4000492##k");
			}
			
		}
		cm.dispose();
	}
	
}
