USE `heavenms`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bit_bcomments`
--

DROP TABLE IF EXISTS `bit_bcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_bcomments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `author` varchar(16) NOT NULL,
  `feedback` int(11) NOT NULL,
  `date` varchar(32) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_bcomments`
--

LOCK TABLES `bit_bcomments` WRITE;
/*!40000 ALTER TABLE `bit_bcomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_bcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_buynx`
--

DROP TABLE IF EXISTS `bit_buynx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_buynx` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meso` int(11) NOT NULL,
  `nx` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_buynx`
--

LOCK TABLES `bit_buynx` WRITE;
/*!40000 ALTER TABLE `bit_buynx` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_buynx` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_ecomments`
--

DROP TABLE IF EXISTS `bit_ecomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_ecomments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eid` int(11) NOT NULL,
  `author` varchar(16) NOT NULL,
  `feedback` int(11) NOT NULL,
  `date` varchar(32) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_ecomments`
--

LOCK TABLES `bit_ecomments` WRITE;
/*!40000 ALTER TABLE `bit_ecomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_ecomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_events`
--

DROP TABLE IF EXISTS `bit_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `author` varchar(16) NOT NULL,
  `date` varchar(32) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` varchar(32) NOT NULL,
  `content` text NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `locked` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_events`
--

LOCK TABLES `bit_events` WRITE;
/*!40000 ALTER TABLE `bit_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_gdcache`
--

DROP TABLE IF EXISTS `bit_gdcache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_gdcache` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hash` varchar(32) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_gdcache`
--

LOCK TABLES `bit_gdcache` WRITE;
/*!40000 ALTER TABLE `bit_gdcache` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_gdcache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_gmblog`
--

DROP TABLE IF EXISTS `bit_gmblog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_gmblog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `author` varchar(16) NOT NULL,
  `date` varchar(32) NOT NULL,
  `content` text NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `locked` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_gmblog`
--

LOCK TABLES `bit_gmblog` WRITE;
/*!40000 ALTER TABLE `bit_gmblog` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_gmblog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_mail`
--

DROP TABLE IF EXISTS `bit_mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_mail` (
  `mailid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `to` varchar(50) NOT NULL,
  `from` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '-1',
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `ipaddress` varchar(15) NOT NULL DEFAULT '127.0.0.1',
  `timestamp` varchar(40) NOT NULL DEFAULT '-',
  `dateadded` varchar(30) DEFAULT 'NULL DATE',
  PRIMARY KEY (`mailid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_mail`
--

LOCK TABLES `bit_mail` WRITE;
/*!40000 ALTER TABLE `bit_mail` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_ncomments`
--

DROP TABLE IF EXISTS `bit_ncomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_ncomments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nid` int(11) NOT NULL,
  `author` varchar(16) NOT NULL,
  `feedback` int(11) NOT NULL,
  `date` varchar(32) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_ncomments`
--

LOCK TABLES `bit_ncomments` WRITE;
/*!40000 ALTER TABLE `bit_ncomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_ncomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_news`
--

DROP TABLE IF EXISTS `bit_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `author` varchar(16) NOT NULL,
  `date` varchar(32) NOT NULL,
  `type` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `locked` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_news`
--

LOCK TABLES `bit_news` WRITE;
/*!40000 ALTER TABLE `bit_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_pages`
--

DROP TABLE IF EXISTS `bit_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `author` text NOT NULL,
  `content` text NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_pages`
--

LOCK TABLES `bit_pages` WRITE;
/*!40000 ALTER TABLE `bit_pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_profile`
--

DROP TABLE IF EXISTS `bit_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountid` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `mainchar` int(11) DEFAULT NULL,
  `realname` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `motto` varchar(255) DEFAULT NULL,
  `favjob` varchar(255) DEFAULT NULL,
  `text` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accountid_UNIQUE` (`accountid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_profile`
--

LOCK TABLES `bit_profile` WRITE;
/*!40000 ALTER TABLE `bit_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_properties`
--

DROP TABLE IF EXISTS `bit_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_properties` (
  `name` text,
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `client` text,
  `server` text,
  `version` int(11) NOT NULL DEFAULT '0',
  `forumurl` text,
  `siteurl` text,
  `exprate` text,
  `mesorate` text,
  `droprate` text,
  `banner` text,
  `background` text,
  `bgcolor` varchar(6) DEFAULT NULL,
  `bgrepeat` varchar(20) DEFAULT NULL,
  `bgcenter` tinyint(1) DEFAULT NULL,
  `bgfixed` tinyint(1) DEFAULT NULL,
  `bgcover` tinyint(1) DEFAULT NULL,
  `flood` tinyint(4) NOT NULL DEFAULT '1',
  `floodint` int(11) DEFAULT NULL,
  `pcap` text,
  `gmlevel` int(11) NOT NULL DEFAULT '1',
  `theme` text NOT NULL,
  `nav` text NOT NULL,
  `colnx` text NOT NULL,
  `colvp` text NOT NULL,
  `homecontent` text,
  `jailmaps` text,
  `githubapi` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_properties`
--

LOCK TABLES `bit_properties` WRITE;
/*!40000 ALTER TABLE `bit_properties` DISABLE KEYS */;
INSERT INTO `bit_properties` VALUES ('MapleOrigin',0,'https://drive.google.com/open?id=1FRryJyM_fSCOWeGpECLhq78YhJ_KIHN7','https://drive.google.com/open?id=1NZ60EOQhUgtRvSewAX7PhQJxWe_RN0IH',83,'/forum','/','Level 1-10: <b style=\"color: #8cc63f\">1x</b><br>Level 10-150: <b style=\"color: #8cc63f\">6x</b><br>Level 150-200: <b style=\"color: #8cc63f\">4x</b><br>Level 200-220: <b style=\"color: #8cc63f\">3x</b><br>Level 220-240: <b style=\"color: #8cc63f\">2x</b><br>Level 240-250: <b style=\"color: #8cc63f\">1x</b>','2x','2x','https://cdn.discordapp.com/attachments/467416775911407616/664635187572899843/banner-01.png','https://cdn.discordapp.com/attachments/467416775911407616/664669782842540069/REE-01.png','FFFFFF','no-repeat',0,0,1,1,5,'250',3,'exonic','0','nxCredit','votepoints','<p><img alt=\"\" src=\"https://cdn.discordapp.com/attachments/658924947892338688/744410657738194985/boobs.gif\" style=\"height:67px; width:532px\" /></p>\n\n<p>&nbsp;</p>\n\n<p>Welcome to MapleOrigin!</p>\n<!--StartFragment--><!--EndFragment-->\n\n<hr />\n<p><strong>Features:</strong></p>\n\n<ul>\n	<li>Level 250 Cap</li>\n	<li>Dynamic EXP:\n	<ul>\n		<li>Level 1-10: 1x</li>\n		<li>Level 10-150: 6x</li>\n		<li>Level 150-200: 4x</li>\n		<li>Level 200-220: 3x</li>\n		<li>Level 220-240: 2x</li>\n		<li>Level 240-250: 1x</li>\n	</ul>\n	</li>\n	<li>Quest level caps removed &amp; High amount of working quests (Ulu City, Ninja Castle, Neo City, etc)</li>\n	<li>Magic Cap removed from client</li>\n	<li>Movement Speed cap removed from client</li>\n	<li>HP/MP cap increased to 32k</li>\n	<li>DPS checker (@checkdps)</li>\n	<li>Item Leveling system</li>\n	<li>Custom Innocence Scrolls to reset item levels</li>\n	<li>Vicious Hammer Enhancement System (Blackhole Marble Exchange)</li>\n	<li>HPQ/EPQ/KPQ/CPQ/LPQ/LMPQ/CPQ2/GPQ/CWKPQ/MVPQ/BossPQ Fully Functional - Increased exp rewards!&nbsp;</li>\n	<li>PQs have no level cap</li>\n	<li>PQs award Perfect Pitch used for our Perfect Pitch shop (awards such as Giant Bullet, Onyx Apples and Immortal Pharoah&#39;s Belt!)</li>\n	<li>Custom rankings! (Quests, monsterbook, chairs, plus more to come such as bossing and PQs)</li>\n	<li>Buffed Spawns:\n	<ul>\n		<li>Deep Ludi</li>\n		<li>MP3</li>\n		<li>CWK</li>\n		<li>Drakes</li>\n		<li>Aqua</li>\n		<li>Ariant + Magatia</li>\n		<li>Neo City</li>\n		<li>And many more!</li>\n	</ul>\n	</li>\n	<li>Current Cosmetic items, Hairs and Eyes! [Shati, Mazra, and Big Headward]</li>\n	<li>Von Leon Expedition and Von Leon equipment</li>\n	<li>Buffed Party Exp [Party Play on all maps in the game]</li>\n	<li>Semi anti-leech with our Party EXP system that encourages group play</li>\n	<li>Indepth rework of most classes &amp; new skill skins!</li>\n	<li>Buffed Elemental Damage on Elemental, VIP, VL, and Timeless weapons (non holy)\n	<ul>\n		<li>Doomsday Staff reworked and has a Holy buff</li>\n	</ul>\n	</li>\n	<li>Type @commands in chat for list of available player commands!&nbsp;</li>\n	<li>Home Hub Map - @tele select &quot;Lost Memories&quot;</li>\n	<li>Ring Effects - Crush/Wedding/ABR/DABR/WABR</li>\n	<li>NX Wing effects working</li>\n	<li>Dojo : Now rewards Dojo gloves!</li>\n	<li>Golden Maple Leaf Exchange for VIP weapons, Vega&#39;s Spell</li>\n	<li>GM Nicc&nbsp;Crafting System [Henesys or Lost Memories ]</li>\n	<li>Custom votepoint NPC</li>\n	<li>No Secondary Stat requirements on Equipment Items</li>\n	<li>No Pay-to-Win</li>\n	<li>Donor NPC with name change and cosmetics/new pets</li>\n	<li>MapleOrigin Launcher w/ built-in patcher</li>\n	<li>NX Gachapon - Talk to Mia in Henesys or Lost Memories then&nbsp;exchange nx gachapon tickets in Lost Memories with Rupi or Snowman&nbsp;</li>\n	<li>Mule free boss expeditions&nbsp;</li>\n	<li>HP gained per level is 1.5x</li>\n	<li>HP Washing disabled</li>\n	<li>Monster card HP gain system - Collect 5 of each monsters card to gain HP up to 11,340 HP</li>\n	<li>NX Rings:&nbsp;+1 all stat&nbsp;</li>\n	<li>Items stack&nbsp;up to 1000</li>\n	<li>Maker Skill buffed</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<hr />\n<p><strong>Zones:</strong></p>\n\n<ul>\n	<li>Lion Heart Castle</li>\n	<li>Ninja Castle + Castellan Toad</li>\n	<li>Ulu City + Krexel</li>\n	<li>Omega Sector Level 120+ Full Revamp + New Drops</li>\n	<li>Lachelein Tower</li>\n	<li>Knights Stronghold [Coming Soon]</li>\n	<li>Corrupted Temple [Just Released!]</li>\n	<li>Forest of Golem (Sleepywood) EXP Revamped</li>\n	<li>Pirates (Herb Town) EXP Revamped</li>\n	<li>Himes (Zipangu) EXP Revamped</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<hr />\n<p><img alt=\"\" src=\"https://media.discordapp.net/attachments/668692029428989986/674116979917062154/unknown.png\" style=\"height:295px; width:520px\" /></p>\n',NULL,1577960726,2);
/*!40000 ALTER TABLE `bit_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_tcomments`
--

DROP TABLE IF EXISTS `bit_tcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_tcomments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ticketid` int(10) unsigned NOT NULL,
  `user` varchar(30) NOT NULL,
  `content` longtext NOT NULL,
  `date_com` varchar(100) NOT NULL,
  PRIMARY KEY (`id`,`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_tcomments`
--

LOCK TABLES `bit_tcomments` WRITE;
/*!40000 ALTER TABLE `bit_tcomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_tcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_tickets`
--

DROP TABLE IF EXISTS `bit_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_tickets` (
  `ticketid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `support_type` varchar(20) NOT NULL,
  `details` longtext NOT NULL,
  `date` varchar(100) NOT NULL,
  `ip` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`ticketid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_tickets`
--

LOCK TABLES `bit_tickets` WRITE;
/*!40000 ALTER TABLE `bit_tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_vote`
--

DROP TABLE IF EXISTS `bit_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `link` text NOT NULL,
  `gnx` int(10) unsigned NOT NULL DEFAULT '10',
  `gvp` int(10) unsigned NOT NULL DEFAULT '1',
  `waittime` int(10) unsigned NOT NULL DEFAULT '21600',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_vote`
--

LOCK TABLES `bit_vote` WRITE;
/*!40000 ALTER TABLE `bit_vote` DISABLE KEYS */;
INSERT INTO `bit_vote` VALUES (1,'GTOP100','https://gtop100.com/topsites/MapleStory/sitedetails/MapleOrigin-94164?vote=1',5000,1,86400);
/*!40000 ALTER TABLE `bit_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bit_votingrecords`
--

DROP TABLE IF EXISTS `bit_votingrecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bit_votingrecords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(45) NOT NULL DEFAULT '0',
  `siteid` int(11) DEFAULT NULL,
  `account` varchar(13) NOT NULL DEFAULT '0',
  `date` int(11) NOT NULL DEFAULT '0',
  `times` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `vote_idx` (`siteid`,`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bit_votingrecords`
--

LOCK TABLES `bit_votingrecords` WRITE;
/*!40000 ALTER TABLE `bit_votingrecords` DISABLE KEYS */;
/*!40000 ALTER TABLE `bit_votingrecords` ENABLE KEYS */;
UNLOCK TABLES;
