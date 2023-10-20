d69d6c2d8e494d47aac84ef650f2cd23
ixiMAWaXXOQ4-ZCx-F4zmlTjLil2-iFqeL76NRK3


wrangler kv:namespace list | jq "."
[
  {
    "id": "06779da6940b431db6e566b4846d64db",
    "title": "TEST_NAMESPACE"
  },
  {
    "id": "32ac1b3c2ed34ed3b397268817dea9ea",
    "title": "STATIC_CONTENT"
  }
]


name = "confirm-kaspi-order"
type = "javascript"
account_id = "e063b9c38c5012f903d8522ee8b27872"

[vars]
SECRET_TOKEN = "secret"

[kv_namespaces]
[[kv_namespaces]]
binding = "USER_DATA" 
id = "your_copied_namespace_id" # Сюда вставьте скопированный Namespace ID



https://confirm-kaspi-order.alser-kz-s.workers.dev/
