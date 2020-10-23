/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package client.inventory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.Lock;
import net.server.audit.locks.MonitoredLockType;
import net.server.audit.locks.factory.MonitoredReentrantLockFactory;
import tools.DatabaseConnection;
import tools.FilePrinter;
import tools.Pair;

/**
 *
 * @author Flav
 */
public enum ItemFactory {

    INVENTORY(1, false),
    STORAGE(2, true),
    CASH_EXPLORER(3, true),
    CASH_CYGNUS(4, true),
    CASH_ARAN(5, true),
    MERCHANT(6, false),
    CASH_OVERALL(7, true),
    MARRIAGE_GIFTS(8, false),
    DUEY(9, false);
    private final int value;
    private final boolean account;
    
    private static final int lockCount = 400;
    private static final Lock locks[] = new Lock[lockCount];  // thanks Masterrulax for pointing out a bottleneck issue here
    
    static {
        for (int i = 0; i < lockCount; i++) {
            locks[i] = MonitoredReentrantLockFactory.createLock(MonitoredLockType.ITEM, true);
        }
    }
    
    private ItemFactory(int value, boolean account) {
        this.value = value;
        this.account = account;
    }

    public int getValue() {
        return value;
    }

    public List<Pair<Item, MapleInventoryType>> loadItems(int id, boolean login) throws SQLException {
        if(value != 6) return loadItemsCommon(id, login);
        else return loadItemsMerchant(id, login);
    }
    
    public void saveItems(List<Pair<Item, MapleInventoryType>> items, int id, Connection con) throws SQLException {
        saveItemsCommon(items, null, id, con);
    }
    
    public void saveMerchantItems(List<Pair<Item, MapleInventoryType>> items, List<Short> bundlesList, int id, Connection con) throws SQLException {
        // thanks Arufonsu, MedicOP, BHB for pointing a "synchronized" bottleneck here
        
        saveItemsCommon(items, bundlesList, id, con);
    }

