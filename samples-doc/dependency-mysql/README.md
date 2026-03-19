# MySQL dependency library for FunctionGraph

Create dependency zip file using:

## Step 1: Install package

Install dependencies as specified in [package.json](./package.json) using:

```
npm install
```

## Step 2: Create dependency zip file

#### On Linux

using `npm pack` with provided `postback` script:

```bash
npm pack
```

or pack all files using `zip`:

```bash
zip -r MySQL-dependency.zip ./node_modules ./package.json ./README.md
```

### On Windows


Using npm script `zip:ps1`

```ps1
npm run zip:ps1
```

or pack all files using powershell command `Compress-Archive`:

```ps1
Compress-Archive .\node_modules\, .\package.json, .\README.md  -DestinationPath MySQL-dependency.zip
```


## Step 3: Upload  dependency to FunctionGraph

Upload dependency file created in *Step 2* to FunctionGraph, 
see [Configuring Dependency Packages](https://docs.otc.t-systems.com/function-graph/umn/configuring_dependencies/configuring_dependency_packages.html) in FunctionGraph User Guide.
