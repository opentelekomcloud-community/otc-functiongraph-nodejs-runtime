#!/bin/bash

deactivate
rm -rf .env
rm -rf node_modules

virtualenv .env

. .env/bin/activate

pip install nodeenv

nodeenv -p --node=20.15

nodeenv --version

# nvm install 25
npm install
