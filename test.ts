
Ack Mode: Nack message requeue true
Encoding: Auto string / base64
Messages: 1



Warning: getting messages from a queue is a destructive action. 
Clicking "Get Message(s)" will consume messages from the queue. If requeue is set the message will be put back into the queue in place, but "redelivered" will be set on the message.

If requeue is not set messages will be removed from the queue.

Furthermore, message payloads will be truncated to 50000 bytes.

