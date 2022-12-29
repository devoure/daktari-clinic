FROM node
WORKDIR /app
COPY ./daktari-frontend/package.json .
RUN npm i
COPY ./daktari-frontend .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["npm", "run", "dev"]
