SHELL := /bin/bash

build:
	npm install --install-links

zip: build
	npm pack

test_local:
  # execute a curl 
	curl -X POST \
	-H "X-Cff-Request-Id: $(shell uuidgen)" \
	-H "X-Cff-Func-Name: 0@default@nodejs-doc-sample-http" \
	-H "X-Cff-Func-Version: latest" \
	-H "X-Cff-Func-Timeout: 30" \
	-H 'Content-Type: application/json' \
	-d '{"key":"Hello World of FunctionGraph"}' \
	 localhost:8000/index
	@echo ""

.PHONY: zip test_local build