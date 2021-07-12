# 자바스크립트 비동기 처리와 콜백 함수

## 비동기 처리

: 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것

1. ajax

```javascript
function getData() {
  var tableData;
  $.get("https://domain.com/products/1", function (response) {
    tableData = response;
  });
  return tableData;
}
console.log(getData()); // undefined
```

why undefined?? >> $.get() 으로 데이터를 요청하고 받아올 때까지 기다리지 않고 return tableData를 했기 때문이다.

2. setTimeout()
   코드를 바로 실행하지 않고 지정한 시간만큼 기다렸다가 로직을 실행

```javascript
// #1
console.log("Hello");
// #2
setTimeout(function () {
  console.log("Bye");
}, 3000);
// #3
console.log("Hello Again");
```

‘Hello’ 출력 >> ‘Hello Again’ 출력 >> 3초 있다가 ‘Bye’ 출력

setTimeout()을 실행하고 나서 바로 다음 코드인 console.log('Hello Again')으로 넘어갔음

## 콜백 함수로 비동기 처리 방식의 문제점 해결하기

위의 문제들을 해결할 수 있는 방법(특정 로직이 끝났을 때 원하는 동작을 실행시킴)

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

## 콜백 지옥

콜백 함수를 연속해서 사용할 때 발생하는 문제.
콜백 안에 콜백을 계속 무는 형식으로 코딩을 하게 되면 가독성이 떨어지고 로직 변경이 어렵다. 이와 같은 코드 구조를 콜백 지옥이라고 한다.

## 콜백 지옥을 해결하는 방법

Promise 나 Async를 사용함
코딩패턴으로만 해결하려면 선언했던 콜백익명함수들을 각각의 함수로 구분해서 구현해야 함.

참고 : https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation
