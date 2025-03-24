# Project: QR-maker

QR-Maker that creates unique qr that allow change the content without changing the qr file, stored in Postgres BDD.

## Project Structure Overview

### Directory Structure

Project structure:

- **`src`**: Source code directory.
  - **`common`**:
    - **`adapters`**: External configuration of critical libraries to have important functions on the code.
    - **`entities`**: Base entity that extends some common variables to other entities and give behaviors pre insert and update.
    - **`pipes`**: Injectable customized validators to consume in the endpoints.
  - **`config`**:
    - **`app.config.ts`**: Load a small configration to parse the value of application Port.
  - **`modules`**
    - **`category`**: Base module that controls all logic over categories.
    - **`qrcreator-handler`**: Base module that controls all logic over qrCreator, and interact with category module.
  - **`app.module`**
  - **`main.ts`** :
- **`.env`**: Eenvironment variables file.
- **`.eslintrc.js`**: rules to good programming practices.
- **`.gitignore`**: Files and directories should be ignored by Git version control.
- **`.prettierrc.js`**: Configuration file to work fine with eslint.
- **`package.json`**: Npm configuration file.
- **`tsconfig.json`**: TypeScript configuration file.

### Environment Configuration

For development, a `.env` file is used to manage environment variables. The following variables are defined:

```plaintext
PORT=
QR_ROUTE=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
```

### Development and Deployment Commands

- `npm run start:dev`: Compile TypeScript files to JavaScript and add whach funtion to load changes on real time.
- `npm run build`: Create the build to load in production.
- `npm run test`: Run the test of project. Can be used with others flags for more options. (No test right now)

## Documentation

### API Endpoints
  ### QR-Maker

- POST: [/] Endpoint to create new QR Files, requires a Body.
- GET: [/] Endpoint to get all existing QR files
- GET: [/:qr-id] Endpoint to get the information of one QR File by id.
- GET: [/getcontent/:content_id] Endpoint to get the content associated to one qr file.
- GET: [/get-qr/:content_id] Endpoint that is call when scannig the qr file, return the values storage in BDD.
- PUT: [/:content_id] Endpoint that update the content associated to one qr.
- DELETE: [/:content_id] Endpoint that delete QR by content_id.

  ### Category

- GET: [/] Endpoint to get all existing Categories.
- GET: [/:id_category] Endpoint to get the information of one Category by id.
  

### Dependences

- **@nestjs**: Provides tools and core function to the function of project.
- **class-transformer**: Libraries used to add validation in dtos object or creation of entities, work in pair with calss validator.
- **class-validator**: Libraries used to add validation in dtos object or creation of entities, work in pair with calss transformer.
- **Dotenv**: Loads environment variables from a .env file, helping manage configuration securely.
- **Pg**: PostgreSQL client for Node.js that allows interaction with PostgreSQL databases.
- **Typeorm**: An ORM that allows interaction with databases using entities and repositories.
- **multer**: Add function to work with files, pipes, diskstorage, filters, etc.
- **uuid**: Most used library to generate powerfull id to objects.

### devDependences

- **@types/**: Provides TypeScript type definitions to the libraries, this is only applicable if the library have a definition file, ensuring type safety in development.
- **eslint**: Ensure and enforce good programming practice in the dev process.
- **prettier**: Add more functions and complements to eslint.
- **jest**: Allow the implementation of test.

### Installation Commands
  Important: Have NodeJs and Install NestJs.
  For the fist launch, change app.module.ts the configuratios of TypeOrmModule.ForRoot: autoLoadEntities and synchronize in true, after change to false.
- General dependencies: `npm install`
- For BDD, install docker with the pg image and create a docker-compose file or install and configure PGAdmin in Dev process.