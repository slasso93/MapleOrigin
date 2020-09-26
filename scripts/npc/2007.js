function start() {
    status = -1;
    showLeagueMessage = null;
    activeLeague = null;
    isLeader = null;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (showLeagueMessage == null) {
        showLeagueMessage = cm.getPlayer().isNewcomer();
         if (showLeagueMessage)
             activeLeague = cm.getActiveLeague();
         showLeagueMessage = activeLeague != null;
    }
    if (!showLeagueMessage && !cm.hasLevel30Character) { // just exit with no popup if they aren't eligible to see either popup
        cm.dispose();
        return;
    }
    if (mode == -1) { // clicked end
	    if (showLeagueMessage) { // clicked end on league message
            status = -1;
            mode = 1;
            showLeagueMessage = false;
        } else {
            cm.sendNext("Enjoy your trip");
            cm.dispose();
        }
    }
    if (status == 0 && mode == 0) { // clicked no
        if (showLeagueMessage) {
            status = -1;
            mode = 1;
            showLeagueMessage = false;
        } else {
            cm.sendNext("Enjoy your trip");
            cm.dispose();
        }
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        if (showLeagueMessage)
            cm.sendYesNo("Welcome to MapleOrigin! We are currently hosting a partner leveling league event where you could receive unique prizes. The event will run from #b#eOctober 9th through November 30th#n#k. Would you like to hear more about it?")
        else
            cm.sendYesNo("Would you like to skip the tutorials and head straight to Lith Harbor?");
    } else if (status == 1) {
        if (showLeagueMessage)
            cm.sendNext("MapleOrigin's first league event!\r\n\r\nYou and a partner of your choice will join " +
                "together to reach leveling milestones in order to win exclusive, valuable prizes! For the full rules, " +
                "milestones and prizes, please head to MapleOrigin's website or visit our discord.");
        else {
            cm.warp(104000000, 0);
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendNext("Players will team up as duos for the league event. League characters cannot " +
            "party outside of their duo and cannot trade/drop trade with non league " +
            "characters (and vice versa). However, characters can fm merchant, trade/drop trade within the league." +
            "Storage and cash shop storage are inaccessible. For expeditions only, your duo may team up with up to two other duos in separate parties.");
    } else if (status == 3) {
        cm.sendNext("When you and a partner both reach a certain level, you may both receive special prizes. " +
            "A detailed description of prizes, as well as rules, is available on MapleOrigin's discord!");
    } else if (status == 4) {
        cm.sendYesNo("Remember, the event will run from #b#eOctober 9th through November 30th#n#k!\r\n#e#rNote: " +
            "You will not be able to enter the league if you select No or end this chat.\r\n\r\n#n#kWould you like to enter this character into the league?");
    } else if (status == 5) {
        cm.sendSimple("#b#e#h ##n#k! Welcome to MapleOrigin's first league event!\r\nHow would you like to join?\r\n" +
            "#L1##eCreate a new group#l\r\n" +
            "#L2#Enter with your partner's group name.#l"
        );
    } else if (status == 6) {
        if (selection == 1) { // create group
            isLeader = true;
            cm.sendGetText("Enter your desired group name, between 5 and 20 spaces and alphanumeric characters.")
        } else if (selection == 2) { // join group
            isLeader = false;
            cm.sendGetText("Enter the name of your partner's group name.")
        }
    } else if (status == 7) { // valid group name
       var validName = cm.getText() && validate(cm.getText());
       if (!validName) {
            var str = "Only alphabet, numbers, and spaces are allowed. Group name must be between 5-10 characters.";
            status = 6;
            cm.sendGetText(isLeader ? str + " Please enter your desired group name." : str + " Please enter your partner's group name.");
       } else {
            if (isLeader) {
                if (cm.createLeagueGroup(activeLeague, cm.getText())) {
                    cm.sendOk("Your group has been created! #e#b@groupinfo#n#k for group information. Please give your partner your group name #e#b\"" + cm.getText() + "\"#n#k so they can join you!")
                    cm.dispose();
                } else {
                    status = 6;
                    cm.sendGetText("That group name is already taken! Please try a different name.");
                }
            } else {
                if (cm.getPlayer().joinGroup(activeLeague, cm.getText())) {
                    cm.sendOk("You have successfully joined \"" + cm.getText() + "\"! #e#b@groupinfo#n#k for group information. We hope you enjoy your league experience!")
                    cm.dispose();
                } else {
                    status = 4;
                    cm.sendNext("Unable to join group! Either the group doesn't exist or it is full.");
                }
            }
       }
    }
}

function validate(str) {
    var myRegEx = /^[a-zA-Z\d ]{5,20}$/;
    return myRegEx.test(str);
}
