# prefix of all resources
prefix        = "nodejs"

# description of the function
description = "Sample scratch-http"

# name of the function (will be prefixed)
function_name = "scratch-http"

# name of zip file to deploy
zip_file_name = "package.zip"

# resources will be tagged with this app_group tag
tag_app_group = "scratch-http"

# change to your API Gateway instance ID
# set as env var TF_VAR_API_GATEWAY_INSTANCE_ID or uncomment and set here
#API_GATEWAY_INSTANCE_ID="YOUR_API_GATEWAY_INSTANCE_ID"
