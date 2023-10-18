POST    https://auth3.next.local/connect/token

Content-Type multipart/form-data; boundary=<calculated when request is sent>
я должен передать body в формате formdata

client_id DispatcherWorkplace
client_secret secret
grant_type password
username (тут this.model.email)
password (тут this.model.password)
scope myAPIs

реализуй это
