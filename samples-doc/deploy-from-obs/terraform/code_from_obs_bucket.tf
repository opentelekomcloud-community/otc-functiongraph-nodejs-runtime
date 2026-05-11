
###################################################################################
# Code bucket to store function code zip file
###################################################################################
resource "opentelekomcloud_obs_bucket" "codebucket" {
  bucket = format("%s-%s", var.prefix, "codebucket")
  acl    = "private"

  tags = {
    "app_group" = var.tag_app_group
  }
}

###################################################################################
# Code bucket object to upload function code zip file
###################################################################################
resource "opentelekomcloud_obs_bucket_object" "code_object" {
  bucket       = opentelekomcloud_obs_bucket.codebucket.bucket
  key          = format("%s/%s", "code", basename(var.zip_file_name))
  source       = var.zip_file_name
  etag         = filemd5(var.zip_file_name)
  content_type = "application/zip"
}

###################################################################################
# Store md5 of zip file in state to trigger update if file changes
###################################################################################
resource "terraform_data" "replacement" {
  input = [
    filemd5(var.zip_file_name)
  ]
}

###################################################################################
# Get X_SUBJECT_TOKEN for User via HTTP POST to IAM Endpoint
# Using a user token does not require to sign requests
# Terraform http provider is used as it supports reading response headers
###################################################################################
data "http" "GET_X_SUBJECT_TOKEN" {
  depends_on = [ opentelekomcloud_fgs_function_v2.MyFunction ]

  url    = format("%s/auth/tokens?nocatalog=true", var.OTC_IAM_ENDPOINT)
  method = "POST"

  request_headers = {
    "Content-Type" = "application/json;charset=UTF-8"
  }

  request_body = jsonencode({
    auth = {
      identity = {
        methods = ["password"],
        password = {
          user = {
            name     = var.OTC_USER_NAME,
            password = var.OTC_USER_PASSWORD,
            domain = {
              name = var.OTC_SDK_DOMAIN_NAME
            }
          }
        }
      },
      scope = {
        domain = {
          name = var.OTC_SDK_DOMAIN_NAME
        },
        project = {
          id = var.OTC_SDK_PROJECTID
        }
      }
    }
  })
}

provider "terracurl" {
  # no configuration required    
}

############################################################################
# Update Function Code via HTTP PUT to FunctionGraph Endpoint
# Terraform terracurl provider is used as it supports PUT method and
# can ignore "409 Conflict" response code.
# (reading response headers is not supported)
#
# see: https://docs.otc.t-systems.com/function-graph/api-ref/api/function_lifecycle_management/modifying_the_code_of_a_function.html#functiongraph-06-0110
############################################################################

resource  "terracurl_request" "update_function_code" {
    name = "UpdateFunctionCode"

  depends_on = [
    opentelekomcloud_fgs_function_v2.MyFunction,
    opentelekomcloud_obs_bucket_object.code_object,
    terraform_data.replacement
  ]

  url = format("%s/v2/%s/fgs/functions/%s:%s/code",
    var.OTC_FGS_ENDPOINT,
    var.OTC_SDK_PROJECTID,
    opentelekomcloud_fgs_function_v2.MyFunction.urn,
  "latest")
  method = "PUT"

  headers = {
    "Content-Type" = "application/json;charset=UTF-8"
    "X-Auth-Token" = data.http.GET_X_SUBJECT_TOKEN.response_headers["X-Subject-Token"]
    "X-Project-Id" = var.OTC_SDK_PROJECTID
  }

  request_body = jsonencode({
    code_filename = basename(var.zip_file_name),
    code_type     = "obs",
    code_url = format("https://%s/code/%s",
      opentelekomcloud_obs_bucket.codebucket.bucket_domain_name,
    basename(var.zip_file_name))
  })

  # Accept response codes 200 (OK) and 409 (Conflict).
  # 409 is returned if trying to replace code with same code.
  # (FSS.0409 The specified resource already exists.)
  response_codes = ["200", "409"]

  lifecycle {
    replace_triggered_by = [
      terraform_data.replacement
    ]
    # ignore changes to headers as X-Auth-Token will change on each run
    ignore_changes = [headers]
  }

}

