# Pushing the code to heroku

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

$ docker-comose build 
$ docker tag easy-purchase-app-frontend:latest registry.heroku.com/easy-purchase-app/web
$ docker tag easy-purchase-app-backend:latest registry.heroku.com/easy-purchase-app/web

$ docker push registry.heroku.com/easy-purchase-app/web
$ heroku container:release web --app easy-purchase-app

$ unset DOCKER_DEFAULT_PLATFORM