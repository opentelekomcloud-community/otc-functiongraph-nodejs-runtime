# Terraform variables for scratch-event-async sample

# prefix of all resources
prefix        = "nodejs"

# description of the function
description = "Sample scratch-event-async"

# name of the function (will be prefixed)
function_name = "scratch-event-async"

# handler function name defined in your code, e.g. "index.handler"
handler_name = "src/index.handler"

# initializer function name defined in your code, e.g. "index.initializer"
initializer_name = "src/index.initializer"

# name of zip file to deploy
zip_file_name = "package.zip"

# resources will be tagged with this app_group tag
tag_app_group = "scratch-event-async"

# change to your API Gateway instance ID
# set as env var TF_VAR_API_GATEWAY_INSTANCE_ID or uncomment and set here
#API_GATEWAY_INSTANCE_ID="YOUR_API_GATEWAY_INSTANCE_ID"
