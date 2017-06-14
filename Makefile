### Edit these variables ###
IMG_NAME=ng2
PORT=3000
TAG=latest
VOLUME_TO_MOUNT=$(shell pwd)
SET_NODE_ENV=dev
### End of edit ###

IMG=sr_creation/$(IMG_NAME)
CONTAINER=$(IMG_NAME)
RUN_OPTIONS=-p $(PORT):$(PORT)

build:
	docker build -t $(IMG):$(TAG) .

run-enter: rm
	docker run -it $(RUN_OPTIONS) --name $(CONTAINER) -v $(VOLUME_TO_MOUNT)/app:$(VOLUME_DESTINATION)/app -e ENVIRONMENT=dev $(IMG):$(TAG) /bin/bash

run-dev: rm
	docker run -it -d $(RUN_OPTIONS) --name $(CONTAINER) -v $(VOLUME_TO_MOUNT)/app:$(VOLUME_DESTINATION)/app -e ENVIRONMENT=dev $(IMG):$(TAG) /run_dev.sh

run-prod: rm
	docker run -d $(RUN_OPTIONS) --name $(CONTAINER) -e ENVIRONMENT=prod $(IMG):$(TAG)

push:
	docker push $(IMG):$(TAG)

rm:
	docker rm -f $(CONTAINER) || true

enter:
	docker exec -it $(CONTAINER) /bin/bash