# express

## 클라이언트

1. 로그인 버튼을 누르는 순간 callbackURL으로 받은 code를 클라언트에 저장한다.
2. code를 서버에 전송한다.
3. 서버에서 결과를 전송받는다.

## 서버

if (클라이언트의 쿠키 access_jwt_token이 있는 경우) then ( 1. access_jwt를 Base_64로 복호화 한 뒤 쿠키의 입력된 정보를 확인한다. 2. 쿠키의 정보로 API의 인가를 확인한다. 3. 정보를 보내준다.
)

if (클라이언트의 쿠키 refresh_jwt_token이 있는 경우) then ( 1. refresh_jwt_token을 Base_64로 복호화 한 뒤 쿠키의 입력된 정보를 확인한다. 2. 쿠키의 정보로 API의 인가를 확인한다. 3. access_token을 refresh_jwt_token의 정보를 담아서 새로 발급한다. 4. 쿠키의 access_token을 재발급 한다. 2. 정보를 보내준다.
)

if (쿠키가 둘 다 없는 경우) then {
로그인 화면으로 보낸다.
}

if (로그인 로직) then ( 1. 클라이언트에서 받은 code를 Git Auth 서버에 전송한다. 2. Git Auth에서 access_token을 전달 받는다. 3. 서버에서 Git access_token 정보를 Git Resource 서버에 전송한다. 4. Git Resource 서버에서 받은 유저 정보를 DB에 저장하며 access_token과 refresh_token의 payload에 이메일 정보를 넣어서 생성한다. 5. 유저 정보는 Body에 jwt 토큰 2개는 쿠키에 넣어서 보낸다.
)

if (클라이언트에서 로그아웃 요청을 보낸 경우) then ( 1. 서버에서 쿠키 삭제
)