    public void deleteItemByInventoryItemId(int inventoryItemId) throws SQLException {
        // dont think lock is needed here. This is only used by hired merchant to when moving item from merchant inventory
        int deleted = -1;
        try (Connection con = DatabaseConnection.getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("DELETE FROM inventoryitems WHERE inventoryitemid=?")) { // this will cascade to equipment and merchant
                ps.setInt(1, inventoryItemId);
                deleted = ps.executeUpdate();
            }
        } finally {
            if (deleted != 1)
                FilePrinter.print(FilePrinter.DEADLOCK_LOCKS, String.format("inventoryitemid: %d was not removed from " +
                        "inventorymerchant. rows affected %d", inventoryItemId, deleted));
        }
    }

    private static Equip loadEquipFromResultSet(ResultSet rs) throws SQLException {
        Equip equip = new Equip(rs.getInt("inventoryitemid"), rs.getInt("itemid"), (short) rs.getInt("position"), 0);
        equip.setOwner(rs.getString("owner"));
        equip.setQuantity((short) rs.getInt("quantity"));
        equip.setAcc((short) rs.getInt("acc"));
        equip.setAvoid((short) rs.getInt("avoid"));
        equip.setDex((short) rs.getInt("dex"));
        equip.setHands((short) rs.getInt("hands"));
        equip.setHp((short) rs.getInt("hp"));
        equip.setInt((short) rs.getInt("int"));
        equip.setJump((short) rs.getInt("jump"));
        equip.setVicious((short) rs.getInt("vicious"));
        equip.setFlag((short) rs.getInt("flag"));
        equip.setLuk((short) rs.getInt("luk"));
        equip.setMatk((short) rs.getInt("matk"));
        equip.setMdef((short) rs.getInt("mdef"));
        equip.setMp((short) rs.getInt("mp"));
        equip.setSpeed((short) rs.getInt("speed"));
        equip.setStr((short) rs.getInt("str"));
        equip.setWatk((short) rs.getInt("watk"));
        equip.setWdef((short) rs.getInt("wdef"));
        equip.setUpgradeSlots((byte) rs.getInt("upgradeslots"));
        equip.setLevel((byte) rs.getByte("level"));
        equip.setItemExp(rs.getInt("itemexp"));
        equip.setItemLevel(rs.getByte("itemlevel"));
        equip.setExpiration(rs.getLong("expiration"));
        equip.setGiftFrom(rs.getString("giftFrom"));
        equip.setRingId(rs.getInt("ringid"));

        equip.setLvlStr((short) rs.getInt("lvl_str"));
        equip.setLvlDex((short) rs.getInt("lvl_dex"));
        equip.setLvlInt((short) rs.getInt("lvl_int"));
        equip.setLvlLuk((short) rs.getInt("lvl_luk"));
        equip.setLvlHp((short) rs.getInt("lvl_hp"));
        equip.setLvlMp((short) rs.getInt("lvl_mp"));
        equip.setLvlWatk((short) rs.getInt("lvl_watk"));
        equip.setLvlMatk((short) rs.getInt("lvl_matk"));
        equip.setLvlWdef((short) rs.getInt("lvl_wdef"));
        equip.setLvlMdef((short) rs.getInt("lvl_mdef"));
        equip.setLvlAcc((short) rs.getInt("lvl_acc"));
        equip.setLvlAvoid((short) rs.getInt("lvl_avoid"));
        equip.setLvlSpeed((short) rs.getInt("lvl_speed"));
        equip.setLvlJump((short) rs.getInt("lvl_jump"));

        equip.setScrollStr((short) rs.getInt("scroll_str"));
        equip.setScrollDex((short) rs.getInt("scroll_dex"));
        equip.setScrollInt((short) rs.getInt("scroll_int"));
        equip.setScrollLuk((short) rs.getInt("scroll_luk"));
        equip.setScrollHp((short) rs.getInt("scroll_hp"));
        equip.setScrollMp((short) rs.getInt("scroll_mp"));
        equip.setScrollWatk((short) rs.getInt("scroll_watk"));
        equip.setScrollMatk((short) rs.getInt("scroll_matk"));
        equip.setScrollWdef((short) rs.getInt("scroll_wdef"));
        equip.setScrollMdef((short) rs.getInt("scroll_mdef"));
        equip.setScrollAcc((short) rs.getInt("scroll_acc"));
        equip.setScrollAvoid((short) rs.getInt("scroll_avoid"));
        equip.setScrollSpeed((short) rs.getInt("scroll_speed"));
        equip.setScrollJump((short) rs.getInt("scroll_jump"));

        return equip;
    }
    
    public static List<Pair<Item, Integer>> loadEquippedItems(int id, boolean isAccount, boolean login) throws SQLException {
        List<Pair<Item, Integer>> items = new ArrayList<>();
        
        StringBuilder query = new StringBuilder();
        query.append("SELECT * FROM ");
        query.append("(SELECT id, accountid FROM characters) AS accountterm ");
        query.append("RIGHT JOIN ");
        query.append("(SELECT * FROM (`inventoryitems` LEFT JOIN `inventoryequipment` USING(`inventoryitemid`))) AS equipterm");
        query.append(" ON accountterm.id=equipterm.characterid ");
        query.append("WHERE accountterm.`");
        query.append(isAccount ? "accountid" : "characterid");
        query.append("` = ?");
        query.append(login ? " AND `inventorytype` = " + MapleInventoryType.EQUIPPED.getType() : "");
        
        try (Connection con = DatabaseConnection.getConnection()) {
            try (PreparedStatement ps = con.prepareStatement(query.toString())) {
                ps.setInt(1, id);
                
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        Integer cid = rs.getInt("characterid");
                        items.add(new Pair<Item, Integer>(loadEquipFromResultSet(rs), cid));
                    }
                }
            }
        }
        
        return items;
    }
    
    private List<Pair<Item, MapleInventoryType>> loadItemsCommon(int id, boolean login) throws SQLException {
        List<Pair<Item, MapleInventoryType>> items = new ArrayList<>();
		
        PreparedStatement ps = null;
        ResultSet rs = null;
        Connection con = DatabaseConnection.getConnection();
        try {
            StringBuilder query = new StringBuilder();
            query.append("SELECT * FROM `inventoryitems` LEFT JOIN `inventoryequipment` USING(`inventoryitemid`) WHERE `type` = ? AND `");
            query.append(account ? "accountid" : "characterid").append("` = ?");

            if (login) {
                query.append(" AND `inventorytype` = ").append(MapleInventoryType.EQUIPPED.getType());
            }

            ps = con.prepareStatement(query.toString());
            ps.setInt(1, value);
            ps.setInt(2, id);
            rs = ps.executeQuery();

            while (rs.next()) {
                MapleInventoryType mit = MapleInventoryType.getByType(rs.getByte("inventorytype"));

                if (mit.equals(MapleInventoryType.EQUIP) || mit.equals(MapleInventoryType.EQUIPPED)) {
                    items.add(new Pair<Item, MapleInventoryType>(loadEquipFromResultSet(rs), mit));
                } else {
                    int petid = rs.getInt("petid");
                    if (rs.wasNull()) {
                        petid = -1;
                    }
                    
                    Item item = new Item(rs.getInt("inventoryitemid"), rs.getInt("itemid"), (byte) rs.getInt("position"), (short) rs.getInt("quantity"), petid);
                    item.setOwner(rs.getString("owner"));
                    item.setExpiration(rs.getLong("expiration"));
                    item.setGiftFrom(rs.getString("giftFrom"));
                    item.setFlag((short) rs.getInt("flag"));
                    items.add(new Pair<>(item, mit));
                }
            }
            
            rs.close();
            ps.close();
            con.close();
        } finally {
            if (rs != null && !rs.isClosed()) {
                rs.close();
            }
            if (ps != null && !ps.isClosed()) {
                ps.close();
            }
            if (con != null && !con.isClosed()) {
                con.close();
            }
        }
        return items;
    }

    private void saveItemsCommon(List<Pair<Item, MapleInventoryType>> items, List<Short> bundles, int id, Connection con) throws SQLException {
        ResultSet newItemKeys = null;

        Lock lock = locks[id % lockCount];
        lock.lock();
        final String insertItemsQuery = "INSERT INTO inventoryitems VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        final String updateItemsQuery = "UPDATE inventoryitems SET type=?, characterid=?, accountid=?, itemid=?, " +
                "inventorytype=?, position=?, quantity=?, owner=?, petid=?, flag=?, expiration=?, giftFrom=? " +
                "WHERE inventoryitemid=?";
        final String replaceEquipsQuery = "INSERT INTO inventoryequipment VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                "ON DUPLICATE KEY UPDATE " +
                "upgradeslots=VALUES(upgradeslots), `level`=VALUES(`level`), str=VALUES(str), dex=VALUES(dex), " +
                "`int`=VALUES(`int`), luk=VALUES(luk), hp=VALUES(hp), mp=VALUES(mp), watk=VALUES(watk), matk=VALUES(matk), " +
                "wdef=VALUES(wdef), mdef=VALUES(mdef), acc=VALUES(acc), avoid=VALUES(avoid), hands=VALUES(hands), " +
                "speed=VALUES(speed), jump=VALUES(jump), vicious=VALUES(vicious), itemlevel=VALUES(itemlevel), " +
                "itemexp=VALUES(itemexp), ringid=VALUES(ringid), lvl_str=VALUES(lvl_str), lvl_dex=VALUES(lvl_dex), " +
                "lvl_int=VALUES(lvl_int), lvl_luk=VALUES(lvl_luk), lvl_hp=VALUES(lvl_hp), lvl_mp=VALUES(lvl_mp), " +
                "lvl_watk=VALUES(lvl_watk), lvl_matk=VALUES(lvl_matk), lvl_wdef=VALUES(lvl_wdef), " +
                "lvl_mdef=VALUES(lvl_mdef), lvl_acc=VALUES(lvl_acc), lvl_avoid=VALUES(lvl_avoid), " +
                "lvl_speed=VALUES(lvl_speed), lvl_jump=VALUES(lvl_jump), scroll_str=VALUES(scroll_str), " +
                "scroll_dex=VALUES(scroll_dex), scroll_int=VALUES(scroll_int), scroll_luk=VALUES(scroll_luk), " +
                "scroll_hp=VALUES(scroll_hp), scroll_mp=VALUES(scroll_mp), scroll_watk=VALUES(scroll_watk), " +
                "scroll_matk=VALUES(scroll_matk), scroll_wdef=VALUES(scroll_wdef), scroll_mdef=VALUES(scroll_mdef), " +
                "scroll_acc=VALUES(scroll_acc), scroll_avoid=VALUES(scroll_avoid), scroll_speed=VALUES(scroll_speed), " +
                "scroll_jump=VALUES(scroll_jump), locked=VALUES(locked)";
        final String insertMerchantQuery = "INSERT INTO inventorymerchant VALUES (NULL, ?, ?, ?) ON DUPLICATE KEY UPDATE bundles=VALUES(bundles)";
        try (PreparedStatement psNew = con.prepareStatement(insertItemsQuery, Statement.RETURN_GENERATED_KEYS);
             PreparedStatement psUpdate = con.prepareStatement(updateItemsQuery);
             PreparedStatement psEquip = con.prepareStatement(replaceEquipsQuery);
             PreparedStatement psMerch = con.prepareStatement(insertMerchantQuery)) {
            if (!items.isEmpty()) {
                List<Integer> inventoryItemIds = new ArrayList<>();
                List<Item> newItems = new ArrayList<>();
                List<Equip> equips = new ArrayList<>(); // keep equips and position in the inserts so we can advance generated keys later
                boolean hasNewItems = false;
                boolean hasUpdatedItems = false;

                for (Pair<Item, MapleInventoryType> pair : items) {
                    Item item = pair.getLeft();
                    MapleInventoryType mit = pair.getRight();
                    if (item.getInventoryItemId() < 1) { // inserts
                        hasNewItems = true;
                        newItems.add(item);

                        psNew.setInt(1, value);
                        psNew.setString(2, account ? null : String.valueOf(id));
                        psNew.setString(3, account ? String.valueOf(id) : null);
                        psNew.setInt(4, item.getItemId());
                        psNew.setInt(5, mit.getType());
                        psNew.setInt(6, item.getPosition());
                        psNew.setInt(7, item.getQuantity());
                        psNew.setString(8, item.getOwner());
                        psNew.setInt(9, item.getPetId());      // thanks Daddy Egg for alerting a case of unique petid constraint breach getting raised
                        psNew.setInt(10, item.getFlag());
                        psNew.setLong(11, item.getExpiration());
                        psNew.setString(12, item.getGiftFrom());
                        psNew.addBatch();
                    } else { // updates
                        hasUpdatedItems = true;
                        inventoryItemIds.add(item.getInventoryItemId());

                        psUpdate.setInt(1, value);
                        psUpdate.setString(2, account ? null : String.valueOf(id));
                        psUpdate.setString(3, account ? String.valueOf(id) : null);
                        psUpdate.setInt(4, item.getItemId());
                        psUpdate.setInt(5, mit.getType());
                        psUpdate.setInt(6, item.getPosition());
                        psUpdate.setInt(7, item.getQuantity());
                        psUpdate.setString(8, item.getOwner());
                        psUpdate.setInt(9, item.getPetId());
                        psUpdate.setInt(10, item.getFlag());
                        psUpdate.setLong(11, item.getExpiration());
                        psUpdate.setString(12, item.getGiftFrom());
                        psUpdate.setInt(13, item.getInventoryItemId());
                        psUpdate.addBatch();
                    }

                    if (mit.equals(MapleInventoryType.EQUIP) || mit.equals(MapleInventoryType.EQUIPPED)) {
                        equips.add((Equip) item);
                    }
                }

                // update existing inventory items
                if (hasUpdatedItems)
                    psUpdate.executeBatch();

                // delete items no longer in inventory
                if (value != 6) // don't delete merchant items here
                    deleteItems(id, con, inventoryItemIds, true); // inventoryItemIds at this point is the IDs already existing in the db

                // save new items
                if (hasNewItems) {
                    int newRetries = 0;
                    while (newRetries++ < 5) {
                        psNew.executeBatch();
                        newItemKeys = psNew.getGeneratedKeys();

                        int i = 0;
                        while (newItemKeys.next()) {
                            inventoryItemIds.add(newItemKeys.getInt(1)); // add all new item inventoryItemIds so we have every new item's id
                            newItems.get(i++).setInventoryItemId(newItemKeys.getInt(1)); // set inventoryItemIds in memory on all new items
                        }
                        if (i == newItems.size()) {
                            break;
                        } else if (newRetries == 5) {
                            throw new RuntimeException("Inserting some item failed. Expected " + newItems.size() + " new items, actual: " + i);
                        }
                    }
                }

                // save equipment
                if (!equips.isEmpty()) {
                    saveInventoryEquipment(psEquip, equips);
                }

                // merchant save
                if (value == 6 && !bundles.isEmpty()) {
                    int i = 0;
                    for (Integer inventoryItemId : inventoryItemIds) {
                        psMerch.setInt(1, inventoryItemId);
                        psMerch.setInt(2, id);
                        psMerch.setInt(3, bundles.get(i++));
                        psMerch.addBatch();
                    }
                    psMerch.executeBatch();
                }
            } else { // delete whole inventory
                deleteItems(id, con, null, false);
            }
        } finally {
            if (newItemKeys != null && !newItemKeys.isClosed()) {
                newItemKeys.close();
            }

            lock.unlock();
        }
    }

    /**
     *
     * @param id owner
     * @param con pass connection in case of ongoing transaction
     * @param inventoryItemIds ids to keep or delete
     * @param notIn flag to add NOT IN. true= NOT IN (), false= IN()
     * @throws SQLException
     */
    public void deleteItems(int id, Connection con, List<Integer> inventoryItemIds, boolean notIn) throws SQLException {
        int size = inventoryItemIds != null ? inventoryItemIds.size() : -1; // existing items size
        final String deleteItemsQuery = String.format("DELETE FROM inventoryitems WHERE type=? AND %s=? %s", account
                ? "accountid" : "characterid", size > 0 ? "AND inventoryitemid " + (notIn ? "NOT" : "") + " IN " + buildListPlaceholders(size) : "");

        try (PreparedStatement psDelete = con.prepareStatement(deleteItemsQuery)) {
            psDelete.setInt(1, value);
            psDelete.setInt(2, id);
            for (int i = 0; i < size; i++)
                psDelete.setInt(i + 3, inventoryItemIds.get(i));

            psDelete.execute();
        }
    }

    private String buildListPlaceholders(int size) {
        StringBuilder params = new StringBuilder("(");
        for (int i = 0 ; i < size; i++)
            params.append("?, ");
        params.setLength(params.length() - 2);
        params.append(")");
        return params.toString();
    }

    private List<Pair<Item, MapleInventoryType>> loadItemsMerchant(int id, boolean login) throws SQLException {
        List<Pair<Item, MapleInventoryType>> items = new ArrayList<>();
		
        PreparedStatement ps = null, ps2 = null;
        ResultSet rs = null, rs2 = null;
        Connection con = DatabaseConnection.getConnection();
        try {
            StringBuilder query = new StringBuilder();
            query.append("SELECT * FROM `inventoryitems` LEFT JOIN `inventoryequipment` USING(`inventoryitemid`) WHERE `type` = ? AND `");
            query.append(account ? "accountid" : "characterid").append("` = ?");

            if (login) {
                query.append(" AND `inventorytype` = ").append(MapleInventoryType.EQUIPPED.getType());
            }

            ps = con.prepareStatement(query.toString());
            ps.setInt(1, value);
            ps.setInt(2, id);
            rs = ps.executeQuery();

            while (rs.next()) {

                MapleInventoryType mit = MapleInventoryType.getByType(rs.getByte("inventorytype"));

                if (mit.equals(MapleInventoryType.EQUIP) || mit.equals(MapleInventoryType.EQUIPPED)) {
                    items.add(new Pair<Item, MapleInventoryType>(loadEquipFromResultSet(rs), mit));
                } else {
                    ps2 = con.prepareStatement("SELECT `bundles` FROM `inventorymerchant` WHERE `inventoryitemid` = ?");
                    ps2.setInt(1, rs.getInt("inventoryitemid"));
                    rs2 = ps2.executeQuery();

                    short bundles = 0;
                    if(rs2.next()) {
                        bundles = rs2.getShort("bundles");
                    }
                    if(bundles > 0) {
                        int petid = rs.getInt("petid");
                        if (rs.wasNull()) {
                            petid = -1;
                        }
                        
                        Item item = new Item(rs.getInt("inventoryitemid"), rs.getInt("itemid"), (byte) rs.getInt("position"), (short)(bundles * rs.getInt("quantity")), petid);
                        item.setOwner(rs.getString("owner"));
                        item.setExpiration(rs.getLong("expiration"));
                        item.setGiftFrom(rs.getString("giftFrom"));
                        item.setFlag((short) rs.getInt("flag"));
                        items.add(new Pair<>(item, mit));
                    }

                    rs2.close();
                    ps2.close();
                }
            }

            rs.close();
            ps.close();
            con.close();
        } finally {
            if (rs2 != null && !rs2.isClosed()) {
                rs2.close();
            }
            if (ps2 != null && !ps2.isClosed()) {
                ps2.close();
            }
            if (rs != null && !rs.isClosed()) {
                rs.close();
            }
            if (ps != null && !ps.isClosed()) {
                ps.close();
            }
            if (con != null && !con.isClosed()) {
                con.close();
            }
        }
        return items;
    }

    private void saveInventoryEquipment(PreparedStatement ps, List<Equip> equips) throws SQLException {
        for (Equip equip : equips) {

            ps.setInt(1, equip.getInventoryItemId());
            ps.setInt(2, equip.getUpgradeSlots());
            ps.setInt(3, equip.getLevel());
            ps.setInt(4, equip.getStr());
            ps.setInt(5, equip.getDex());
            ps.setInt(6, equip.getInt());
            ps.setInt(7, equip.getLuk());
            ps.setInt(8, equip.getHp());
            ps.setInt(9, equip.getMp());
            ps.setInt(10, equip.getWatk());
            ps.setInt(11, equip.getMatk());
            ps.setInt(12, equip.getWdef());
            ps.setInt(13, equip.getMdef());
            ps.setInt(14, equip.getAcc());
            ps.setInt(15, equip.getAvoid());
            ps.setInt(16, equip.getHands());
            ps.setInt(17, equip.getSpeed());
            ps.setInt(18, equip.getJump());
            ps.setInt(19, 0);
            ps.setInt(20, equip.getVicious());
            ps.setInt(21, equip.getItemLevel());
            ps.setInt(22, equip.getItemExp());
            ps.setInt(23, equip.getRingId());

            ps.setInt(24, equip.getLvlStr());
            ps.setInt(25, equip.getLvlDex());
            ps.setInt(26, equip.getLvlInt());
            ps.setInt(27, equip.getLvlLuk());
            ps.setInt(28, equip.getLvlHp());
            ps.setInt(29, equip.getLvlMp());
            ps.setInt(30, equip.getLvlWatk());
            ps.setInt(31, equip.getLvlMatk());
            ps.setInt(32, equip.getLvlWdef());
            ps.setInt(33, equip.getLvlMdef());
            ps.setInt(34, equip.getLvlAcc());
            ps.setInt(35, equip.getLvlAvoid());
            ps.setInt(36, equip.getLvlSpeed());
            ps.setInt(37, equip.getLvlJump());

            ps.setInt(38, equip.getScrollStr());
            ps.setInt(39, equip.getScrollDex());
            ps.setInt(40, equip.getScrollInt());
            ps.setInt(41, equip.getScrollLuk());
            ps.setInt(42, equip.getScrollHp());
            ps.setInt(43, equip.getScrollMp());
            ps.setInt(44, equip.getScrollWatk());
            ps.setInt(45, equip.getScrollMatk());
            ps.setInt(46, equip.getScrollWdef());
            ps.setInt(47, equip.getScrollMdef());
            ps.setInt(48, equip.getScrollAcc());
            ps.setInt(49, equip.getScrollAvoid());
            ps.setInt(50, equip.getScrollSpeed());
            ps.setInt(51, equip.getScrollJump());

            ps.addBatch();
            ps.executeBatch();
        }
    }

}
