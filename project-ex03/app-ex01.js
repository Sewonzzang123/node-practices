/**
 * sewon-math npm 모듈 테스트 (모듈 패키지: 원격 레지스트리)
 *
 * npm i sewon-math
 * 명령어로 설치 후 , 테스트 할 것
 */

const sewonMath = require("sewon-math");

console.log(sewonMath.sum(1, 2, 3, 4));
console.log(sewonMath.max(-10, -20, -30, -40));
console.log(sewonMath.min(-1, -2, 0, 1, 2));
