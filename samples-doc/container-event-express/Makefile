SHELL:=/bin/bash
TARGET_PATH=target
DOCKER_FILE=Dockerfile

IMAGE_NAME=custom_container_event_express_nodejs


build: clean

docker_build: 
	docker buildx build \
	  --platform linux/amd64 \
		--file $(DOCKER_FILE) \
		--tag $(IMAGE_NAME):latest .

docker_run_local:
	docker container run \
	  --rm \
		--platform linux/amd64 \
		--publish 8000:8000 \
		--user 1003:1003 \
		--name $(IMAGE_NAME) \
		$(IMAGE_NAME):latest

docker_push: docker_build
  # see: https://docs.otc.t-systems.com/software-repository-container/umn/image_management/obtaining_a_long-term_valid_login_command.html#swr-01-1000
	docker login -u $(OTC_SDK_PROJECTNAME)@$(OTC_SDK_AK) -p $(OTC_SWR_LOGIN_KEY) $(OTC_SWR_ENDPOINT)
	docker tag $(IMAGE_NAME):latest $(OTC_SWR_ENDPOINT)/$(OTC_SWR_ORGANIZATION)/$(IMAGE_NAME):latest
	docker push $(OTC_SWR_ENDPOINT)/$(OTC_SWR_ORGANIZATION)/$(IMAGE_NAME):latest

docker_all: build docker_build docker_push

test_local:
  # execute a curl 
	curl -X POST \
	-H "X-Cff-Request-Id: $(shell uuidgen)" \
	-H "X-Cff-Func-Name: 0@default@sample-container-event-express" \
	-H "X-Cff-Func-Version: latest" \
	-H "X-Cff-Func-Timeout: 30" \
	-H 'Content-Type: application/json' \
	-d '{"key":"Hello World of FunctionGraph"}' localhost:8000/invoke
	@echo ""

clean:
	rm -rf $(TARGET_PATH)

all: build docker_build

.PHONY: build run_local docker_build docker_run_local docker_push docker_all test_local clean
