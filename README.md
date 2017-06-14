# Shardrealms App - Front-end

## Introduction

Please see the parent repository, [sr_creation](https://github.com/rhyeen/sr_creation) for more details.

## Localized Setup

To setup the app on your local machine, make sure to have `NPM` and `Node.js` installed.  You can [download it here](https://nodejs.org/en/download/).

Next, in the root directory of the repo, run `npm install`.

For safe measure, also run `npm run typings install`.

If you run into an error, something is wrong.  Depreciation warnings are expected.

## Dockerized Setup

If you wish to have the Angular client-server instead run on a Docker container instead of on your local machine, you can do so.

We recommend trying to run using **Localized Setup**, just because it's easier to debug and develop.

### Pre-requisites

You must have Docker installed to run the server within a Docker container. Check the official [Docker Installation Guide](https://docs.docker.com/engine/installation/) if it isn't installed on your machine.

### Running container

To start or stop the client-server, build the sr-ng2 image and run it:

```bash
make build
make run-dev
```

You should now have a client-server reachable at localhost:3000.

## Develop

### Running the lite server

You can run an instance on your local machine by first following **Setup**, entering into the app directory (`cd app`), then running `npm start`.  This will start the lite server and a live instance in your local browser.

This will also convert all the Typescript files into Javascript files.  These files are inconveniently added to the same directory, adding 3x the files.  I'd recommend hiding `.js` files within the `src/app` directory in your preferred text editor/IDE while working on Shardrealms, as to not accidentally develop in a rendered `.js` file instead of the true Typescript file.

### Debugging

Debugging is quit simple.  Add a `debugger;` statement to a component or service where you'd like a breakpoint.

In the live view on the browser (assuming a Chrome browser), open the developer tools.  When the debugger statement is hit, the **Sources** tab will open and reveal the breakpoint, pausing the run of the Javascript and converting the code back into Typescript for your viewing convenience.

## Contribute

There are two main ways to contribute: [resolve outstanding issues](https://github.com/rhyeen/sr_creation/issues) or [check the projects](https://github.com/rhyeen/sr_creation/projects) for possible tasks.  Either way, when a task is completed and ready to be merged back into the master repo branch, [create a pull request](https://github.com/rhyeen/shardrealms_ng2/pulls) for the core team to review and merge.

Note that issues and project tracking are done on the parent repo: [sr_creation](https://github.com/rhyeen/sr_creation)

If you plan to contribute to the tasks found in the Project list, please contact the core team at *shardrealms@gmail.com*.  We'd like to provide you with the project management tools and expertise to help your development.  We would also like to coordinate with you to ensure we work together in unison and towards the desired end result.