/**
 *package-lock에 npm i로 설치해 놓으면 경로설정없이 사용 가능
 */

const sewonMath = require("sewon-math");

console.log(sewonMath.sum(1, 2, 3, 4));
console.log(sewonMath.max(-10, -20, -30, -40));
console.log(sewonMath.min(-1, -2, 0, 1, 2));
