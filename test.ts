Я хочу добавить модуль auth на свой сервер на Nest (который будет прослойкой)
создать два эндпойнта

/login
который будет принимать login и password 
затем будет выполнять POST  https://auth3.next.local/connect/token

Content-Type multipart/form-data; boundary=<calculated when request is sent>

и передавать 
client_id   DispatcherWorkplace
client_secret secret
grant_type password
username login (который присылает пользователь)
password password (который присылает пользователь)
scope myAPIs





 /checktoken
который будет принимать token и 

GET https://auth3.next.local/connect/checktoken
и в звголовке будет добавлять 
Authorization со значением  token  (который присылает пользователь)


