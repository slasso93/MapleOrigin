/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 * @Name         KIN
 * @Author:      slasso
 * @NPC:         9900001
 * @Purpose:     Name reservations.
 */
/*
var purpose = "reload reactor drops"

var state = "INTRO";
importPackage(Packages.scripting.reactor);

function start() {
	cm.sendYesNo("Current purpose is #e#b" + purpose);
    //cm.sendYesNo("Hi #b#e#h ##n#k! I'm here to help you reserve a name for the server wipe. You can only reserve ONE name across all of your accounts. You can edit the name up until the wipe. Would you like to check on your name reservation?");
}

function action(mode, type, selection, message) {
    if (mode < 1)
        cm.dispose();
    else {
		cm.sendOk("Reactor drops reloaded");
		ReactorScriptManager.getInstance().clearDrops();
		cm.dispose();
        /*if (state == "INTRO") {
            displayReservedName();
        } else if (state == "CHOOSE") {
            if (selection == 1) // nothing
                cm.dispose();
            else if (selection == 2) // update name
                enterName(true);
            else if (selection == 3) // delete name
                deleteName();
        } else if (state == "CHANGE_NAME") { // enter name
            enterName();
        } else if (state == "RESERVE_INSERT") { // insert
            reserveName();
        } else if (state == "RESERVE_UPDATE") { // update
            updateName();
        } else {
            cm.dispose();
        }*/
		/*
    }
}

function displayReservedName() {
    var res = cm.getClient().getReservedName();
    if (res != null) {
        cm.sendSimple("You have reserved the name #b#e" + res.getRight() + "#n#k for account #b#e" + res.getLeft() + "#n#k. What would you like to do?\r\n#L1##bKeep this name#l\r\n#L2#Change reserved name#l\r\n#L3#Remove reserved name#l#k");
        state = "CHOOSE";
    } else {
        cm.sendYesNo("You currently do not have a name reserved. Would you like to reserve a name?");
        state = "CHANGE_NAME";
    }
}

function enterName(update) {
    state = update ? "RESERVE_UPDATE" : "RESERVE_INSERT";
    cm.sendGetText("What name would you like to reserve?");
}

function updateName() {
    var updated = cm.getClient().updateReservedName(cm.getText());
    if (updated) {
        cm.sendOk("Your reserved name has been updated. Talk to me again if you'd like to change your reservation.\r\n#rNOTE: We will remove unclaimed reservations 2 days after the server wipe!#k")
    } else {
        cm.sendOk("Unable to reserve this name. Either it does not following the naming guidelines or someone has already claimed this name.");
    }
    cm.dispose();
}

function deleteName() {
    var deleted = cm.getClient().deleteReservedName();
    if (deleted) {
        cm.sendOk("Your reserved name has been cleared. Talk to me again to reserve a new name.")
    } else {
        cm.sendOk("Couldn't clear reserved name, please try again. If the problem persists, please contact @slasso on discord.");
    }
    cm.dispose();
}

function reserveName() {
    var reserved = cm.getClient().reserveName(cm.getText());
    if (reserved) {
        cm.sendOk("Your name has been saved and will be reserved for the wipe.\r\n#rNOTE: We will remove unclaimed reservations 2 days after the server wipe!#k")
    } else {
        cm.sendOk("Unable to reserve this name. Either it does not following the naming guidelines or someone has already claimed this name.")
    }
    cm.dispose();
}
*/
/*
 * @function AIO Style NPC
 * @npc Kin (9900000)
 * @note sendStyle can only take a 128 length array (signed byte)
 * @author Gijiko

Selections:
Skin = 0
Male Hair = 1
Male Hair (2) = 2
Male Hair (3) = 3
Female Hair = 4
Female Hair (2) = 5
Female Hair (3) = 6
Hair Color = 7
Male Face = 8
Male Face (2) = 10
Female Face = 9
Female Face (2) = 11
Specials = 12
Eye Color = 13
*/

