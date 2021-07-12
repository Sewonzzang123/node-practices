# 자바스크립트 async와 await

## async & await는 뭔가요?

자바스크립트의 비동기 처리 패턴.
콜백 함수와 프로미스의 단점을 보완하고 읽기 좋은 코드를 작성할 수 있게 도와줌

## async & await 기본 문법

```javascript
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

1. 함수 앞에 async 라는 예약어를 붙인다.
2. 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 await를 붙인다. ( 비동기 처리 메서드가 꼭 프로미스 객체를 반환 해야 await가 의도한 대로 동작한다.)

## async & await 간단한 예제

```javascript
function fetchItems() {
  return new Promise(function (resolve, reject) {
    var items = [1, 2, 3];
    resolve(items);
  });
}

async function logItems() {
  var resultItems = await fetchItems();
  console.log(resultItems); // [1,2,3]
}
```

fetchItems() 함수는 프로미스 객체를 반환하는 함수이다.
fetchItems() 함수를 실행하면 프로미스가 이행(Resolved)되어 결과 값은 items 배열이 된다.

logItems() 함수를 실행하면 fetchItems() 함수의 결과값인 items 배열이 resultItems 변수에 담긴다.
따라서 콘솔에는 [1,2,3]이 출력된다.

await를 사용하지 않았다면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백함수나 .then() 등을 사용해야 할 것이다.

다른 방법의 비동기 처리

```javascript
// HTTP 통신 동작을 모방한 코드
function fetchItems() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var items = [1, 2, 3];
      resolve(items);
    }, 3000);
  });
}

// jQuery ajax 코드
function fetchItems() {
  return new Promise(function (resolve, reject) {
    $.ajax("domain.com/items", function (response) {
      resolve(response);
    });
  });
}
```

## async & await 예외 처리

try catch로 예외 처리

```javascript
async function logTodoTitle() {
  try {
    var user = await fetchUser();
    if (user.id === 1) {
      var todo = await fetchTodo();
      console.log(todo.title); // delectus aut autem
    }
  } catch (error) {
    console.log(error);
  }
}
```

네트워크 통신 오류 뿐만 아니라 간단한 타입 오류 등의 일반적인 오류까지도 catch로 잡아낼 수 있다.
발견된 에러는 error 객체에 담기기 때문에 에러의 유형에 맞게 에러 코드를 처리해주면 된다.
