# Terraform variables for scratch-event-sync sample

# prefix of all resources
prefix        = "nodejs"

# name of the function (will be prefixed)
function_name = "nodejs-doc-sample-sdk-obs"

# handler function name defined in your code, e.g. "index.handler"
handler_name = "index.handler"

# initializer function name defined in your code, e.g. "index.initializer"
initializer_name = "index.initializer"

# name of zip file to deploy
zip_file_name = "deploy.zip"

# resources will be tagged with this app_group tag
tag_app_group = "nodejs-doc-sample-sdk-obs"
