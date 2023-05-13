# Sync Classes Connector

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
✗ sync-classes --help

  Usage: sync-classes [options]


  Options:

    -V, --version               output the version number
    -n, --name [name]           connection name [My Connection] (default: "My Connection")
    -f, --file [file]           class file
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
