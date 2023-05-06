FROM node:16-alpine as x

WORKDIR /app

#copy all except those in dockerignore
COPY . .

# Install dependencies 
RUN npm ci 

RUN npm run build

EXPOSE 3000

CMD [ "npx", "serve", "build" ]

#use nginx rather than webpack server 
#FROM nginx:1.19.0
#RUN rm -rf ./*
#COPY --from=x /app/build .
# Start the server
#CMD [ "nginx" , "-g", "deamon off;"]

