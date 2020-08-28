-- SQL script to wipe server except for GM characters
TRUNCATE activity_tracker;
TRUNCATE alliance;
TRUNCATE allianceguilds;
TRUNCATE area_info;
TRUNCATE bbs_replies;
TRUNCATE bbs_threads;
TRUNCATE bosslog;
TRUNCATE bosslog_daily;
TRUNCATE bosslog_weekly;
TRUNCATE buddies;
TRUNCATE dueyitems;
DELETE FROM dueypackages;
TRUNCATE cooldowns;
TRUNCATE eventstats;
TRUNCATE famelog;
TRUNCATE family_character;
TRUNCATE family_entitlement;
TRUNCATE fredstorage;
TRUNCATE gifts;
DELETE FROM guilds WHERE name != 'Origin';
TRUNCATE hwidaccounts;
-- TRUNCATE hwidbans;
DELETE i FROM inventoryitems i JOIN characters c ON c.id=i.characterid WHERE c.gm < 2; -- This cascades the delete to inventoryequipment and inventorymerchant tables
DELETE i FROM inventoryitems i JOIN accounts a ON a.id=i.accountid join characters c on a.id=c.accountid WHERE c.gm < 2;
DELETE FROM inventoryitems WHERE characterid is not null and characterid NOT IN (select id from characters); -- delete dangling items that are not tied to a char/account
DELETE FROM inventoryitems WHERE accountid is not null and accountid NOT IN (select id from accounts);
-- TRUNCATE ipbans;
DELETE k FROM keymap k JOIN characters c ON c.id=k.characterid WHERE c.gm < 2;
-- TRUNCATE macbans;
TRUNCATE macfilters;
TRUNCATE marriages;
TRUNCATE medalmaps;
TRUNCATE monsterbook;
TRUNCATE mts_cart;
TRUNCATE mts_items;
TRUNCATE namechanges;
TRUNCATE newyear;
TRUNCATE notes;
TRUNCATE nxcode;
TRUNCATE nxcode_items;
TRUNCATE petignores;
DELETE FROM pets;
TRUNCATE playerdiseases;
DELETE FROM playernpcs;
TRUNCATE playernpcs_equip;
TRUNCATE playernpcs_field;
TRUNCATE questactions;
TRUNCATE questprogress;
TRUNCATE queststatus;
DELETE q FROM quickslotkeymapped q JOIN accounts a ON a.id=q.accountid JOIN characters c ON c.accountid=a.id WHERE c.gm < 2;
TRUNCATE reports;
TRUNCATE responses;
TRUNCATE rings;
TRUNCATE savedlocations;
TRUNCATE server_queue;
DELETE s FROM skillmacros s JOIN characters c ON c.id=s.characterid WHERE c.gm < 2;
DELETE s FROM skills s JOIN characters c ON c.id=s.characterid WHERE c.gm < 2;
DELETE s FROM storages s JOIN accounts a ON a.id=s.accountid JOIN characters c ON c.accountid=a.id WHERE c.gm < 2;
TRUNCATE trocklocations;
TRUNCATE wishlists;
TRUNCATE worldtransfers;


-- Now we need to delete non GM characters, set some account info to default and some GM character cleanup
DELETE FROM characters WHERE gm <2;
UPDATE accounts a LEFT JOIN characters c ON c.accountid=a.id SET loggedin=0, nxCredit=0, maplePoint=0, nxPrepaid=0, characterslots=3, rewardpoints=0 WHERE c.accountid IS NULL;
UPDATE characters SET familyId=-1, partnerId=-1, marriageItemId=-1, playtime=0, createdtime=now();
DELETE FROM inventoryitems WHERE petid != -1; -- delete pets because we truncated them
DELETE FROM inventoryitems WHERE itemid in (1112806, 1112803, 1112807, 1112809); -- marriage rings


-- *OPTIONAL* Give some type of reward to players through an NPC script redeemable with accounts.rewardpoint

-- This query will update a player's rewardpoints on their account (based on hwid) with the highest VP and have voted at least 3 times
UPDATE accounts AS a
INNER JOIN 
(
	SELECT hwid, max(votepoints) AS vp 
    FROM accounts
    GROUP BY hwid
) v 
ON v.hwid = a.hwid AND v.vp = a.votepoints 
SET a.rewardpoints=1
WHERE a.pic != '' AND a.votepoints >= 3;

UPDATE accounts SET votepoints=0; -- and finally reset votepoints