var status = 0;
var selected;
var skin = [0, 1, 2, 3, 4, 5, 9, 10];

var maleHair = new Array(30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090, 30100, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30380, 30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690, 30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890, 30900, 30910, 30920, 30930, 30940, 30950, 32160, 33030, 33060, 33070, 33080, 33090, 33100, 33120, 33130, 33150, 33170, 33180, 33190, 33210, 33220, 33230, 33240, 33250, 33260, 33270, 33280, 33290, 33310, 33320, 33330, 33340, 33350, 33360, 33370, 33380, 33390, 33400, 33410, 33440); 
var maleHair2 = new Array(33450, 33460, 33470, 33480, 33500, 33510, 33520, 33530, 33540, 33550, 33620, 33630, 33640, 33650, 33660, 33670, 33680, 33690, 33700, 33710, 33720, 33730, 33740, 33750, 33760, 33780, 33790, 33800, 33810, 33820, 33830, 33930, 33940, 33950, 33960, 33980, 33990, 36000, 36010, 36040, 36050, 36100, 36140, 36160, 36170, 36180, 36190, 36210, 36220, 36230, 36260, 36270, 36330, 36340, 36350, 36380, 36390, 36400, 36430, 36440, 36360, 36290, 36280, 36300, 36310, 36370, 36450, 36490, 36500, 36510, 36520, 36530, 36540, 36550, 36560, 36580, 36590, 36620, 36640, 36650, 36670, 36680, 36700, 36710, 36720, 36730, 36740, 36750, 36760, 36780, 36790, 36800, 36810, 36820, 36830, 36860, 36870, 36880, 36940, 36950, 36990, 37150, 37160, 37170, 38370, 39000); 
var maleHair3 = new Array(34010, 34050, 34060, 34200, 34280, 34390, 34460, 35000, 35010, 35020, 35030, 35040, 35050, 35060, 35070, 35080, 35090, 35120, 35130, 35140, 35150, 35180, 35190, 35200, 35210, 35220, 35230, 35240, 35250, 35260, 35270, 35280, 35290, 35300, 35320, 35330, 35340, 35350, 35380, 35390, 35410, 35420, 35430, 35460, 35470, 35480, 35510, 35520, 35530, 35540, 35550, 35560, 35570, 35580, 35590, 35600, 35610, 35620, 35630, 35640, 35650, 35660, 35670, 35680, 35690, 35700, 35710, 35720, 35730, 35750, 35760, 35770, 35780, 35790, 35820, 35830, 35840, 35850, 35870, 35880, 35890, 35900, 35910, 35920, 35930, 35940, 35950, 35960, 36420, 36410, 36920, 37480, 38340, 38960, 38970, 38980, 38990, 39310, 39320, 39330, 39340, 39350, 39370, 39380, 39400, 39530, 39550, 39570, 39560, 39730, 39750, 39860);
var maleHair4 = new Array(37770, 37780, 37790, 36780, 36790, 36150, 33820, 34810, 33130, 34140, 34810, 34980, 36110, 36570, 37570, 36030, 34940, 34950, 38880, 38860, 36090, 33260, 36020, 36070, 33080, 34090, 36080, 34700, 34730, 33730, 33740, 37040, 37070, 33450, 34420,  36170, 36190, 33320, 34190, 34290, 34300, 33530, 34410, 36460, 37450, 37240, 37250, 37140, 37260, 37120, 37130, 36240, 36250, 35110, 35100, 38130, 37080, 37270, 36200, 37590, 37440, 36630, 37490, 36470, 36130, 36480, 37000, 37460, 38250, 38260, 35160, 35170, 39440, 37440, 36840, 36850, 37840, 35010, 37850, 37290, 37500, 39250, 39260, 35790, 35370, 33610, 34600, 34160);
var maleHair5 = new Array(32030, 32040, 32050, 32170, 32180, 32190, 32200, 32210, 32220, 32230, 32240, 32250, 32260, 32270, 32280, 32290, 32300, 32510, 32570, 32580, 32590, 32600, 32610, 32620, 32630, 32640, 32650, 32660, 32670, 32680, 32690, 33420, 33490, 34020, 34030, 34070, 34080, 34170, 34580, 34990, 35310, 38440, 35450, 36060, 36120, 36890, 37890, 36930, 37100, 37280, 37660, 37700, 37930, 37960, 36980, 38140, 38850, 39100, 39110, 39120, 39130, 39140, 39150, 39160, 39170, 39270, 39280, 39290, 39300, 39460, 39470, 39500, 39880);

