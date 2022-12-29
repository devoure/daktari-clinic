#Image we are basing app from
FROM python:3.8-alpine

ENV PATH="/scripts:${PATH}"
#copy requirements.txt to the docker image
COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache --virtual .tmp gcc libc-dev linux-headers
#install the dependencies to the virtual folder
RUN pip install -r /requirements.txt

#remove the dependencies after finishing using them
RUN apk del .tmp

RUN mkdir /app
#copy our django app to the app directory in our container environment
COPY ./daktari_backend /app

#change directory location inside our container
WORKDIR /app

#copy the scripts folder
COPY ./scripts /scripts

#make all our scripts executable in the container environment
RUN chmod +x /scripts/*
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

#create a new user other than the root user to run our application
RUN adduser -D user
#sets the owner of the directory vol to user to allow them to use them , basically setting read access
RUN chown -R user:user /vol
#give user full access to read and write the folder web
RUN chmod -R 755 /vol/web

#switch to the created user
USER user

EXPOSE 8000

#setting the entry point to our created script 
#entrypoint script will start the application using the uWSGI server
CMD ["entrypoint.sh"]
