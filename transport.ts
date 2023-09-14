[Nest] 7856  - 14.09.2023, 15:05:50   ERROR [Server] There is no matching event handler
 defined in the remote service. Event pattern: undefined

Queue TmsQueue in virtual host /
Overview
Queued messages last minute 
15:36:4015:36:5015:37:0015:37:1015:37:2015:37:300.01.0
Ready
0
Unacked
0
Total
0
Message rates last minute 
15:36:3015:36:4015:36:5015:37:0015:37:1015:37:200.0 /s1.0 /s
Publish
0.00/s
Deliver (manual ack)
0.00/s
Deliver (auto ack)
0.00/s
Consumer ack
0.00/s
Redelivered
0.00/s
Get (manual ack)
0.00/s
Get (auto ack)
0.00/s
Get (empty)
0.00/s
Details
Features	
arguments:	
x-queue-type:	classic
durable:	true
Policy	ha-fed
Operator policy	
Effective policy definition	
federation-upstream-set:	all
ha-mode:	exactly
ha-params:	5
ha-sync-mode:	automatic
message-ttl:	3465687905
Node	rabbit@dkrclstrnd1
Mirrors	rabbit@dkrclstrnd4
rabbit@dkrclstrnd3
rabbit@dkrclstrnd2
rabbit@dkrclstrnd5
State	idle
Consumers	1
Consumer capacity 	100%
Total	Ready	Unacked	In memory	Persistent	Transient, Paged Out
Messages 	0	0	0	0	0	0
Message body bytes 	0 B	0 B	0 B	0 B	0 B	0 B
Process memory 	17 KiB
Consumers (1)
Channel 	Consumer tag	Ack required	Exclusive	Prefetch count	Active 	Activity status	Arguments
10.0.0.138:44130 (1)
amq.ctag-XEWHQumiEoeElTMmv9DsSw	○	○	0	●	up	
Bindings (2)
From	Routing key	Arguments	
(Default exchange binding)
TmsExchange
tms1c	
⇓

This queue

Add binding to this queue
From exchange:
 *
Routing key:
Arguments:
=	

String
Publish message
Message will be published to the default exchange with routing key TmsQueue, routing it to this queue.
Delivery mode:

1 - Non-persistent
Headers: 
=	

String
Properties: 
=	
Payload:
Get messages
Warning: getting messages from a queue is a destructive action. 

Ack Mode:

Nack message requeue true
Encoding:

Auto string / base64
 
Messages:
1
Delete
Purge
Runtime Metrics (Advanced)




