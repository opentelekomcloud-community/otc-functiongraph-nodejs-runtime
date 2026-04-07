SHELL:=/bin/bash
DOCKER_FILE:=Dockerfile

mkfile_path:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))


IMAGE_NAME=dependencyeuleros

build: clean

docker_build: 
	docker buildx build \
		--file $(DOCKER_FILE) \
		--tag $(IMAGE_NAME):latest .

docker_push: docker_build
  # see: https://docs.otc.t-systems.com/software-repository-container/umn/image_management/obtaining_a_long-term_valid_login_command.html#swr-01-1000
	docker login -u $(OTC_SDK_PROJECTNAME)@$(OTC_SDK_AK) -p $(OTC_SWR_LOGIN_KEY) $(OTC_SWR_ENDPOINT)
	docker tag $(IMAGE_NAME):latest $(OTC_SWR_ENDPOINT)/$(OTC_SWR_ORGANIZATION)/$(IMAGE_NAME):latest
	docker push $(OTC_SWR_ENDPOINT)/$(OTC_SWR_ORGANIZATION)/$(IMAGE_NAME):latest

docker_all: build docker_build docker_push

test_it:
	docker run \
	  --user 1000:1000 \
	  --mount type=bind,src=$(abspath $(mkfile_path))/../..,dst=/home/code/vscode \
		--rm -it $(IMAGE_NAME):latest

test_c:
	docker run \
	  --user 1000:1000 \
	  --mount type=bind,src=$(abspath $(mkfile_path)),dst=/home/code/vscode \
		--rm $(IMAGE_NAME):latest \
		bash -c "cd /home/code/vscode && echo "test" > txt.txt && ls -ll"


all: build docker_build

.PHONY: build docker_build docker_push docker_all test
