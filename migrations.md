# LOCAL AND PROD use the same db
to run migrations you can do it locally and it will update the only db used for this app

if you run migrations you need to run the ./deploy.sh script so that working code locally will be 
working in prod as well. 

create a new file in the migrations folder

cd to the scripts directory in server app
run node run-migrations.js