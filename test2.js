kv:namespace
Manage Workers KV namespaces.

The kv:... commands allow you to manage application data in the Cloudflare network to be accessed from Workers using Workers KV. Learn more about using Workers KV with Wrangler in the Workers KV guide.
​​create
Create a new namespace.


wrangler kv:namespace create <NAMESPACE> [OPTIONS]

NAMESPACE  required
The name of the new namespace.
--env  optional
Perform on a specific environment.
--preview  optional
Interact with a preview namespace (the preview_id value).
Below is an example of using the create command to create a KV namespace called MY_KV.


wrangler kv:namespace create "MY_KV"

Below is an example of using the create command to create a preview KV namespace called MY_KV.


wrangler kv:namespace create "MY_KV" --preview

​​list
List all KV namespaces associated with the current account ID.


wrangler kv:namespace list

Below is an example that passes the Wrangler command through the jq command:


wrangler kv:namespace list | jq "."

​​delete
Delete a given namespace.


wrangler kv:namespace delete [OPTIONS]

Exactly one of --binding or --namespace-id is required.
--binding 
The binding name of the namespace, as stored in the wrangler.toml file, to delete.
--namespace-id 
The ID of the namespace to delete.
--env  optional
Perform on a specific environment.
--preview  optional
Interact with a preview namespace instead of production.
Below is an example of deleting a KV namespace called MY_KV.


wrangler kv:namespace delete --binding=MY_KV

Below is an example of deleting a preview KV namespace called MY_KV.


wrangler kv:namespace delete --binding=MY_KV --preview

​​kv:key
Manage key-value pairs within a Workers KV namespace.

The kv:... commands allow you to manage application data in the Cloudflare network to be accessed from Workers using Workers KV. Learn more about using Workers KV with Wrangler in the Workers KV guide.
​​put
Write a single key-value pair to a particular namespace.


wrangler kv:key put <KEY> [VALUE] [OPTIONS]

Exactly one of --binding or --namespace-id is required.

Exactly one of VALUE or --path is required.

KEY  required
The key to write to.
VALUE  optional
The value to write.
--path optional
When defined, the value is loaded from the file at --path rather than reading it from the VALUE argument. This is ideal for security-sensitive operations because it avoids saving keys and values into your terminal history.
--binding 
The binding name of the namespace, as stored in the wrangler.toml file, to delete.
--namespace-id 
The ID of the namespace to delete.
--env  optional
Perform on a specific environment.
--preview  optional
Interact with a preview namespace instead of production.
--ttl  optional
The lifetime (in number of seconds) that the key-value pair should exist before expiring. Must be at least 60 seconds. This option takes precedence over the expiration option.
--expiration  optional
The timestamp, in UNIX seconds, indicating when the key-value pair should expire.
--metadata  optional
Any (escaped) JSON serialized arbitrary object to a maximum of 1024 bytes.
--local  optional
Interact with locally persisted data
--persist-to  optional
Specify directory for locally persisted data
Below is an example that puts a key-value into the namespace with binding name of MY_KV.


wrangler kv:key put --binding=MY_KV "my-key" "some-value"

Below is an example that puts a key-value into the preview namespace with binding name of MY_KV.


wrangler kv:key put --binding=MY_KV --preview "my-key" "some-value"

Below is an example that puts a key-value into a namespace, with a time-to-live value of 10000 seconds.


wrangler kv:key put --binding=MY_KV "my-key" "some-value" --ttl=10000

Below is an example that puts a key-value into a namespace, where the value is read from the value.txt file.


wrangler kv:key put --binding=MY_KV "my-key" --path=value.txt

​​list
Output a list of all keys in a given namespace.


wrangler kv:key list [OPTIONS]

Exactly one of --binding or --namespace-id is required.
--binding 
The binding name of the namespace, as stored in the wrangler.toml file, to delete.
--namespace-id 
The ID of the namespace to delete.
--env  optional
Perform on a specific environment.
--preview  optional
Interact with a preview namespace instead of production.
--prefix  optional
Only list keys that begin with the given prefix.
--local  optional
Interact with locally persisted data
--persist-to  optional
Specify directory for locally persisted data
Below is an example that passes the Wrangler command through the jq command:


wrangler kv:key list --binding=MY_KV --prefix="public" | jq "."

​​get
Read a single value by key from the given namespace.


wrangler kv:key get <KEY> [OPTIONS]

Exactly one of --binding or --namespace-id is required.
KEY  required
The key value to get.
--binding 
The binding name of the namespace, as stored in the wrangler.toml file, to get from.
--namespace-id 
The ID of the namespace to get from.
--env  optional
Perform on a specific environment.
--preview  optional
Interact with a preview namespace instead of production.
--text  optional
Decode the returned value as a UTF-8 string.
--local  optional
Interact with locally persisted data
--persist-to  optional
Specify directory for locally persisted data
Here is an example that gets the value of the "my-key" key from the KV namespace with binding name MY_KV.


wrangler kv:key get --binding=MY_KV "my-key"

​​delete
Remove a single key value pair from the given namespace.


wrangler kv:key delete <KEY> [OPTIONS]

