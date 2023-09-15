
Virtual Host	Name	Pattern	Apply to	Definition	Priority
/	ha-fed	.*	all	
federation-upstream-set:	all
ha-mode:	exactly
ha-params:	5
ha-sync-mode:	automatic
message-ttl:	3465687905
1
/	ha-fed3	vfr.*	queues	
ha-mode:	nodes
ha-params:	rabbithvclow1@dkrclstrnd1
rabbithvchi1@dkrclstrnd2
rabbitvmware1@dkrclstrnd3
ha-sync-mode:	automatic
3
