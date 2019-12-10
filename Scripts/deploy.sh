#!/usr/bin/env sh

PROJECT_NAME=TwoJs
URL=http://wyattpfeil.com/$PROJECT_NAME
SRC_DIR=/Users/brianpfeil/Downloads/TwoJs/

# sync changed local files to server
rsync -avz --exclude='.git/' -e ssh $SRC_DIR root@brianpfeil.com:/var/www/wyattpfeil-ghost/content/$PROJECT_NAME/

# visit URL
curl $URL > /dev/null 2>&1

# send macOS user notification (top right corner notification)
echo $MESSAGE | terminal-notifier -title "$PROJECT_NAME" -sound default 