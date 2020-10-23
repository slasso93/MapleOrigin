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

import client.*;
import client.autoban.AutobanFactory;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.inventory.MapleWeaponType;
import client.status.MonsterStatusEffect;
import constants.skills.Outlaw;
import java.util.ArrayList;
import java.util.List;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.life.ElementalEffectiveness;
import server.life.MapleMonster;
import server.life.MapleMonsterInformationProvider;
import server.maps.MapleSummon;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public final class SummonDamageHandler extends AbstractDealDamageHandler {
    
    public final class SummonAttackEntry {

        private int monsterOid;
        private int damage;
        
        public SummonAttackEntry(int monsterOid, int damage) {
            this.monsterOid = monsterOid;
            this.damage = damage;
        }

        public int getMonsterOid() {
            return monsterOid;
        }

        public int getDamage() {
            return damage;
        }
        
    }

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int oid = slea.readInt();
        MapleCharacter player = c.getPlayer();
        if (!player.isAlive()) {
            return;
        }
        MapleSummon summon = null;
        for (MapleSummon sum : player.getSummonsValues()) {
            if (sum.getObjectId() == oid) {
                summon = sum;
            }
        }
        if (summon == null) {
            return;
        }
        Skill summonSkill = SkillFactory.getSkill(summon.getSkill());
        MapleStatEffect summonEffect = summonSkill.getEffect(summon.getSkillLevel());
        slea.skip(4);
        List<SummonAttackEntry> allDamage = new ArrayList<>();
        byte direction = slea.readByte();
        int numAttacked = slea.readByte();
        slea.skip(8); //Thanks Gerald :D, I failed lol (mob x,y and summon x,y)
        for (int x = 0; x < numAttacked; x++) {
            int monsterOid = slea.readInt(); // attacked oid
            slea.skip(18);
            int damage = slea.readInt();
            allDamage.add(new SummonAttackEntry(monsterOid, damage));
        }
        player.getMap().broadcastMessage(player, MaplePacketCreator.summonAttack(player.getId(), summon.getObjectId(), direction, allDamage), summon.getPosition());
        
        if (player.getMap().isOwnershipRestricted(player)) {
            return;
        }
        
        boolean magic = summonEffect.getWatk() == 0;
        double maxDmg = calcMaxDamage(summonEffect, player, magic);    // thanks Darter (YungMoozi) for reporting unchecked max dmg
        for (SummonAttackEntry attackEntry : allDamage) {
            double damage = attackEntry.getDamage();
            MapleMonster target = player.getMap().getMonsterByOid(attackEntry.getMonsterOid());
            if (target != null) {
                if (target.getElementalEffectiveness(summonSkill.getElement()) == ElementalEffectiveness.WEAK) {
                    maxDmg *= 1.5;
                } else if (target.getElementalEffectiveness(summonSkill.getElement()) == ElementalEffectiveness.STRONG) {
                    maxDmg *= .5;
                }

                if (damage > maxDmg) {
                    //AutobanFactory.DAMAGE_HACK.alert(c.getPlayer(), "Possible packet editing summon damage exploit.");

                    FilePrinter.printError(FilePrinter.EXPLOITS + c.getPlayer().getName() + ".txt", c.getPlayer().getName() + " used a summon of skillid " + summon.getSkill() + " to attack " + MapleMonsterInformationProvider.getInstance().getMobNameFromId(target.getId()) + " with damage " + damage + " (max: " + maxDmg + ")");
                    damage = maxDmg;
                }
                
                if (damage > 0 && summonEffect.getMonsterStati().size() > 0) {
                    if (summonEffect.makeChanceResult()) {
                        target.applyStatus(player, new MonsterStatusEffect(summonEffect.getMonsterStati(), summonSkill, null, false), summonEffect.isPoison(), 4000);
                    }
                }
                player.getMap().damageMonster(player, target, (int) damage);
            }
        }
        
        if (summon.getSkill() == Outlaw.GAVIOTA) {  // thanks Periwinks for noticing Gaviota not cancelling after grenade toss
            player.cancelEffect(summonEffect, false, -1);
        }
    }
    
    private static double calcMaxDamage(MapleStatEffect summonEffect, MapleCharacter player, boolean magic) {
        double maxDamage;
        
        if (magic) {
            double tma = player.getTotalMagic();
            double intStat = player.getTotalInt();
            maxDamage = (((tma * tma / 1000.0) + tma) / 30.0 + intStat / 200.0) * summonEffect.getMatk();
        } else {
            int mainstat = player.getTotalStr();
            int secondarystat = player.getTotalDex();
            if (player.getJob().isA(MapleJob.THIEF) || player.getJob().isA(MapleJob.NIGHTWALKER1)) {
                mainstat = player.getTotalLuk();
                secondarystat = player.getTotalDex();
            } else if (player.getJob().isA(MapleJob.PIRATE) || player.getJob().isA(MapleJob.THUNDERBREAKER1) ||
                    player.getJob().isA(MapleJob.BOWMAN) || player.getJob().isA(MapleJob.WINDARCHER1)) {
                mainstat = player.getTotalDex();
                secondarystat = player.getTotalStr();
            }
            
            maxDamage = (mainstat * 2.5 + secondarystat) * summonEffect.getWatk() / 100.0;
        }
        
        return maxDamage;
    }
}
