/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
    Copyleft (L) 2016 - 2018 RonanLana

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
   @Author: Arthur L - Refactored command content into modules
*/
package client.command.commands.gm0;

import client.MapleCharacter;
import client.command.Command;
import client.MapleClient;
import provider.MapleData;
import provider.MapleDataTool;
import server.MapleItemInformationProvider;
import server.life.MapleMonsterInformationProvider;
import tools.DatabaseConnection;
import tools.Pair;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;

import static java.util.Collections.emptyList;
import static java.util.Optional.of;
import static java.util.stream.Collectors.toList;

public class WhoDropsCommand extends Command {
    {
        setDescription("Displays monsters that drop a specific item");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 1) {
            player.dropMessage(5, "Please do @whodrops <item name1, item name2, item name3>");
            return;
        }

        if (c.tryacquireClient()) {
            try {
                String searchString = player.getLastCommandMessage();
                String output = "";
                List<List<Pair<Integer, String>>> searchResults = new ArrayList<>();
                int k = 0;
                String[] terms = searchString.split(",");
                for (String search : terms) {
                    if (k++ == 1 || search.trim().length() < 4) {
                        player.dropMessage(5, "Multi search is currently disabled");
                        return;
                    }
                    List<Pair<Integer, String>> itemData = MapleItemInformationProvider.getInstance().getItemDataByName(search.trim());
                    if (terms.length > 1)
                        searchResults.add(itemData.subList(0, Math.min(itemData.size(), 3)));
                    else
                        searchResults.add(itemData);
                }
                if (searchResults.size() == 1) { // single item search
                    List<Pair<Integer, String>> searchList = searchResults.get(0);
                    if (searchList.size() == 0) {
                        player.dropMessage(5, "The item you searched for doesn't exist.");
                        return;
                    }
                    int limit = 0;
                    for (Pair<Integer, String> itemPair : searchList) {
                        if (limit++ < 15) {
                            String newItemStr = "";
                            int itemid = itemPair.getLeft();
                            MapleData itemData = MapleItemInformationProvider.getInstance().getItemData(itemid);
                            String displayName = itemPair.getRight();
                            if (itemData != null) {
                                int successRate = MapleDataTool.getIntConvert("info/success", itemData, -1);

                                if (successRate != -1 && !itemPair.getRight().toLowerCase().contains("book"))
                                    displayName = itemPair.getRight() + " (" + successRate + "%)";
                            }
                            newItemStr += "#b" + displayName + "#k is dropped by:\r\n";
                            try {
                                Connection con = DatabaseConnection.getConnection();
                                PreparedStatement ps = con.prepareStatement("SELECT dropperid FROM drop_data WHERE itemid = ? LIMIT 50");
                                ps.setInt(1, itemPair.getLeft());
                                ResultSet rs = ps.executeQuery();
                                while (rs.next()) {
                                    String resultName = MapleMonsterInformationProvider.getInstance().getMobNameFromId(rs.getInt("dropperid"));
                                    if (resultName != null) {
                                        newItemStr += resultName + ", ";
                                    }
                                }
                                if (newItemStr.lastIndexOf("\n") == newItemStr.length() - 1)
                                    newItemStr = "";
                                rs.close();
                                ps.close();
                                con.close();
                            } catch (Exception e) {
                                player.dropMessage(6, "There was a problem retrieving the required data. Please try again.");
                                e.printStackTrace();
                                return;
                            }
                            if (!newItemStr.isEmpty())
                                output += newItemStr + "\r\n\r\n";
                        }
                    }
                } else { // ex: @whodrops black crystal, diamond
                    List<List<Pair<Integer, String>>> combos = product(searchResults); // all combos ex: [[(id, name1), (id, name2)], [(id, name3)]]

                    for (List<Pair<Integer, String>> row : combos) { // [(id, name1),(id, name2)]
                        String newItemStr = "";
                        for (Pair<Integer, String> data : row) {
                            int itemid = data.getLeft();
                            MapleData itemData = MapleItemInformationProvider.getInstance().getItemData(itemid);
                            String displayName = data.getRight();
                            if (itemData != null) {
                                int successRate = MapleDataTool.getIntConvert("info/success", itemData, -1);

                                if (successRate != -1 && !data.getRight().toLowerCase().contains("book"))
                                    displayName = data.getRight() + " (" + successRate + "%)";
                            }
                            newItemStr += "#b" + displayName + "#k, ";
                        }
                        newItemStr = newItemStr.substring(0, newItemStr.length() - 2) + " is dropped by:\r\n";
                        try (Connection con = DatabaseConnection.getConnection()) {
                            String searchQuery = "SELECT dropperid FROM drop_data WHERE itemid IN " +
                                    buildListPlaceholders(row.size()) + " GROUP BY dropperid HAVING COUNT(dropperid) = " + row.size() + " LIMIT 50";
                            try (PreparedStatement ps = con.prepareStatement(searchQuery)) {
                                for (int i = 0; i < row.size(); i++)
                                    ps.setInt(i + 1, row.get(i).getLeft());
                                try (ResultSet rs = ps.executeQuery()) {
                                    while (rs.next()) {
                                        String resultName = MapleMonsterInformationProvider.getInstance().getMobNameFromId(rs.getInt("dropperid"));
                                        if (resultName != null) {
                                            newItemStr += resultName + ", ";
                                        }
                                    }
                                    if (newItemStr.lastIndexOf("\n") == newItemStr.length() - 1)
                                        newItemStr = "";
                                }
                            }
                        } catch (Exception e) {
                            player.dropMessage(6, "There was a problem retrieving the required data. Please try again.");
                            e.printStackTrace();
                            return;
                        }
                        if (!newItemStr.isEmpty())
                            output += newItemStr + "\r\n\r\n";
                    }
                }
                c.getAbstractPlayerInteraction().npcTalk(9010000, output.isEmpty() ? "No drop returned. Please be more specific with your search." : output);
            } finally {
                c.releaseClient();
            }
        } else {
            player.dropMessage(5, "Please wait a while for your request to be processed.");
        }
    }

    private List<List<Pair<Integer, String>>> product(List<List<Pair<Integer, String>>> a) {
        if (a.size() >= 2) {
            List<List<Pair<Integer, String>>> product = a.get(0).stream()
                    .map(Arrays::asList)
                    .collect(toList());
            for (int i = 1; i < a.size(); i++) {
                product = product(product, a.get(i));
            }
            return product;
        }

        return emptyList();
    }

    private List<List<Pair<Integer, String>>> product(List<List<Pair<Integer, String>>> a, List<Pair<Integer, String>> b) {
        return of(a.stream()
                .map(e1 -> of(b.stream()
                        .map(e2 -> {
                            List<Pair<Integer, String>> test = new ArrayList<>(e1);
                            test.add(e2);
                            return test;
                        })
                        .collect(toList()))
                        .orElse(emptyList()))
                .flatMap(List::stream)
                .collect(toList())).orElse(emptyList());
    }

    private String buildListPlaceholders(int size) {
        StringBuilder params = new StringBuilder("(");
        for (int i = 0; i < size; i++)
            params.append("?, ");
        params.setLength(params.length() - 2);
        params.append(")");
        return params.toString();
    }

}
