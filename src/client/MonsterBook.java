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
package client;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.Semaphore;

import config.YamlConfig;
import tools.DatabaseConnection;
import tools.MaplePacketCreator;
import net.server.audit.locks.MonitoredLockType;
import net.server.audit.locks.factory.MonitoredReentrantLockFactory;
import tools.Pair;

public final class MonsterBook {
    private static final Semaphore semaphore = new Semaphore(10);

    private int[] tierSizes = new int[]{0, 0, 0, 0, 0, 0, 0, 0, 0};
    private int[] completedCardsByTier = new int[]{0, 0, 0, 0, 0, 0, 0, 0, 0};

    private int specialCard = 0;
    private int normalCard = 0;
    private int bookLevel = 1;
    private Map<Integer, Integer> cards = new LinkedHashMap<>();
    private Lock lock = MonitoredReentrantLockFactory.createLock(MonitoredLockType.BOOK);

    public Set<Entry<Integer, Integer>> getCardSet() {
        lock.lock();
        try {
            return new HashSet<>(cards.entrySet());
        } finally {
            lock.unlock();
        }
    }
    
    public void addCard(final MapleClient c, final int cardid) {
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showForeignCardEffect(c.getPlayer().getId()), false);
        
        Integer qty;
        lock.lock();
        try {
            qty = cards.get(cardid);

            if (qty != null) { // existing card
                if (qty < 5) {
                    cards.put(cardid, qty + 1);
                }
            } else { // new card
                cards.put(cardid, 1);
                qty = 0;

                if (cardid / 1000 >= 2388) {
                    specialCard++;
                } else {
                    normalCard++;
                }
            }
        } finally {
            lock.unlock();
        }
        
        if (qty < 5) {
            if (qty == 0) {     // leveling system only accounts unique cards
                calculateLevel();
            }

            if (YamlConfig.config.server.USE_MONSTERBOOK_HP_SYSTEM) {
                if (qty == 4) { // (now we are level 5)
                    int tier = cardid / 1000 % 10;
                    int hpGain = (tier + 2) * 5; // the fourth digit gives you the tier number (0-8)

                    // completed set message
                    c.getPlayer().dropMessage(6, "T" + (tier + 1) + " monster card set completed! (" + (++completedCardsByTier[tier]) + "/" + tierSizes[tier] + ") +" + hpGain + "HP");

                    if (YamlConfig.config.server.USE_MONSTERBOOK_TIER_BONUS) {
                        if (completedCardsByTier[tier] == tierSizes[tier]) { // full tier completed
                            int tierBonus = (tier + 1) * 25; // 25, 50, 75, ... 225 = 1125 total for complete book
                            c.getPlayer().dropMessage(6, "Congratulations on completing all sets in T" + (tier + 1) + "! +" + tierBonus + "HP");
                            hpGain += tierBonus;
                        }
                    }

                    if (YamlConfig.config.server.USE_MONSTERBOOK_COMPLETE_BOOK_BONUS) {
                        if (Arrays.equals(completedCardsByTier, tierSizes)) { // full book completed
                            int completeBonus = YamlConfig.config.server.MONSTERBOOK_COMPLTE_BONUS;
                            c.getPlayer().dropMessage(6, "Way to go! You've completed the entire Monster Book! +" + completeBonus + "HP");
                            hpGain += completeBonus;
                        }
                    }

                    MapleCharacter player = c.getPlayer();
                    int maxHpBefore = player.getMaxHp();
                    player.setMaxHp(maxHpBefore + hpGain);

                    c.announce(MaplePacketCreator.updatePlayerStats(Collections.singletonList(new Pair<>(MapleStat.MAXHP, player.getMaxHp())), true, player));

                    player.updatePartyMemberHP();
                }
            }

            c.announce(MaplePacketCreator.addCard(false, cardid, qty + 1));
            c.announce(MaplePacketCreator.showGainCard());

        } else {
            c.announce(MaplePacketCreator.addCard(true, cardid, 5));
        }
    }

    private void calculateLevel() {
        lock.lock();
        try {
            int collectionExp = (normalCard + specialCard);
            
            int level = 0, expToNextlevel = 1;
            do {
                level++;
                expToNextlevel += level * 10;
            } while (collectionExp >= expToNextlevel);
            
            bookLevel = level;  // thanks IxianMace for noticing book level differing between book UI and character info UI
        } finally {
            lock.unlock();
        }
    }

    public int getBookLevel() {
        lock.lock();
        try {
            return bookLevel;
        } finally {
            lock.unlock();
        }
    }

    public Map<Integer, Integer> getCards() {
        lock.lock();
        try {
            return Collections.unmodifiableMap(cards);
        } finally {
            lock.unlock();
        }
    }

    public int getTotalCards() {
        lock.lock();
        try {
            return specialCard + normalCard;
        } finally {
            lock.unlock();
        }
    }

    public int getNormalCard() {
        lock.lock();
        try {
            return normalCard;
        } finally {
            lock.unlock();
        }
    }

    public int getSpecialCard() {
        lock.lock();
        try {
            return specialCard;
        } finally {
            lock.unlock();
        }
    }

    public void loadCards(final int charid) throws SQLException {
        lock.lock();
        try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT cardid, level FROM monsterbook WHERE charid = ? ORDER BY cardid ASC")) {
                ps.setInt(1, charid);
                try (ResultSet rs = ps.executeQuery()) {
                    int cardid, level;
                    while (rs.next()) {
                        cardid = rs.getInt("cardid");
                        level = rs.getInt("level");
                        tierSizes[cardid / 1000 % 10]++;
                        if (level == 5)
                            completedCardsByTier[cardid / 1000 % 10]++;
                        if (cardid / 1000 >= 2388) {
                            specialCard++;
                        } else {
                            normalCard++;
                        }
                        cards.put(cardid, level);
                    }
                }
            }

            con.close();

        } finally {
            lock.unlock();
        }
        
        calculateLevel();
    }

