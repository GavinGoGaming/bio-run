#!/bin/bash
# The express app is in ./client, and Minecraft server in ./server. Run both of em
# concurrently with this script.
cd client
npm ci
npm start &
cd ../server
java -Xmx512M -Xms512M -jar server.jar nogui