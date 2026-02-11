#!/bin/bash

deactivate
rm -rf .env
rm -rf node_modules

virtualenv .env

. .env/bin/activate

pip install nodeenv

nodeenv -p --node=25.6.0

nodeenv --version

# nvm install 25
npm install
