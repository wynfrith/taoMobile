#!/bin/bash

./compress.sh
scp -P 345 -r m/dist/ root@taolijie.cn:/www/resources/m/
