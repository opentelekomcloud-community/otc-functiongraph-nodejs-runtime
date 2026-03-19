# dependency-postgres-sample

This sample demonstrates use of FunctionGraph usage of dependencies with postgres.

## Prerequisites

### On T Public Cloud

- Postgres RDS Instance
  Following variables will be used:
  - Hostname: PGHOST
  - Port: PGPORT
  - Username: PGUSER
  - Password: PGPASSWORD
- VPC/Subnet (ECS-Instance and FunctionGraph)
- ECS Instance for Database management connected to RDS Instance
- Agency with `VPC Full Access` permission


### Load sample data into postgres database

In this sample we use sample data from https://github.com/neondatabase/postgres-sample-dbs

To load data into database using ECS instance, use following commands:

```bash
# update system
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/postgres.list'

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add - 

sudo apt-get update 

# install postgres-client if not already installed:
sudo apt-get install -y postgresql-client-common

# install correct version, depending on your RDS installation (here 17)
sudo apt-get install -y postgresql-client-17

```

```bash
# use postgres env variable for password
export PGPASSWORD=${PGPASSWORD}

# create database netflix using psql
psql --host ${PGHOST} \
  --username ${PGUSER} \
  --port ${PGPORT} \
  --dbname postgres \
  --command "CREATE DATABASE netflix;"
```

```bash
# download data
wget https://raw.githubusercontent.com/neondatabase/postgres-sample-dbs/main/netflix.sql
#import data
psql -d "postgres://${PGUSER}@${PGHOST}/netflix" -f netflix.sql
```


```bash
# test if data has been loaded:
psql -d "postgres://${PGUSER}@${PGHOST}/netflix" \
  --command "select count(*) from netflix_shows;"

```

result should be like:

```text
 count
-------
 8807
(1 row)
```

### Create and install dependency library

Create FunctionGraph dependency for postgres using description in [dependency-postgres](../dependency-postgres/README.md) project.

Choose following values when creating dependency:

| Property         | Value 
| ----------       | ---------- 
| Name             | postgres-dependency
| Runtime          | Node.js 20.15
| Code Entry Mode  | Upload ZIP

And upload file using ``Add``

## Samples

In FunctionGraph Console:

* Use `Create With` `Create from scratch`
* Function Type: `Event Function`
* Region: \<your region\>
* Function Name: \<your functionname\>
* Agency: Specify an agency with `VPC Full Access`
* Runtime: `Node.js 20.15` (same as above)

-> `Click Create Function`

In `Configuration` -> `Environment Variables` add following 
variables

|Key          |  Value   |  Encrypted
| -----       | -----    | -----
| PGHOST     | RDS value for hostname  |
| PGPORT     | RDS value for port      |
| PGUSER     | RDS value for username  |
| PGPASSWORD | RDS value for password  | **enabled**
| PGDATABASE | netflix                 |

In `Configuration` -> `Network`
* VPC Access: enable
* VPC: VPC used for RDS instance
* Subnet: Subnet used for RDS instance

### Sample 1: index.js

This sample queries data from database creating a client each time.

Copy code [index.js](./src/index.js) in the code field.

In `Configuration` -> `Basic Settings` 
* Handler: **index.handler**
  
In `Configuration` -> `Lifecyle` 
* Initialization: **enable**
* Function Initializer: **index.initializer**

Create any test event and click `Test`.

### Sample 2: index_usepool.js

This sample queries data from database using a connection pool.

Copy code [index_usepool.js](./src/index_usepool.js) in the code field.

In `Configuration` -> `Basic Settings` 
* Handler: **index_usepool.handler**
  
In `Configuration` -> `Lifecyle` 
* Initialization: **enable**
* Function Initializer: **index_usepool.initializer**

Create any test event and click `Test`.
