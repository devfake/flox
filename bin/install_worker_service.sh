#!/bin/bash

echo "Installing Flox worker as a service"

FLOX_PATH=${1:-$PWD}
echo "Looking for Flox in path: $FLOX_PATH"

PHP_PATH=${2:-/usr/bin}
echo "Using php binary in: $PHP_PATH"

mkdir -p $HOME/.config/systemd/user
FILE=$HOME/.config/systemd/user/flox.service
echo "Installing service in: $FILE"

cat > $FILE <<- EOM
[Unit]
Description=Flox Worker Service

[Service]
ExecStart=$PHP_PATH/php $FLOX_PATH/backend/artisan queue:work --tries=3
Restart=always

[Install]
WantedBy=flox.target
EOM

systemctl --user daemon-reload
echo "Enabling flox.service..."
systemctl --user enable flox.service
echo "Starting flox.service..."
systemctl --user start flox.service

echo "Done installing Flox service"

systemctl --user status flox
