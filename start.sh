#!/bin/bash
# Startup script for Maj Mob website development server
# Uses Ruby's built-in WEBrick since Node/Python are not installed

PORT=8000

echo "=================================================="
echo " Starting Maj Mob Website Local Dev Server"
echo "=================================================="
echo "Server will run at: http://localhost:$PORT"
echo "Press Ctrl+C to stop the server."
echo "=================================================="

# Open the site in the default browser after a short delay
(sleep 1 && open "http://localhost:$PORT") &

# Start the Ruby WEBrick server
ruby -r webrick -e "s = WEBrick::HTTPServer.new(:Port => $PORT, :DocumentRoot => Dir.pwd); trap('INT') { s.shutdown }; s.start"
