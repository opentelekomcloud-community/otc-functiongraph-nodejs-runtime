# npm-scripts

Folder contains sample scripts to be used in package.json script section.

## postpack

To create deployment packages, use 

```bash
npm pack
```
this will honor your settings in following sections

```json
{
  "bundleDependencies": [
     "dependency_to_bundle_1",
     "dependency_to_bundle_2"
  ],
  "files": [
    "src/**/*",
     "*.js",
     "bootstrap"
  ]
}
```
of package.json for packaging.

But as npm pack creates a tar package but FunctionGraph expects zip format, the tar has to repacked to a zip.

The script "postpack" will handle this (see [scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts) in npm documentation).

For Windows and Linux, you will find following scripts, that will handel this repackaging.

- **postpack.cmd**
  can be used as "postpack" script for Windows shell

  ```json
  {
    "scripts": {
       "postpack": "postpack.cmd",
    }
  }      
  ```

- **postpack.sh**
  can be used as "postpack" script in bash

  ```json 
  {
    "scripts": {
       "postpack:linux": "bash ../npm-scripts/postpack.sh"
    }
  }  
    
  ```

or you can use an os independent approach by using [run-script-os]https://github.com/charlesguse/run-script-os):

```json
{
  "scripts": {
     "postpack": "run-script-os",
     "postpack:windows": "..\\npm-scripts\\postpack.cmd",
     "postpack:linux": "bash ../npm-scripts/postpack.sh"
  },
  "devDependencies": {
     "run-script-os": "^1.1.6",    
  }

}

