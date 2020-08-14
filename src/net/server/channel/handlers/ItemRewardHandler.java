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
package net.server.channel.handlers;

import client.MapleClient;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import constants.inventory.ItemConstants;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import net.AbstractMaplePacketHandler;
import net.server.Server;
import client.inventory.manipulator.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleItemInformationProvider.RewardItem;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.Randomizer;
import tools.data.input.SeekableLittleEndianAccessor;

/**
 * @author Jay Estrella
 * @author kevintjuh93
 * @author slasso
 */
public final class ItemRewardHandler extends AbstractMaplePacketHandler {
    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt(); // will load from xml I don't care.

        Item it = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);   // null check here thanks to Thora
        if (it == null || it.getItemId() != itemId || c.getPlayer().getInventory(MapleInventoryType.USE).countById(itemId) < 1)
            return;

        if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull() ||
                c.getPlayer().getInventory(MapleInventoryType.ETC).isFull() ||
                c.getPlayer().getInventory(MapleInventoryType.USE).isFull()) {

            c.announce(MaplePacketCreator.getShowInventoryFull());
            return;
        }

        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Pair<List<Integer>, Map<Integer, RewardItem>> rewards = ii.getItemReward(itemId);
        int picked = Randomizer.nextInt(rewards.getLeft().size());
        RewardItem reward = rewards.getRight().get(rewards.getLeft().get(picked));
        if (ItemConstants.getInventoryType(reward.itemid) == MapleInventoryType.EQUIP) {
            final Item item = ii.getEquipById(reward.itemid);
            if (reward.period != -1) {
                item.setExpiration(currentServerTime() + (reward.period * 60 * 60 * 10));
            }
            MapleInventoryManipulator.addFromDrop(c, item, false);
        } else {
            MapleInventoryManipulator.addById(c, reward.itemid, reward.quantity, "", -1);
        }
        MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemId, 1, false, false);
        if (reward.worldmsg != null) {
            String msg = reward.worldmsg;
            msg = msg.replaceAll("/name", c.getPlayer().getName());

            String itemName = ii.getName(reward.itemid);
            if ("aeiou".contains(itemName.toLowerCase().charAt(0)+""))
                msg = msg.replaceAll("a /item", "an " + itemName);
            else
                msg = msg.replaceAll("/item", itemName);
            Server.getInstance().broadcastMessage(c.getWorld(), MaplePacketCreator.serverNotice(6, msg));
        }
        c.announce(MaplePacketCreator.enableActions());
    }
}
