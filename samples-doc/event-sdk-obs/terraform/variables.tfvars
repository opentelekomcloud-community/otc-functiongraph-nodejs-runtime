# Terraform variables for sdk-obs sample

# prefix of all resources
prefix        = "nodejs"

description = "Sample event-sdk-obs"

# name of the function (will be prefixed)
function_name = "event-sdk-obs"

# handler function name defined in your code, e.g. "index.handler"
handler_name = "src/index.handler"

# initializer function name defined in your code, e.g. "index.initializer"
initializer_name = "src/index.initializer"

# name of zip file to deploy
zip_file_name = "package.zip"

# resources will be tagged with this app_group tag
tag_app_group = "event-sdk-obs"
