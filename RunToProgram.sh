#!/bin/bash
sudo gnome-terminal -e 'bash -c "cd ~/opt/Android/Sdk/emulator && gnome-terminal -x ./emulator -avd Nexus_5X_API25"';
cd App && sudo exp start;