var femaleHair = new Array(31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31360, 31380, 31400, 31410, 31420, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31660, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31780, 31790, 31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31910, 31920, 31930, 31940, 31950, 31990, 34000, 34010, 34020, 34030, 34050, 34110, 32560, 34040, 34100, 34110, 34120, 34130, 34150, 34180, 34210, 34220, 34230, 34250, 34260, 34290, 34300, 34240, 34270, 34300, 34320, 34330, 34340, 34350, 34360, 34370, 34380, 34400, 34430, 34440, 34470, 34480);
var femaleHair2 = new Array(34510, 34540, 34560, 34590, 34610, 34620, 34630, 34640, 34650, 34670, 34680, 34690, 32690, 34700, 34710, 34720, 34750, 34760, 34780, 34790, 34800, 34830, 34840, 34850, 34860, 34870, 34880, 34890, 34900, 34910, 34970, 35800, 35860, 37020, 37030, 37040, 37050, 37060, 37090, 37110, 37180, 37190, 37200, 37210, 37220, 37230, 37310, 37320, 37330, 37340, 37350, 37370, 37380, 37410, 37420, 37430, 37470, 37510, 37520, 37540, 37550, 37560, 37580, 37610, 37630, 37640, 37650, 37670, 37680, 37710, 37720, 37730, 37740, 37750, 37760, 37770, 37780, 37790, 37800, 37810, 37820, 37830, 37860, 37880, 37900, 37910, 37940, 37950, 37960, 37980, 37990, 38000, 38010, 38020, 38040, 38050, 38060, 38070, 38080, 38090, 38100, 38110, 38120, 38150, 38160, 38170, 38180, 38190, 38200, 38210, 38220, 38230, 38240, 38260, 38270, 38300, 38320, 38330, 38350, 38360, 38380, 38390, 38400, 38410, 38420, 38430);
var femaleHair3 = new Array(38450, 38460, 38470, 38480, 38490, 38570, 38590, 38510, 38500, 37870, 39450, 39470, 39480, 39490, 39500, 35500, 38520, 38530, 38540, 38560, 38580, 38600, 38610, 38620, 38630, 38640, 38650, 38660, 38670, 38680, 38690, 38700, 38710, 38720, 38730, 38740, 38760, 39770, 38780, 38790, 38800, 38810, 38820, 38830, 38890, 38900, 38910, 38930, 38940, 39010, 39040, 39050, 39060, 39070, 39080, 39090, 39190, 39200, 39210, 39220, 39240, 39410, 39420, 39430, 39590, 39600, 39610, 39620, 39630, 39640, 39650, 39670, 39680, 39690, 39700, 39710, 39720, 39740, 39760, 39770, 39780, 39790, 39870);
var femaleHair4 = new Array(34450, 33430, 35400, 35440, 36320, 36660, 36690, 36770, 37400, 37690, 36900, 37920, 38310, 38840, 38920, 38950, 39180, 39230, 39510, 39580);
var femaleHair5 = new Array(35740, 39800, 39810, 39820, 36910, 39830, 39840, 39850, 32430, 32440, 32450, 32460, 32470, 32480, 32490, 32500);

