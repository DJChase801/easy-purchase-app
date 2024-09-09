# Pushing the code to heroku
# all the strategies I have tried are listed blow.

## Prerequisites

- Heroku cli installed
- Docker installed
- Heroku account
- chmod +x deploy.sh

## Steps

## WORKING STRAT
## Login to heroku and container and run deploy.sh does the steps below other than log in. 
heroku login
heroku create easy-purchase-app **if not created
heroku container:login  
## (might not work before building)
(--- must do above before running deploy.sh---)

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
## note both local dev and prod are using the same database for now!!!