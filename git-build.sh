#!/usr/bin/env bash

_commit=`node -pe 'JSON.parse(process.env.npm_config_argv).original[3] || "fixed or changes"'`

git add .

git commit -am "$_commit"

if [ $? -eq 1 ]; then
    echo 'committed && exit'
fi

git pull

node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod --build-optimizer=false

git add .

git commit -am "build"

git push