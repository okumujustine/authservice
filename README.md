### NOTIFICATION SERVICE

##### * Prerequisites
- install mongodb 4.4.0.
- create a database named **wayalist**


##### 1. Clone the project.

```$ git clone ```

#### * MUST SETUPS.
- make sure to set your database credentials from the **ormconfig.json** file.
- RUN ```$ npm run migrate``` to create the user tables.
- Or RUN ```$ npm run generate users-table``` and ```$ npm run migrate``` to create the user tables, incase the previous command fails.

##### 2. Create a .env file from the copy .example.env


```$ cp  .example.env .env```
Then edit the variables in the .env file to have real values.

NB: This values should be the same in all the services.

##### 3. Install all the required packages with
```$ npm install```

##### 4. to start the service
```$ npm run dev```

##### runs on PORT 4000