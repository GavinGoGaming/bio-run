#!/bin/bash
# The express app is in ./client, and Minecraft server in ./server. Run both of em
# concurrently with this script.
cd client
npm ci
npm start &
cd ../server
# Start both bukkit 1.8.8 and bungeecord 1.8.8
java -jar spigot-1.8.8.jar -Xms512M -Xmx512M &
java -jar BungeeCord.jar &