Категории
Возвращает категории

AUTHORIZATIONS:
BearerAuth
 HTTP: BearerAuth
HTTP Authorization Scheme: bearer
REQUEST BODY SCHEMA: application/json
brand_id	
integer
Фильтр по бренду

category_id	
integer
Фильтр по категории


http://b2b-api.backend.dev.next.local:8920/catalog/categories
Request samples
Payload
Content type
application/json

Copy
{
"brand_id": "186",
"category_id": "8"
}
