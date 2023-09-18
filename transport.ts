Step 3/6: Docker Push frontend image to the local dockeregistry (Docker)
14:22:13   Starting: /bin/sh -c docker push  dockeregistry.next.local/tms:latest && docker push  dockeregistry.next.local/tms:1.0.16
14:22:13   in directory: /opt/buildagent/work/ed05d3ddad573f11
14:22:13   The push refers to repository [dockeregistry.next.local/tms]
14:22:14   148f10f63bb0: Preparing
14:22:14   39904dbf304a: Preparing
14:22:14   0c817ef6082f: Preparing
14:22:14   abaf9665d5d7: Preparing
14:22:14   6ec20fc79771: Preparing
14:22:14   6f2a9eaf22e9: Preparing
14:22:14   b938c7b9f1b5: Preparing
14:22:14   de91f65bcbc4: Preparing
14:22:14   ba960ae476af: Preparing
14:22:14   604cbedf1215: Preparing
14:22:14   36b50b131297: Preparing
14:22:14   b938c7b9f1b5: Waiting
14:22:14   de91f65bcbc4: Waiting
14:22:14   ba960ae476af: Waiting
14:22:14   604cbedf1215: Waiting
14:22:14   36b50b131297: Waiting
14:22:14   6f2a9eaf22e9: Waiting
14:22:14   abaf9665d5d7: Layer already exists
14:22:14   6ec20fc79771: Layer already exists
14:22:14   6f2a9eaf22e9: Layer already exists
14:22:14   b938c7b9f1b5: Layer already exists
14:22:14   de91f65bcbc4: Layer already exists
14:22:14   ba960ae476af: Layer already exists
14:22:14   604cbedf1215: Layer already exists
14:22:14   36b50b131297: Layer already exists
14:22:14   39904dbf304a: Pushed
14:22:14   0c817ef6082f: Pushed
14:22:14   148f10f63bb0: Pushed
14:22:14   latest: digest: sha256:5c46b8a7a9d27ffe0e70fff55565a614aaa68771936f779eddd15295d31fd0f8 size: 2614
14:22:14   The push refers to repository [dockeregistry.next.local/tms]
14:22:14   148f10f63bb0: Preparing
14:22:14   39904dbf304a: Preparing
14:22:14   0c817ef6082f: Preparing
14:22:14   abaf9665d5d7: Preparing
14:22:14   6ec20fc79771: Preparing
14:22:14   6f2a9eaf22e9: Preparing
14:22:14   b938c7b9f1b5: Preparing
14:22:14   de91f65bcbc4: Preparing
14:22:14   ba960ae476af: Preparing
14:22:14   604cbedf1215: Preparing
14:22:14   36b50b131297: Preparing
14:22:14   b938c7b9f1b5: Waiting
14:22:14   de91f65bcbc4: Waiting
14:22:14   ba960ae476af: Waiting
14:22:14   604cbedf1215: Waiting
14:22:14   36b50b131297: Waiting
14:22:14   6f2a9eaf22e9: Waiting
14:22:14   abaf9665d5d7: Layer already exists
14:22:14   6ec20fc79771: Layer already exists
14:22:14   148f10f63bb0: Layer already exists
14:22:14   0c817ef6082f: Layer already exists
14:22:14   39904dbf304a: Layer already exists
14:22:14   6f2a9eaf22e9: Layer already exists
14:22:14   de91f65bcbc4: Layer already exists
14:22:14   b938c7b9f1b5: Layer already exists
14:22:14   604cbedf1215: Layer already exists
14:22:14   ba960ae476af: Layer already exists
14:22:14   36b50b131297: Layer already exists
14:22:14   1.0.16: digest: sha256:5c46b8a7a9d27ffe0e70fff55565a614aaa68771936f779eddd15295d31fd0f8 size: 2614
14:22:14   Process exited with code 0
14:22:14   Removing pushed images/tags from build agent: dockeregistry.next.local/tms:latest dockeregistry.next.local/tms:1.0.16
14:22:14 Step 4/6: Docker Push backendimage to the local dockeregistry (Docker)
14:22:14   Starting: /bin/sh -c docker push  dockeregistry.next.local/tmsbe:latest && docker push  dockeregistry.next.local/tmsbe:1.0.16
14:22:14   in directory: /opt/buildagent/work/ed05d3ddad573f11
14:22:14   The push refers to repository [dockeregistry.next.local/tmsbe]
14:22:14   6587b6ba5c56: Preparing
14:22:14   bef94bee3b63: Preparing
14:22:14   28c79508e400: Preparing
14:22:14   5876e12ff81f: Preparing
14:22:14   4786c17facc0: Preparing
14:22:14   e3309a13ca09: Preparing
14:22:14   7644ba7de234: Preparing
14:22:14   852b3112f6d8: Preparing
14:22:14   4619547fc86c: Preparing
14:22:14   e394b5a78515: Preparing
14:22:14   9b2d5af7f709: Preparing
14:22:14   b240fe81adaa: Preparing
14:22:14   bb01bd7e32b5: Preparing
14:22:14   852b3112f6d8: Waiting
14:22:14   9b2d5af7f709: Waiting
14:22:14   4619547fc86c: Waiting
14:22:14   e394b5a78515: Waiting
14:22:14   b240fe81adaa: Waiting
14:22:14   bb01bd7e32b5: Waiting
14:22:14   e3309a13ca09: Waiting
14:22:14   7644ba7de234: Waiting
14:22:14   bef94bee3b63: Pushed
14:22:14   28c79508e400: Pushed
14:22:14   7644ba7de234: Pushed
14:22:15   6587b6ba5c56: Pushed
14:22:15   4619547fc86c: Pushed
14:22:15   e394b5a78515: Layer already exists
14:22:15   852b3112f6d8: Pushed
14:22:15   9b2d5af7f709: Layer already exists
14:22:15   b240fe81adaa: Layer already exists
14:22:15   bb01bd7e32b5: Layer already exists
14:22:15   5876e12ff81f: Pushed
14:22:29   4786c17facc0: Pushed
14:22:54   e3309a13ca09: Pushed
14:22:54   latest: digest: sha256:2acc3d39b2b871a672287fa36e993f8d491538ed9780748eedf83ed6c11234f7 size: 3045
14:22:54   The push refers to repository [dockeregistry.next.local/tmsbe]
14:22:54   6587b6ba5c56: Preparing
14:22:54   bef94bee3b63: Preparing
14:22:54   28c79508e400: Preparing
14:22:54   5876e12ff81f: Preparing
14:22:54   4786c17facc0: Preparing
14:22:54   e3309a13ca09: Preparing
14:22:54   7644ba7de234: Preparing
14:22:54   852b3112f6d8: Preparing
14:22:54   4619547fc86c: Preparing
14:22:54   e394b5a78515: Preparing
14:22:54   9b2d5af7f709: Preparing
14:22:54   b240fe81adaa: Preparing
14:22:54   bb01bd7e32b5: Preparing
14:22:54   e3309a13ca09: Waiting
14:22:54   b240fe81adaa: Waiting
14:22:54   e394b5a78515: Waiting
14:22:54   9b2d5af7f709: Waiting
14:22:54   7644ba7de234: Waiting
14:22:54   bb01bd7e32b5: Waiting
14:22:54   852b3112f6d8: Waiting
14:22:54   4619547fc86c: Waiting
14:22:54   4786c17facc0: Layer already exists
14:22:54   5876e12ff81f: Layer already exists
14:22:54   6587b6ba5c56: Layer already exists
14:22:54   bef94bee3b63: Layer already exists
14:22:54   28c79508e400: Layer already exists
14:22:54   e3309a13ca09: Layer already exists
14:22:54   7644ba7de234: Layer already exists
14:22:54   4619547fc86c: Layer already exists
14:22:54   e394b5a78515: Layer already exists
14:22:54   9b2d5af7f709: Layer already exists
14:22:54   852b3112f6d8: Layer already exists
14:22:54   b240fe81adaa: Layer already exists
14:22:54   bb01bd7e32b5: Layer already exists
14:22:54   1.0.16: digest: sha256:2acc3d39b2b871a672287fa36e993f8d491538ed9780748eedf83ed6c11234f7 size: 3045
14:22:54   Process exited with code 0
14:22:54   Removing pushed images/tags from build agent: dockeregistry.next.local/tmsbe:latest dockeregistry.next.local/tmsbe:1.0.16
14:23:01 Step 5/6: Set BUILD_STATUS (Command Line)
14:23:01   Starting: /opt/buildagent/temp/agentTmp/custom_script4303479800056308802
14:23:01   in directory: /opt/buildagent/work/ed05d3ddad573f11
14:23:01   Process exited with code 0
14:23:01 Step 6/6: rollout fast on all prod kubers (SSH Exec)
14:23:01   Permanently added 'alserrke2-l-master270.next.local' (EDDSA) to the list of known hosts.
14:23:01   Executing commands:
  /opt/rancher/rolloutfast.sh alser-tms
  #### Deploing version: 1.0.16 of alser-tms #####
  on host [alserrke2-l-master270.next.local]
