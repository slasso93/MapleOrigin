package net.server.services;

import net.server.Server;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.http.api.*;
import tools.DatabaseConnection;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;

public class HttpHandler extends IoHandlerAdapter {

    public void messageReceived(IoSession session, Object message) {
        try {
            if (message instanceof HttpEndOfContent)
                return;

            HttpRequest req = (HttpRequest) message;
            String path = req.getRequestPath();

            if (req.getMethod() != HttpMethod.POST || !path.equals("/api/pingback")) {
                errorResponse(session);
                return;
            }

            Map<String, List<String>> params = req.getParameters();
            String voterIP = URLDecoder.decode(params.get("VoterIP").get(0), StandardCharsets.UTF_8.name());
            String account = params.get("pingUsername").get(0);
            String reason = params.get("Reason").get(0);
            boolean success = params.get("Successful").get(0).equals("0");
            if (success) {
                int nxGain = -1;
                int vpGain = -1;
                int siteId = -1;
                long time = System.currentTimeMillis() / 1000;

                try (Connection c = DatabaseConnection.getConnection()) {
                    try (PreparedStatement ps = c.prepareStatement("SELECT * FROM bit_vote WHERE name like '%GTOP%'")) {
                        try (ResultSet rs = ps.executeQuery()) {
                            if (rs.next()) {
                                siteId = rs.getInt("id");
                                nxGain = rs.getInt("gnx");
                                vpGain = rs.getInt("gvp");
                            }
                        }
                    }
                    try (PreparedStatement ps = c.prepareStatement(
                            "INSERT INTO bit_votingrecords (siteid, ip, account, date, times) " +
                                    "SELECT ?, ?, a.name, ?, 1 FROM accounts a where a.id=? " +
                                    " on duplicate key update ip=VALUES(ip), date=VALUES(date), times=VALUES(times)")) {
                        ps.setInt(1, siteId);
                        ps.setString(2, voterIP);
                        ps.setLong(3, time);
                        ps.setInt(4, Integer.parseInt(account));
                        ps.executeUpdate();
                    }
                }
                if (vpGain > -1 && nxGain > -1)
                    Server.getInstance().updateAccountNX(Integer.parseInt(account), nxGain, vpGain);
            } else {
                // already voted
            }

            Map<String, String> headers = new HashMap<>();
            headers.put("Content-Length", "0");
            DefaultHttpResponse resp = new DefaultHttpResponse(HttpVersion.HTTP_1_1, HttpStatus.SUCCESS_OK, headers);
            session.write(resp);
            session.write(new HttpEndOfContent());
        } catch (Exception e) {
            errorResponse(session);
        }
    }

    private void errorResponse(IoSession session) {
        if (session != null) {
            Map<String, String> headers = new HashMap<>();
            headers.put("Content-Length", "0");
            DefaultHttpResponse resp = new DefaultHttpResponse(HttpVersion.HTTP_1_1, HttpStatus.CLIENT_ERROR_BAD_REQUEST, headers);
            session.write(resp);
            session.write(new HttpEndOfContent());
        }
    }

}
