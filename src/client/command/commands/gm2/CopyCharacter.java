package client.command.commands.gm2;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.Skill;
import client.command.Command;
import client.inventory.*;
import client.inventory.manipulator.MapleInventoryManipulator;
import config.YamlConfig;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class CopyCharacter extends Command {
    {
        setDescription("Copy a player's stats, equipment, and inventory");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        if (client.tryacquireClient()) {
            MapleCharacter user = client.getPlayer(); // The player who used the command
            MapleCharacter target; // the player to copy from
            if (params.length != 1) {
                user.yellowMessage("Syntax: !copy <playername>");
                return;
            }

            target = client.getWorldServer().getPlayerStorage().getCharacterByName(params[0]);
            if (target == null) {
                user.yellowMessage(String.format("Player '%s' could not be found", params[0]));
                return;
            }

            user.setTempChar(true); // you won't save anymore until you relog!

            levelUpCharacter(user, target.getLevel());
            user.changeJob(MapleJob.getById(target.getJobId()));

            copyMesos(target.getMeso(), user);
            copyStats(target, user);
            copySkills(target, user);
            copyInventory(target, user);

            user.equipChanged(); // broadcast our changes

            user.message(String.format("Player '%s' copied. Re-log when you are finished to revert these changes", params[0]));
            if (target.getGender() != user.getGender()) {
                user.message("Warning: player is not the same gender, some equipped items may be unusable until you change genders and cc!");
            }
        }

    }

    private void copyMesos(int targetMesos, MapleCharacter to) {
        to.gainMeso(targetMesos - to.getMeso());
    }

    private void copyStats(MapleCharacter from, MapleCharacter to) {
        to.updateStrDexIntLuk(from.getStr(), from.getDex(), from.getInt(), from.getLuk(), -1);
    }

    private void copySkills(MapleCharacter from, MapleCharacter to) {
        to.resetSP(); // set all our skills to 0 first
        for (Map.Entry<Skill, MapleCharacter.SkillEntry> skillMapEntry : from.getSkills().entrySet()) {
            Skill skill = skillMapEntry.getKey();
            MapleCharacter.SkillEntry skillEntry = skillMapEntry.getValue();
            to.changeSkillLevel(skill, skillEntry.skillevel, skillEntry.skillevel, from.getSkillExpiration(skill));
        }
    }

    private void copyInventory(MapleCharacter from, MapleCharacter to) {
        MapleClient c = to.getClient();


        // clear all our items first to make room for the copy
        clearInv(c, to.getInventory(MapleInventoryType.EQUIPPED));
        clearInv(c, to.getInventory(MapleInventoryType.EQUIP));
        clearInv(c, to.getInventory(MapleInventoryType.USE));
        clearInv(c, to.getInventory(MapleInventoryType.SETUP));
        clearInv(c, to.getInventory(MapleInventoryType.ETC));
        clearInv(c, to.getInventory(MapleInventoryType.CASH));

        List<MapleInventory> invs = Arrays.asList(
                from.getInventory(MapleInventoryType.EQUIPPED),
                from.getInventory(MapleInventoryType.EQUIP),
                from.getInventory(MapleInventoryType.USE),
                from.getInventory(MapleInventoryType.SETUP),
                from.getInventory(MapleInventoryType.ETC),
                from.getInventory(MapleInventoryType.CASH)
        );
        gainSlots(to, invs.stream().mapToInt(MapleInventory::getSlotLimit).max().orElse(0)); // if needed we expand our inventory

        // get the player's item that we are going to copy
        for (MapleInventory inv : invs)
            copyMapleInventory(c, inv);

    }

    private void clearInv(MapleClient c, MapleInventory inv) {
        if (inv.getType() == MapleInventoryType.EQUIPPED) { // equipped items range from -1 to roughly -150
            for (int i = -1; i > -200; i--) {
                Item tempItem = inv.getItem((byte) i);
                if (tempItem != null)
                    MapleInventoryManipulator.removeFromSlot(c, inv.getType(), (byte) i, tempItem.getQuantity(), false, false);
            }
        } else {
            for (int i = 0; i < 101; i++) { // assuming 100 is the max inventory space?
                Item tempItem = inv.getItem((byte) i);
                if (tempItem != null)
                    MapleInventoryManipulator.removeFromSlot(c, inv.getType(), (byte) i, tempItem.getQuantity(), false, false);
            }
        }
    }

    private void copyMapleInventory(MapleClient c, MapleInventory inv) {
        if (inv.getType() == MapleInventoryType.EQUIPPED) { // equipped items range from -1 to roughly -150
            for (int i = -1; i > -200; i--) {
                Item tempItem = inv.getItem((byte) i);
                if (tempItem != null) {
                    copyEquip(c, tempItem);
                }
            }
        } else {
            for (int i = 0; i < 101; i++) {
                Item item = inv.getItem((byte) i);
                if (item != null) {
                    if (item.getItemId() >= 5000000 && item.getItemId() <= 5000500) {
                        int petId = MaplePet.createPet(item.getItemId());
                        if (petId == -1) {
                            continue;
                        }
                        MapleInventoryManipulator.addById(c, item.getItemId(), item.getQuantity(), null, petId, System.currentTimeMillis() + 1000 * 60 * 60 * 24);
                    } else { // for some reason some items show up as zero quantity
                        MapleInventoryManipulator.addById(c, item.getItemId(), item.getQuantity() == 0 ? 1 : item.getQuantity());
                    }
                }
            }
        }
    }

    private void gainSlots(MapleCharacter player, int slots) {
        for (int i = 1; i < 5; i++) {
            int curSlots = player.getSlots(i);
            if (slots <= -curSlots) {
                continue;
            }

            player.gainSlots(i, slots - curSlots, true);
        }
    }

    private void copyEquip(MapleClient c, Item item) {
        c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).addItemFromDB(item);
        c.announce(MaplePacketCreator.modifyInventory(false, Collections.singletonList(new ModifyInventory(0, item))));
    }

    private void levelUpCharacter(MapleCharacter player, int level) {
        player.loseExp(player.getExp(), false, false);
        player.setLevel(Math.min(level, player.getMaxClassLevel()) - 1);

        player.resetPlayerRates();
        if (YamlConfig.config.server.USE_ADD_RATES_BY_LEVEL) player.setPlayerRates();
        player.setWorldRates();

        player.levelUp(false);
    }

}
