# Pushing the code to heroku
# all the strategies I have tried are listed blow.
# The bottom one was the best and most successful.

## Prerequisites

- Heroku cli installed
- Docker installed
- Heroku account
- chmod +x deploy.sh

## Steps

```sh
# 1. Heroku login
heroku login  
- takes you to web browser login

# 2. Heroku create app
heroku create easy-purchase-app

# 3. Add a heroku remote
$ git init
$ heroku git:remote -a easy-purchase-app

// AFTER MAKING CHANGES BUT STILL INITIALIZED***********

# 4. Push to heroku
git add .
git commit -m "deploy to heroku"
git push heroku master:main

# 5. open the app
heroku open



**************************************************

# This process builds a image locally then pushes that to heroku and releases it. 

$ git add .
$ git commit -m "Added new feature"
$ git push origin main # Save your code to your git repo

$ export DOCKER_DEFAULT_PLATFORM=linux/amd64

$ docker-compose build 
$ docker tag easy-purchase-app-frontend:latest registry.heroku.com/easy-purchase-app/web
$ docker tag easy-purchase-app-backend:latest registry.heroku.com/easy-purchase-app/web

$ docker push registry.heroku.com/easy-purchase-app/web
$ heroku container:release web --app easy-purchase-app

$ unset DOCKER_DEFAULT_PLATFORM

**************************************************
## WORKING STRAT
## Login to heroku and container and run deploy.sh
heroku login
heroku create easy-purchase-app **if not created
heroku container:login
docker build --platform linux/amd64 -t registry.heroku.com/easy-purchase-app/web .
docker push registry.heroku.com/easy-purchase-app/web
heroku container:release web --app easy-purchase-app


# MIGRATIONS AND HEROKU POSTGRES
# get db url
# you can get all db login info form the url provided just ask gpt what they are.
heroku config:get DATABASE_URL --app easy-purchase-app

cd server/scripts # must cd into directory so file paths work in script
node run-migrations.js

## note the table names are capitalized, I hate this but it is that way for now!!!!