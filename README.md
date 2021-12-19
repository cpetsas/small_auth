# Small auth project

## System dependencies
Developed in Ubuntu 20.04 with WSL1
- Python3 and pip
- npm and nodejs 12.22.0 and later
- Postgresql

## Project Dependencies
###Backend

Navigate in the backend directory and install dependencies with npm:
```sh
    npm install
```
Sometimes the nodemon package fails to install, if that happens run:
```sh
    npm install -g nodemon
```
###Frontend
Navigate in the frontend/auth directory and install dependencies with npm:
```sh
    npm install
```

###Testing
Navigate to backend/testing and then:
- Create a venv by running:
```sh
    python3 -m venv <venv_path>
```
- Install all dependencies in the new venv by activating it:
```sh
    source /path/to/venv/bin/activate
```
and then run:
```sh
    pip install -r /path/to/requirements.txt
```

## Deploying the system
- Start the postgres service and create a new role and a new DB:
```sh
    sudo -u postgres psql
    postgres=# create database auth;
    postgres=# create user auth with encrypted password 'auth';
    postgres=# grant all privileges on database auth to auth;
```
If you are using WSL then postgres will sometimes fail to start on system bootup. If that happens run:
```sh
    sudo service postgresql start
```
Maybe it's a good idea to create a cron job with the above command so we don't have to deploy the psql server manually every time.
Make sure the config.json file in the root of this repo matches the DB details you set (we only care about the development section in the file). Also the file in backend/deploy.sh should also have the correct DB details
- Navigate in backend and run
```sh
    bash deploy.sh
```

- Navigate in frontend/auth and run
```sh
    npm run dev
```
The application is accessible (assuming you didnt change the deployment script env vars) from localhost:3000
- Finally, to run the tests navigate to backend/testing and run
```sh
    py.test
```