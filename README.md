# Sync Classes Connector

This small service allows you to connect queues to [Taskforce](https://taskforce.sh) acting as a proxy between your queues and the UI. It is useful for connecting local development queues as well as production grade queues without the need of sharing passwords or establishing SSH tunnels.

Currently the connector supports [Bull](https://github.com/optimalbits/bull) queues, with more to come in later
releases.

The connector is designed to be lightweight and using a minimal set of resources from the local queues.

## Install

# Local

```bash
sudo npm install -g .
```

Using [yarn](https://yarnpkg.com)

```bash
yarn global add sync-classes

```

Using npm:

```bash
npm install -g sync-classes
```

## Usage

Call the tool and get a help on the options:

```bash
✗ taskforce --help

  Usage: taskforce [options]


  Options:

    -V, --version               output the version number
    -n, --name [name]           connection name [My Connection] (default: "My Connection")
    -f, --file [file]          class file
    -h, --help                  output usage information
```

Example:

```bash
✗ sync-class -n "Demo Class" -f DemoClass.ts
```

Note: You can also specify the following with environment variables.

```bash
file      FILE
```