Exactly one of --binding or --namespace-id is required.
KEY  required
The key value to get.
--binding 
The binding name of the namespace, as stored in the wrangler.toml file, to delete.
--namespace-id 
The ID of the namespace to delete.
--env  optional
Perform on a specific environment.
--preview  optional
Interact with a preview namespace instead of production.
--local  optional
Interact with locally persisted data
--persist-to  optional
Specify directory for locally persisted data
Below is an example that deletes the key-value pair with key "my-key" from the KV namespace with binding name MY_KV.


wrangler kv:key delete --binding=MY_KV "my-key"

​​kv:bulk
Manage multiple key-value pairs within a Workers KV namespace in batches.

The kv:... commands allow you to manage application data in the Cloudflare network to be accessed from Workers using Workers KV. Learn more about using Workers KV with Wrangler in the Workers KV guide.
​​put
Write a JSON file containing an array of key-value pairs to the given namespace.


wrangler kv:bulk put <FILENAME> [OPTIONS]

Exactly one of --binding or --namespace-id is required.
FILENAME  required
The JSON file containing an array of key-value pairs to write to the namespace.
--binding 
The binding name of the namespace, as stored in the wrangler.toml file, to delete.
--namespace-id 
The ID of the namespace to delete.
--env  optional
Perform on a specific environment.
--preview  optional
Interact with a preview namespace instead of production.
--local  optional
Interact with locally persisted data
--persist-to  optional
Specify directory for locally persisted data
This command takes a JSON file as an argument with a list of key-value pairs to upload. An example of JSON input:


[
  {
    "key": "test_key",
    "value": "test_value",
    "expiration_ttl": 3600
  }
]

KV namespace values can only store strings. In order to save complex a value, stringify it to JSON:


[
  {
    "key": "test_key",
    "value": "{\"name\": \"test_value\"}",
    "expiration_ttl": 3600
  }
]

Here is the full schema for key-value entries uploaded via the bulk API:

key  required
The key’s name. The name may be 512 bytes maximum. All printable, non-whitespace characters are valid.
value  required
The UTF-8 encoded string to be stored, up to 25 MB in length.
metadata  optional
Any arbitrary object (must serialize to JSON) to a maximum of 1024 bytes.
expiration  optional
The time, measured in number of seconds since the UNIX epoch, at which the key should expire.
expiration_ttl  optional
The number of seconds the document should exist before expiring. Must be at least 60 seconds.
base64  optional
When true, the server will decode the value as base64 before storing it. This is useful for writing values that would otherwise be invalid JSON strings, such as images. Defaults to false.
If both expiration and expiration_ttl are specified for a given key, the API will prefer expiration_ttl.
Here is an example of writing all the key-value pairs found in the allthethingsupload.json file.


wrangler kv:bulk put --binding=MY_KV allthethingsupload.json

​​delete
Delete all keys read from a JSON file within a given namespace.


wrangler kv:bulk delete <FILENAME> [OPTIONS]

Exactly one of --binding or --namespace-id is required.
FILENAME  required
The JSON file containing an array of keys to delete from the namespace.
--binding 
The binding name of the namespace, as stored in the wrangler.toml file, to delete.
--namespace-id 
The ID of the namespace to delete.
--env  optional
Perform on a specific environment.
--preview  optional
Interact with a preview namespace instead of production.
--local  optional
Interact with locally persisted data
--persist-to  optional
Specify directory for locally persisted data
This command takes a JSON file as an argument containing an array of keys to delete. Here is an example of the JSON input:


["test_key_1", "test_key_2"]

Below is an example of deleting all the keys found in the allthethingsdelete.json file.


wrangler kv:bulk delete --binding=MY_KV allthethingsdelete.json










// transportrequests.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Sse,
} from '@nestjs/common';
import { TransportRequestsService } from './transportRequests.service';
import {
  GetNotPredictedTransportRequestsByDateDto,
  GetTransportRequestByNumberDto,
  GetTransportRequestsByDateRangeDto,
  GetTransportRequestsByDateDto,
} from './transport-requests.dto';

@ApiTags('getTransportRequests')
@Controller('/api/getTransportRequests')
export class TransportRequestsController {
  constructor(private readonly transportRequestsService: TransportRequestsService) {}

  // ... (other methods remain unchanged)

  @Post('/not-predicted')
  async getNotPredictedTransportRequestsByDate(@Body() dto: GetNotPredictedTransportRequestsByDateDto) {
    return this.transportRequestsService.getNotPredictedTransportRequestsByDate(dto.date);
  }

  @Post('byNumber')
  async getTransportRequestByNumber(@Body() dto: GetTransportRequestByNumberDto) {
    return this.transportRequestsService.getTransportRequestByNumber(dto.number);
  }

  @Post('byDateRange')
  async getTransportRequestsByDateRange(@Body() dto: GetTransportRequestsByDateRangeDto) {
    return this.transportRequestsService.getTransportRequestsByDateRange(dto.startDate, dto.endDate);
  }

  @Post('by-date')
  async getTransportRequestsByDate(@Body() dto: GetTransportRequestsByDateDto) {
    return this.transportRequestsService.getTransportRequestsByDate(dto.date);
  }

  // ... (other methods remain unchanged)
}
