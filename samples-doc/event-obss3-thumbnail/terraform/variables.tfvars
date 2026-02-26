# prefix of all resources
prefix = "nodejs"

# description of the function
description = "Sample event-obss3-thumbnail"

# name of the function (will be prefixed)
function_name = "event-obss3-thumbnail"

# handler function name defined in your code, e.g. "index.handler"
handler_name = "src/s3thumbnail.handler"

# initializer function name defined in your code, e.g. "index.initializer"
initializer_name = "src/s3thumbnail.initializer"

# name of zip file to deploy
zip_file_name = "package.zip"

# resources will be tagged with this app_group tag
tag_app_group = "event-obss3-thumbnail"