var maleFace = new Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029, 20030, 20031, 20032, 20033, 20035, 20036, 20037, 20038, 20040, 20043, 20044, 20045, 20046, 20047, 20048, 20049, 20050, 20051, 20052, 20053, 20055, 20056, 20057, 20058, 20059, 20060, 20061, 20062, 20063, 20064, 20065, 20066, 20067, 20068, 20069, 20070, 20071, 20072, 20073, 20074, 20075, 20076, 20077, 20078, 20079, 20080, 20081, 20082, 20083, 20084, 20085, 20086, 20087, 20088, 20089, 20090, 20091, 20092, 20093, 20094, 20095, 20096, 20097, 20098, 20099);
var maleFace2 = new Array(23000, 23001, 23002, 23005, 23006, 23007, 23008, 23009, 23010, 23011, 23012, 23013, 23014, 23015, 23016, 23017, 23018, 23019, 23020, 23021, 23022, 23023, 23024, 23025, 23026, 23027, 23028, 23029, 23030, 23031, 23032, 23033, 23034, 23035, 23036, 23037, 23038, 23039, 23040, 23041, 23042, 23043, 23044, 23045, 23046, 23047, 23048, 23051, 23052, 23053, 23054, 23055, 23056, 23057, 23059, 23060, 23061, 23062, 23063, 23064, 23065, 23066, 23067, 23068, 23069, 23070, 23071, 23072, 23073, 23074, 23075, 23076, 23079, 23080, 23081, 23082, 23084, 23085, 23086, 23087, 23088, 23089, 23090, 23091, 23092, 23093, 23094, 23095, 23096, 23097, 23099);

var femaleFace = new Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21023, 21024, 21025, 21026, 21027, 21028, 21029, 21030, 21031, 21033, 21034, 21035, 21036, 21038, 21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049, 21050, 21052, 21053, 21054, 21055, 21056, 21057, 21058, 21059, 21060, 21061, 21062, 21063, 21064, 21065, 21068, 21069, 21070, 21071, 21072, 21073, 21074, 21075, 21076, 21077, 21078, 21079, 21080, 21081, 21082, 21083, 21084, 21085, 21086, 21087, 21088, 21089, 21090, 21091, 21092, 21093, 21094, 21095, 21096, 21097, 21098);
var femaleFace2 = new Array(24001, 24002, 24003, 24004, 24005, 24006, 24007, 24008, 24009, 24010, 24011, 24012, 24013, 24014, 24015, 24016, 24017, 24018, 24019, 24020, 24021, 24022, 24023, 24024, 24025, 24026, 24027, 24028, 24029, 24030, 24031, 24032, 24033, 24034, 24035, 24036, 24037, 24038, 24039, 24040, 24041, 24042, 24043, 24044, 24045, 24048, 24049, 24050, 24051, 24052, 24053, 24054, 24055, 24057, 24058, 24059, 24060, 24061, 24062, 24063, 24064, 24065, 24066, 24067, 24068, 24069, 24070, 24071, 24072, 24073, 24074, 24075, 24076, 24077, 24078, 24079, 24080, 24082, 24083, 24084, 24085, 24086, 24087, 24089, 24090, 24091, 24092, 24093, 24094, 24095, 24097, 24099);

var specialFace = new Array(25001, 25003, 25004, 25006, 25007, 25009, 25010, 25011, 25012, 25013, 26000, 26001, 26005, 26006, 26007, 26009, 26010, 26011, 26012, 26013, 26014, 20900, 20871, 21900, 22000, 22200, 22300, 22400, 22500, 22600, 22700, 22800, 28843, 28844, 23058, 28002, 28842);

var hairnew; // These are used so their selection is remembered for use in status 2
var haircolor;
var facenew;
var eyecolors;

