sudo sysctl -w fs.inotify.max_user_watches=12288
sudo sysctl -w fs.inotify.max_user_instances=1024
npm start &
sudo exp start --android --tunnel
