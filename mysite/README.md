## MySite on Node(Express)

### project manifest 파일(package.json) 생성

[..\mysite] $ npm init -y

### 설치 패키지

```bash
[..\mysite] $ npm i express
[..\mysite] $ npm i express-session
[..\mysite] $ npm i ejs
[..\mysite] $ npm i dotenv
[..\mysite] $ npm i sequelize (sql문 내에서 date format 하려고 설치함)
[..\mysite] $ npm i moment ( ejs에서 date format 하기위함)
[..\mysite] $ npm i mysql2
[..\mysite] $ npm i multer (file upload))
[..\mysite] $ npm i winston (log)
[..\mysite] $ npm i winston-daily-rotate-file
[..\mysite] $ npm i -D mocha (test)
[..\mysite] $ npm i -D chai
[..\mysite] $ npm i -D nodemon
```

### scripts in package.json

```JSON

 "scripts": {
    "start": "index.js",
    "test": "npx mocha",
    "debug": "nodemon index.js"
  },

```

### project structure

<pre>
/mysite
    |--- index.js
    |--- package.json
    |--- package-lock.json
    |--- [node_modules]
    |--- test
    |--- logging
    |--- [logs]
    |       |--- [error]
    |--- [multer-temporary-store]
    |--- config
    |--- public
    |       |--- assets
    |               |--- js
    |               |--- css
    |               |--- images
    |               |--- [upload-images]
    |--- routes
    |--- controllers
    |       |--- admin
    |--- models
    |--- views
            |--- main
            |--- admin
            |       |--- includes
            |--- user
            |--- board
            |--- guestbook
            |--- gallery
            |--- includes
</pre>

### 실행

```bash
[..\mysite] $ npm start (운용시 ...)
[..\mysite] $ npm run debug(개발시 ... Live Update)

```

### models : 객체만들기

sequelize가 인식해야해 <a href="https://sequelize.org/master/">how to use</a>

### date-format

1. sequelize (sql문에서)
2. moment js (front 에서 (ejs...)): <a href="https://momentjs.com/">how to use </a>

### log

<a href="">go to README</a>
