const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUFvRzlTM2E1djhMY0hQV1V3U1Axdy9GYnhMbXQ0eHZ4Tnptd2RxaENrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFF0Q0M1cENrTDZCSW53MHg5SEtRTnMzVGZDbEdPRnB0NkpyYlhaVUdEWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0UHVsRUFKc3VUVkhyeVJKOTZNRzBoTm9mR0VSVExxcFRBNlE0SFRFc2trPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQVU80SDc5eVVZaEF2R1hJeGFlMFdGWVVwK3hQazNPOFRoTWhib2h3RFZBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlJQ0tqQU8yT3c5N3cvZ0ZDZzdlaDVhbmNFVGl6NDJmVktMOStGUGpnVWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJpOFdzb0UxYUc3U1lxWmlwM1lVQVozK25yaXh1OENzaUgrQUZnN0FGRjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0hobXF4enNKUW01b1FwM1FvQ3VUcWJJUUdTQjhkZ2dTVlVrbGFFNkcxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSC93bWtpT0RvSlhVQ3hyM1NtUTBEUjdCV2QxaEpmUWxpYmlQKy9MWU9pYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVIL01ReTdMQUY5TTIvUTFpS0tiY1NXQ2ZsOElRR1BUamI3dngwRUc1bk82Y3RiWlFIc1BkVWJ5UVluUjNUTjhwYmtPOEpJUWNVc0xrTTdvTGdRWGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIwLCJhZHZTZWNyZXRLZXkiOiJzdnRUOE9mQmJhOWZYWEJKaEZoQzRHQ0kwWmFIai95UjlCRTRRVGFKQTM0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJFTTVKQkI0NSIsIm1lIjp7ImlkIjoiMjM0NzAxNTA2MjQzNzo1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdlKrwnZSm8J2UqvCdlLIg8J2UoPCdlKzwnZSp8J2UoSIsImxpZCI6IjE1Mzc4NjE4NjIxOTYyMzo1QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFhvMTRzREVLWEV1OEFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWTNySmNueE9SMFZWMW5ZUENjelkrTk5wN1VNVmhXVWNKTk1MMWR1WkZ3az0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQVcwV1NQVGxRdXpxbDZyems3MXg3eHFIaTdzNjM3ejhpamVCQXpjaXluY0tXb1F5U3d1SUkvcDhSSy9MVzhEUjE1aG1VZmptR3lvc0xYM0VBTXE2REE9PSIsImRldmljZVNpZ25hdHVyZSI6IlhtZHJlVUF2OCtHY2tmOHpGQ3h0NDlEcGVBd1pzYldQN0NaT2RTK1VIUWcvdUxUcnk4NDlPNVRFd0ppd3R5bHN6RXhtbk5nTU9vK0NlYnhxSEtxOGpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzAxNTA2MjQzNzo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldONnlYSjhUa2RGVmRaMkR3bk0yUGpUYWUxREZZVmxIQ1RUQzlYYm1SY0oifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTgwNTg3NCwibGFzdFByb3BIYXNoIjoibm0zQmIifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
