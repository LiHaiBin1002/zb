#!/bin/bash
nohup /usr/bin/python2 /server/lcserver/manage.py runserver 0.0.0.0:8000 >> /server/lcserver/nohup.out 2>&1 &
tail -f /server/lcserver/nohup.out
