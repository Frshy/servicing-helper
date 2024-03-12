# To initialize you need to configure .env files and push database schema.
Env files: <br>
Copy .env.example to .env.developement and env.production, change .env's data according to you, remember to put NODE_ENV='production' in env.production <br>

```
make auth-build
make auth-up
```
once mailer app is running
open different terminal and do
```
make auth-db-deploy
```
If deploying is finished you can close both shells. <br>
