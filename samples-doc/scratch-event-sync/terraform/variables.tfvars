# Terraform variables for scratch-event-sync sample

# prefix of all resources
prefix        = "nodejs"

# description of the function
description = "Sample scratch-event-sync"

# name of the function (will be prefixed)
function_name = "scratch-event-sync"

# handler function name defined in your code, e.g. "index.handler"
handler_name = "src/index.handler"

# initializer function name defined in your code, e.g. "index.initializer"
initializer_name = "src/index.initializer"

# name of zip file to deploy
zip_file_name = "scratch-event-sync.zip"

# resources will be tagged with this app_group tag
tag_app_group = "scratch-event-sync"
