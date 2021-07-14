## MySite on Node(Express)

### 설치 패키지

```bash
[..\mysite] $ npm i express
[..\mysite] $ npm i ejs
[..\mysite] $ npm i -D nodemon
```

### scripts in package.json

```JSON

"scripts": {
"start": "index.js",
"debug": "nodemon index.js"
},

```

### project structure

<pre>
/mysite
    |--- index.js 
    |--- package.json
    |--- package-lock.json
    |--- /node-modules
    |--- /config
    |--- /public
    |--- /routes
    |--- /controllers
    |--- /models
    |--- /views
            |--- /main
            |--- /user
            |--- /guestbook
            |--- /board
            |--- /gallery
            |--- /admin
</pre>

### 실행

```bash
[..\mysite] $ npm start (운용시 ...)
[..\mysite] $ npm run debug(개발시 ... Live Update)

```

### 추가 설치 패키지

[..\mysite] $
