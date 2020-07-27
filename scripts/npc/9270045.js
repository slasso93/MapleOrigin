
/* Commando Jim [2]
 *
 * @Author Stereo
 * Singapore : Ruins of Krexel II (541020800)
 * Krexel expedition NPC

 * Helps players leave the map
 */
 importPackage(Packages.server.expeditions);

function start() {
    if(cm.getMapId() == 541020800) {
        if (!cm.getEventInstance().isEventCleared())
            cm.sendYesNo("If you leave now, you'll have to start over. Are you sure you want to leave?");
        else
            cm.sendYesNo("You guys finally overthrew Krexel, what a superb feat! Congratulations! Are you sure you want to leave now?");
    } else {
        cm.sendYesNo("If you leave now, you'll have to start over. Are you sure you want to leave?");
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else if (!cm.getEventInstance().isEventCleared()) {
        cm.warp(541020700, "boss00");
        cm.dispose();
    } else {
        if (cm.reachedRewardLimit(MapleExpeditionType.KREXEL)) {
            cm.warp(541020700, "boss00");
            cm.dispose();
        } else if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).isFull(1)) {
            cm.warp(541020700, "boss00");
            cm.gainItem(4000313, 1);
            cm.dispose();
        } else {
            cm.sendOk("Please make space in your inventory");
            cm.dispose();
        }
    }
}
