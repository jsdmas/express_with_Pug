# Wetube Reloaded

22.12.20(화) 초기화 
## Node
노드란?  
Node.js는 Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임이다.  

런타임은 컴퓨터 프로그램이 실행되고 있는 동안의 동작을 말한다.  
런타임 환경은 컴퓨터가 실행되는 동안 프로세스나 프로그램을 위한 소프트웨어 서비스를 제공하는 가상 머신의 상태이다. ← 이 말이 Node.js의 정의에 좀 더 가깝다.  
JAVA는 JVM(Java Virtual Machine)으로 유명하다. JVM 을 깔면 어느 플랫폼에서나 동작한다.  
Node.js도 마찬가지로 가상머신을 포함하고 있기 때문에 어느 플랫폼에서나 자바스크립트 런타임을 사용할 수 있게 해준다.  

결국 자바스크립트 런타임이란, 자바스크립트를 웹브라우저 바깥 환경에서 돌릴 수 있게 해주는 프로그램이다.  
## mixin 
- partial 과 같지만 데이터를 받을 수 있는 partial을 말한다.
- 같은 형태의 블록을 지니지만 서로 다른 데이터를 가져야 할때 사용한다.

## url
클라이언트가 웹서버에게 요청 주소를 보낼때 express의 요청주소에   
```
localhost/:id
```
라우터를 설정해준뒤 서버에서 값을 받아보면 request값에 id의 값이 보내져 있다.
```
req.params.id ==> id값
```
또다른 예시로 클라이언트가 form을 통해 웹사이트에 get을 요청하면 url에 값들이 전해지게된다.  
ex)
```
localhost/설정라우터주소?year=1997&rating=5
```
위의 데이터들은 req.query를통해 값을 받아온다.

## params
req.param 는 router가 주는 express의 기능이다.
## locals

- app.locals
  - 자바스크립트 객체이고, 프로퍼티들은 애플리케이션 내의 지역 변수들이다. 
  - 애플리케이션의 라이프 타임 동안 유효하다.

- req.app.locals
  - 미들웨어에서 app의 지역 변수들을 사용할 수 있게 해준다.

- res.locals
  - res.locals의 프로퍼티들은 request의 라이프 타임 동안에만 유효하다.
  - html/view 클라이언트 사이드로 변수들을 보낼 수 있으며, 그 변수들은 오로지 거기서만 사용할 수 있다.
  - ex) res.locals.siteTitle --> json에 siteTitle변수를 추가하여 사용할 수 있다.

## query (쿼리)
쿼리는 **데이터베이스에게 특정한 데이터를 보여달라는 클라이언트(사용자)의 요청**을 말한다.  
흔히 `쿼리문을 작성한다` 라는 뜻은 **데이터베이스에서 원하는 정보를 가져오는 코드를 작성한다** 라고 이해하면 된다.  

## Schema.pre
pre(preformatted) : 미리 포맷된(미리 정의된)
mongoose 의 middleware이다.