SHELL := /bin/bash

zip:
	rm -f deploy.zip
	# zip all file in src folder
	cd src && zip -r ../deploy.zip .
	
	# if node_modules folder exists, zip it as well
	if [ -d "./node_modules" ]; then \
		zip -r ./deploy.zip ./node_modules; \
	fi

.PHONY: zip