SHELL := /bin/bash

zip:
	rm -f deploy.zip
	# zip all file in src folder
	cd src && zip -r ../deploy.zip .

	# if node_modules folder exists, zip it as well
	if [ -d "./node_modules" ]; then \
		zip -r ./deploy.zip ./node_modules; \
	fi

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

.PHONY: zip test_local