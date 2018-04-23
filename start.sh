#!/bin/bash
sudo gnome-terminal -e 'bash -c "cd ~/Android/Sdk/emulator && gnome-terminal -x ./emulator -avd Nexus_5X_API_25"';
cd App && sudo exp start;

