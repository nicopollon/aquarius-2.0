#!/bin/bash

# Open Chromium browser to a specific URL
chromium-browser "http://localhost:3000" &

# Wait for the browser to open
sleep 5

# Use xdotool to simulate key presses (F11 for fullscreen)
xdotool key F11