/*    private static int saveStringConcat(char[] data, int pos, Integer i) {
        return saveStringConcat(data, pos, i.toString());
    }
    
    private static int saveStringConcat(char[] data, int pos, String s) {
        int len = s.length();
        for(int j = 0; j < len; j++) {
            data[pos + j] = s.charAt(j);
        }
        
        return pos + len;
    }*/
    
    private static String getSaveString(Integer charid, Set<Entry<Integer, Integer>> cardSet) {
        semaphore.acquireUninterruptibly();
        try {
            StringBuilder sql = new StringBuilder("INSERT INTO monsterbook (charid, cardid, level) VALUES "); // 55 chars

            // assuming max of 500 unique cards, this insert statement is at most 14098 characters = 28196 bytes
            // 55 + 500 * (1 + 10 + 2 + 10 + 2 + 1 + 2) -1 + 44
            for (Entry<Integer, Integer> card : cardSet) {
                sql.append("(") // 1 char
                        .append(charid) // 10 chars
                        .append(", ") // 2 chars
                        .append(card.getKey()) // 10 chars
                        .append(", ") // 2 chars
                        .append(card.getValue()) // 1 char due to being 0 ~ 5
                        .append("),"); // 2 chars
            }
            sql.setLength(sql.length() - 1); // -1 char
            sql.append(" ON DUPLICATE KEY UPDATE level=VALUES(level)"); // 44 chars; if a record already exists, it will be updated with correct level.

            return sql.toString();
        } finally {
            semaphore.release();
        }
    }
    
    public void saveCards(final int charid) {
        Set<Entry<Integer, Integer>> cardSet = getCardSet();
        
        if (cardSet.isEmpty()) {
            return;
        }
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(getSaveString(charid, cardSet)); // save and update
            ps.execute();
            ps.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // not used but useful to know
    private void loadTierSizes() {
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT COUNT(*) FROM monstercarddata GROUP BY floor(cardid / 1000) ORDER BY floor(cardid / 1000)");) {

            ResultSet rs = ps.executeQuery();
            rs.last();
            tierSizes = new int[rs.getRow()];
            rs.beforeFirst();

            while (rs.next()) {
                tierSizes[rs.getRow() - 1] = rs.getInt(1);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
