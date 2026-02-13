HANDLER_NAME=example

build:
	npm install --omit=dev

zip: build
	rm -f deploy.zip
	# zip all file in target folder
	cd src && zip -r ../deploy.zip .
	zip -r deploy.zip node_modules
	
.PHONY: zip build