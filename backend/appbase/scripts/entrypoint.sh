#!/bin/sh

#exit application incase of an error
set -e

#django command to collect static files and put them in the root static folder
python manage.py collectstatic --noinput

#runs the django app in the uWSGI server
#socket flag is to run the server in a TCP socket on port 8000
#master will run as the master thread not as a bcakground task
#enable thread allows multi threading in uWSGI
#module shows the entry point to the application created by django with startproject
uwsgi --socket :8000 --master --enable-threads --module app.wsgi