function start() {
    cm.sendSimple("\t\t\t\t\t\t\t#eStyle Catalog#n\r\n\t\t\t\t\t\t\#e****WARNING****#n\r\n\t\t\#eMAY CRASH CLIENT ON WRONG COMBOS#n\r\n\t\t\t\t\t\t\t#L0#Skin#l\r\n\t\t\t\t\t\t\t#L11#Hair Color#l\r\n\t\t\t\t\t\t\t#L17#Eye Color#l\r\n\r\n#L1#Male Hair 1#l\t\t\t\t\t\t\t\t#L6#Female Hair 1#l\r\n#L2#Male Hair 2#l\t\t\t\t\t\t\t\t#L7#Female Hair 2#l\r\n#L3#Male Hair 3#l\t\t\t\t\t\t\t\t#L8#Female Hair 3#l\r\n\#L4#Male Hair 4#l\t\t\t\t\t\t\t\t#L9#Female Hair 4#l\r\n\#L5#Male Hair 5#l\t\t\t\t\t\t\t\t#L10#Female Hair 5#l\r\n\r\n\#L12#Male Face  #l\t\t\t\t\t\t\t\t#L13#Female Face#l\r\n\#L14#Male Face 2   #l\t\t\t\t\t\t\t#L15#Female Face 2#l\r\n\r\n\t\t\t\t\t\t\t#L16#Special Faces#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        cm.dispose();
        return;
    }
    if (status == 1) {
        selected = selection;
        if (selection == 0)
            cm.sendStyle("Choose a style!\r\nThere are " + skin.length + " styles to choose from.", skin);
        else if (selection >= 1 && selection <= 10) {
			if (selection == 1 || selection == 6)
				hairnew = selection == 1 ? maleHair : femaleHair;
			else if (selection == 2 || selection == 7)
				hairnew = selection == 2 ? maleHair2 : femaleHair2;
			else if (selection == 3 || selection == 8)
				hairnew = selection == 3 ? maleHair3 : femaleHair3;
			else if (selection == 4 || selection == 9)
				hairnew = selection == 4 ? maleHair4 : femaleHair4;
			else if (selection == 5 || selection == 10)
				hairnew = selection == 5 ? maleHair5 : femaleHair5;
            cm.sendStyle("Choose a style!\r\nThere are " + hairnew.length + " styles to choose from.", hairnew);
        } else if (selection == 11) {
			var setHairToBlack = setBlack(cm.getPlayer().getHair(), true);
			haircolor = range(setHairToBlack, setHairToBlack + 7, 1);
            cm.sendStyle("Which color?", haircolor);
			
        } else if (selection == 12 || selection == 13) {
			facenew = selection == 12 ? maleFace : femaleFace;
            cm.sendStyle("Choose a style!\r\nThere are " + facenew.length + " styles to choose from.", facenew);
		} else if (selection == 14 || selection == 15) {
			facenew = selection == 14 ? maleFace2 : femaleFace2;
            cm.sendStyle("Choose a style!\r\nThere are " + facenew.length + " styles to choose from.", facenew);
		} else if (selection == 16) {
			facenew = specialFace;
            cm.sendStyle("Choose a style!\r\nThere are " + facenew.length + " styles to choose from.", facenew);
        } else if (selection == 17) {
			var setEyeToBlack = setBlack(cm.getPlayer().getFace(), false);
			eyecolors = range(setEyeToBlack, setEyeToBlack + 800, 100);
            cm.sendStyle("Which color?", eyecolors);
		}
    } else if (status == 2) {
        if (selected == 0)
            cm.setSkin(skin[selection]);
        else if (selected >= 1 && selected <= 10)
            cm.setHair(hairnew[selection]);
        else if (selected == 11)
            cm.setHair(haircolor[selection]);
        else if (selected >= 12 && selected <= 16)
            cm.setFace(facenew[selection]);
        else if (selected == 17)
            cm.setFace(eyecolors[selection]);
        cm.dispose();
    }
}

function range(start, stop, increment) { // Apparently JavaScript does not come with this
	var arr = new Array();
	for (var i = start; i <= stop; i += increment)
		arr.push(i);
	return arr;
}

function setBlack(id, hair) {
	if (hair) {
		return id - (id % 10);
	} else { // eye
		return id - (Math.floor((id / 100) % 10) * 100);
	}
}