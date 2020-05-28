# Nest App

## Description

TODO:

## Installation

```bash
$ yarn
```

## DB Migration Tips
[reference](https://github.com/nestjs/typeorm/issues/33#issuecomment-469426238)

I have put these scripts in the package.json. Copy `ormconfig.json.sample` and rename to `ormconfig.json`. Change the configuration parameters in the file according to your database config.

+ `migration:generate` to generate a migration file according to your entity files modification. So you may create or update your entity files first. When running the command, a subject must be passed as the migration file name, for example, *initUserTable*.
+ `migration:run` to run the migrations
+ `migration:revert` to revert the migrations
```json
{
  "scripts": {
    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
    "migration:generate": "yarn run typeorm migration:generate -n",
    "migration:run": "yarn run typeorm migration:run",
    "migration:revert": "yarn run typeorm migration:revert"
  }
}
```

## Logging
Declare a logger as a class field.
```ts
private readonly logger = new Logger(YourClass.name);

// somewhere in the class method
this.logger.debug('log something');
```

## Enviroment variables
For simplicity, create a file named as **.env** in the project root.
According to your `NODE_ENV` setting, **.env.NODE_ENV** and **.env.NODE_ENV.local** will be used with higher priority.

## Validation
A built-in pipe `ValidationPipe` has been declared in the **main.ts**.
```ts
// in main.ts bootstrap method
app.useGlobalPipes(new ValidationPipe());
```
Add validation rules as decorators to your request dto class. For more details, refer to [class-validator](https://github.com/typestack/class-validator#validation-decorators).

## Pagination
Reference: [nestjs-typeorm-paginate](https://github.com/nestjsx/nestjs-typeorm-paginate)
In your repository method, for example
```ts
// `this` is your repository. if paginate used in service, use `this.repositoryName`
// paginationOptions contains `page` and `limit` properties
// the third parameter usually is your FindOptions
paginate(this, paginationOptions, {
  where: whereObj,
})
```

## Running the app
Make sure you have a valid mysql instance can be connected to and configure related env variables. You can refer to **src/config/configuraion.ts** to figure out what can be configured and configure them in the dotenv (.env) files.
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Current TODOs
- [ ] Authentication (JWT)
- [ ] Authorization (Guards)
- [ ] Redis Integration
- [ ] Custom Error handling
