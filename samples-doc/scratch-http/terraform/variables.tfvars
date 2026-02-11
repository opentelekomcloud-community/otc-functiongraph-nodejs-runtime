# prefix of all resources
prefix        = "nodejs"

# name of the function (will be prefixed)
function_name = "nodejs-doc-sample-http"

# name of zip file to deploy
zip_file_name = "deploy.zip"

# resources will be tagged with this app_group tag
tag_app_group = "nodejs-doc-sample-http"

# change to your API Gateway instance ID
# set as env var TF_VAR_API_GATEWAY_INSTANCE_ID or uncomment and set here
#API_GATEWAY_INSTANCE_ID="YOUR_API_GATEWAY_INSTANCE_ID"