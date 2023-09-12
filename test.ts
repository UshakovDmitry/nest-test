17:32:45 Collecting changes in 1 VCS root
17:32:45   VCS Root details
17:32:45     "http://bitbucket.next.local/scm/vue/alser.dispatcherworkplaceui.git#refs/heads/master" {instance id=228, parent internal id=207, parent id=DispatcherWorkPlaceUI_HttpBitbucketNextLocalScmVueAlserDispatcherworkplaceuiGitRefsHeadsMaster, description: "http://bitbucket.next.local/scm/vue/alser.dispatcherworkplaceui.git#refs/heads/master"}
17:32:45   Compute revision for 'http://bitbucket.next.local/scm/vue/alser.dispatcherworkplaceui.git#refs/heads/master
17:32:45     Upper limit revision: df07ebb534d862235fa328400d50feeb09b19557
17:32:45     The first revision that was detected in the branch refs/heads/master: 3c74bfe34ac99dc6cf89626566fabd8108638407
17:32:45     The first revision that was detected in the branch refs/heads/master after the last change of the VCS root or checkout rules: 3c74bfe34ac99dc6cf89626566fabd8108638407
17:32:45     Latest commit attached to build configuration (with id <= 12123): df07ebb534d862235fa328400d50feeb09b19557
17:32:45     Computed revision: df07ebb534d862235fa328400d50feeb09b19557
17:32:45 The build is removed from the queue to be prepared for the start
17:32:45 Starting the build on the agent "agent2023.05.2-3"
17:32:46 Updating tools for build
17:32:46   Tools are not required for the build
17:32:46 Clearing temporary directory: /opt/buildagent/temp/buildTmp
17:32:46 Publishing internal artifacts
17:32:46   Publishing 1 file using [WebPublisher]
17:32:46   Publishing 1 file using [ArtifactsCachePublisherImpl]
17:32:46 Clean build enabled: removing old files from /opt/buildagent/work/ed05d3ddad573f11
17:32:46 Checkout directory: /opt/buildagent/work/ed05d3ddad573f11
17:32:46 Updating sources: auto checkout (on agent)
17:32:46   Will use agent side checkout
17:32:46   Full checkout enforced. Reason: ["Delete all files before the build" turned on]
17:32:46   VCS Root: http://bitbucket.next.local/scm/vue/alser.dispatcherworkplaceui.git#refs/heads/master
17:32:47 Step 1/6: Docker Build frontend (Docker)
17:32:47   Starting: docker build -t dockeregistry.next.local/tms:latest -t dockeregistry.next.local/tms:1.0.10 -f Dockerfile .
17:32:47   in directory: /opt/buildagent/work/ed05d3ddad573f11/frontend
17:32:48   Sending build context to Docker daemon  9.799MB
17:32:48   
17:32:48   Step 1/13 : FROM node:19-alpine as builder
17:32:48    ---> e2a8cc97f817
17:32:48   Step 2/13 : WORKDIR /vue-tms
17:32:48    ---> Using cache
17:32:48    ---> 684ad30e6678
17:32:48   Step 3/13 : COPY package*.json ./
