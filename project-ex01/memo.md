1. package(패키지)
   - 완전한 애플리케이션 ex) devtools(nodeamon, babel, webpack...)
   - 코드 샘플, 프로젝트에서 사용하는 모듈(라이브러리)
2. 의존성(Dependency)
   - 개발하고 있는 프로젝트(패키지, 애플리케이션)에서 설치하고 사용하는 다른 패키지
   - 1. 일반 의존성 : 개발하고 있는 애플리케이션에서 사용하는 패키지로 배포에 꼭 포함
   - 2. 개발 의존성 (-D) : 개발에 필요하거나 도움이 되는 패키지(dev tool), 패키지에 포함 안된다.
3. 패키지 설치 방식
   - 1. 전역(global) 설치 (-g): 여러 프로젝트에서 공통으로 사용하는 도구들(tool) 설치
   - 2. 지역(project local) 설치 : 특정 프로젝트에만 종속적인 도구나 라이브러리

Local 패키지 설치 (general dependency)
[...\project-ex01] $ npm i ejs
[...\project-ex01] $ npm i ejs@3.0.2

(
Local (developement dependency)
[...\project-ex01] $ npm i -D ejs
)

Local 패키지 삭제
[...\project-ex01] $ npm un ejs

```
 warning : description 이 없다고 함 (package.json)
 dir 를 해 보면 package-lock.json 가 생김(버전정보 관리)
 node_modules directory 가 생성
 안에 들어가면 ejs가 설치되어있다.
 @3.0.2  버전 변경 (package-lock.json)에서 변경된걸 확인
```

Global 설치 해 보기 (-g)
[...\project-ex01] $ npm i -g gulp
Global 패키지 삭제
[...\project-ex01] $ npm un -g gulp

Node(Javascript) project (Application, Package) 생성

1. 프로젝트 디렉토리를 생성 (mkdir)
2. 프로젝트 디렉토리로 이동 (cd)
3. [...\project-ex01] $ npm init -y >> 프로젝트 매니페스트 파일(package.json) 생성, 프로젝트 초기화

모듈

1. 코어모듈(fs, os, ... node에서 제공해주는 모듈)
2. 파일모듈 : 파일의 경로로 불러와서 모듈안의 객체, 함수 클래스를 사용한다.
3. npm모듈 : npm을 통해서 node_modules에 설치해서 사용하는 모듈
   패키지 설치 방법
   1. 로컬 배포
   2. 원격 배포
