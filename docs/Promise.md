# 자바스크립트 Promise 쉽게 이해하기

## Promise가 뭔가요?

자바스크립트 비동기 처리에 사용되는 객체

## Promise가 왜 필요한가요?

프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다.

```javascript
$.get("url 주소/products/1", function (response) {
  // ...
});
```

위 API가 실행되면 서버에다가 데이터를 받아오는 요청을 보낸다.
여기서 데이터를 받아오기도 전에 마치 데이터를 다 받아온 것 마냥 화면에 데이터를 표시하려고 하면 오류가 발생하거나 빈 화면이 뜰것이다. 이와 같은 문제점을 해결하기 위한 방법 중 하나가 프로미스이다.

## 프로미스 코드 - 기초

```javascript
function getData(callbackFunc) {
  $.get("https://domain.com/products/1", function (response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function (tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

프로미스를 적용

```javascript
function getData(callback) {
  // new Promise() 추가
  return new Promise(function (resolve, reject) {
    $.get("url 주소/products/1", function (response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function (tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});
```

## 프로미스의 3가지 상태 (states)

상태 : 프로미스의 처리 과정을 의미
new Promise()로 프로미스를 생성하고 종료될 때까지 3가지 상태를 갖는다.

1. Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
2. Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
3. Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

### 상태

1. Pending(대기)
   new Promise() 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 인자는 resolve, reject 이다.

```javascript
new Promise(resolve, reject){
    // ...
};
```

2. Fulfilled(이행)
   콜백 함수의 인자 resolve를 실행하면 이행(Fulfilled)상태가 된다.
   이행 상태가 되면 then()을 이용하여 처리 결과 값을 받을 수 있다.

```javascript
function getData(){
 return new Promise(resolve, reject){
     var data = 100;
     resolve(data);
    });
}

//resolve()의 결과 값 data를 resolveData로 받음
getData().then(functioni(resolvedData){
    console.log(resolvedData); // 100
});
```

3. Rejected(실패)

   new Promise()로 생성한 프로미스 객체에서 reject를 호출하면 실패(Rejected) 상태가 된다.
   그리고, 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)을 catch()로 받을 수 있다.

```javascript
function getData() {
  return new Promise(function (resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

//reject()의 결과 값 Error을 err에 받음.
getData()
  .then()
  .catch(function (err) {
    console.error(err);
  });
```

## 여러 개의 프로미스 연결하기 (Promise Chaining)

then() 으로 여러 개의 프로미스를 연결한다.

```javascript
new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 2000);
})
  .then(function (result) {
    console.log(result); // 1
    return result + 10;
  })
  .then(function (result) {
    console.log(result); // 11
    return result + 20;
  })
  .then(function (result) {
    console.log(result); // 31
  });
```

## 프로미스의 에러 처리 방법

프로미스의 reject() 메서드가 호출되어 실패 상태가 된 경우에 실행된다.

1. then() 의 두 번째 인자로 에러를 처리하기

```javascript
getData().then(handleSuccess, handleError);
```

2. catch() 를 이용하기

```javascript
getData().then().catch();
```

## 프로미스 에러 처리는 가급적 catch()를 사용

더 많은 예외 처리 상황을 위해 프로미스의 끝에 가급적 catch()를 쓰는게 좋다.