14:23:01   ------------------------------------------------
14:23:01   Cluster - AlserRKE2, namespace - alser, redeploing. Всяким мечтам, сулпакам и технодомам таких технологий даже не снилось.
14:23:01   Making rolling update, that designed to update your workloads without downtime.
14:23:01   Pods current status:
14:23:02   NAME                        READY   STATUS    RESTARTS         AGE
14:23:02   alser-tms-5bfdb6977-z4rd2   2/2     Running   13 (6m34s ago)   87m
14:23:02   Deployments current status:
14:23:02   NAME        READY   UP-TO-DATE   AVAILABLE   AGE
14:23:02   alser-tms   1/1     1            1           10d
14:23:02   deployment.apps/alser-tms restarted
14:23:04   Deployment rollout status:
14:23:04   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:23:42   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:23:42   Waiting for deployment spec update to be observed...
14:23:42   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:23:47   deployment "alser-tms" successfully rolled out
14:23:47   ------------------------------------------------
14:23:47   Cluster - AlserRKE2, namespace - cloud - oblako, aws, ps, it-grad, redeploing. Просто cloud, не Дункан Макклауд.
14:23:47   Making rolling update, that designed to update your workloads without downtime.
14:23:47   Pods current status:
14:23:48   NAME                         READY   STATUS    RESTARTS        AGE
14:23:48   alser-tms-64c4547868-zmkbp   2/2     Running   13 (7m4s ago)   88m
14:23:48   Deployments current status:
14:23:48   NAME        READY   UP-TO-DATE   AVAILABLE   AGE
14:23:48   alser-tms   1/1     1            1           10d
14:23:48   deployment.apps/alser-tms restarted
14:23:50   Deployment rollout status:
14:23:50   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:24:16   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:24:16   Waiting for deployment spec update to be observed...
14:24:16   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:24:21   deployment "alser-tms" successfully rolled out
14:24:21   ------------------------------------------------
14:24:21   Cluster - RKE2Alser, namespase - cloud - oblako, aws, ps, it-grad, redeploing. Пока пропускаем.
14:24:21   ------------------------------------------------
14:24:21   Cluster - RKE2Alser, namespase - alser, redeploing. Это CI-CD без говна и палок детка.
14:24:21   Pods current status:
14:24:22   NAME                         READY   STATUS    RESTARTS         AGE
14:24:22   alser-tms-7444674fc9-wxfh7   2/2     Running   13 (6m41s ago)   87m
14:24:22   Deployments current status:
14:24:22   NAME        READY   UP-TO-DATE   AVAILABLE   AGE
14:24:22   alser-tms   1/1     1            1           10d
14:24:22   Making rolling update, that designed to update your workloads without downtime.
14:24:22   deployment.apps/alser-tms restarted
14:24:24   Deployment rollout status:
14:24:24   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:24:49   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:24:49   Waiting for deployment spec update to be observed...
14:24:49   Waiting for deployment "alser-tms" rollout to finish: 0 of 1 updated replicas are available...
14:24:54   deployment "alser-tms" successfully rolled out
14:24:54   BYE-BYE!
14:24:54   ------------------------------------------------
14:24:54   SSH exit-code [0]
14:24:55 Publishing artifacts
14:24:55   Collecting files to publish: [/opt/buildagent/temp/buildTmp/.teamcity/docker/build_16/events.json => .teamcity/docker/]
14:24:55   Publishing 1 file using [WebPublisher]: /opt/buildagent/temp/buildTmp/.teamcity/docker/build_16/events.json => .teamcity/docker
14:24:55   Publishing 1 file using [ArtifactsCachePublisherImpl]: /opt/buildagent/temp/buildTmp/.teamcity/docker/build_16/events.json => .teamcity/docker
14:24:55 Publishing internal artifacts
14:24:55   Publishing 1 file using [WebPublisher]
14:24:55   Publishing 1 file using [ArtifactsCachePublisherImpl]
14:24:55 Build finished
