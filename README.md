# Shardrealms App - Front-end

## Introduction

Shardrealms is an alternative to D&D.  The idea is to have all character sheets, references sheet, and Game Master (GM) guides and tools located on a convenient and helpful application.

## Setup

To setup the app on your local machine, make sure to have `NPM` and `Node.js` installed.  You can [download it here](https://nodejs.org/en/download/).

Next, in the root directory of the repo, run `npm install`.

For safe measure, also run `npm run typings install`.

If you run into an error, something is wrong.  Depreciation warnings are expected.

## Develop

### Running the lite server

You can run an instance on your local machine by first following **Setup**, then running `npm start`.  This will start the lite server and a live instance in your local browser.

This will also convert all the Typescript files into Javascript files.  These files are inconveniently added to the same directory, adding 3x the files.  I'd recommend hiding `.js` files in your text editor while working on Shardrealms, as to not accidentally develop is a rendered `.js` file instead of the true Typescript file.

### File Structure

* `index.html` is the initial file requested by the browser.  This file requests all other dependencies and begins the Angular application.
* `package.json` contains all the dependencies for the project, along with the command line scripts that can be ran.
* `app/` contains the Angular Application.
    * `app/components` contains the components of the Angular app.
        * `app/components/root-container.component.ts` is the main component of the app.  All other components are loaded from it.  Components link the HTML templates to data, and perform simple manipulation of the data to alter the view.
    * `app/interfaces/` are Typescript objects with strict types.  They are mostly ignored for now, as we mostly only use Typescript to construct the Angular component templates.
    * `app/services/` contains the logic of anything not related to simply updating the view.  All API calls should be done in a service.  Any intensive service method should be asynchronous.
    * `app/styles/clean-tone.css` is the CSS styling for the app.  Once the styling is more finalized, we will switch to SASS or LESS instead of CSS.
    * `app/views/` contains the HTML templates that map to the Angular component that the template is bound to (notice how the names pair with a component).
    * `app/app.component.ts` is the true root component.  However, it simply wraps `app/components/root-container.component.ts`.
    * `app/app.module.ts` bootstraps `app/app.component.ts` as well as other Angular libraries.
    * `app/main.ts` begins the bootstrapping process.
* `jsons/` contains the "hard-coded" database of all JSON objects referenced in the app.  These should eventually be moved to a noSQL database.
* `images/` is not in the repo, as it contains copyrighted images taken from all across the Internet. However, `images` is referred to by several `json` files.  Ignore these references.
* All other files and folders are for compiling Typescript or dependencies for Angular.

### Debugging

Debugging is quit simple.  Add a `debugger;` statement to a component or service where you'd like a breakpoint.

In the live view on the browser (assuming a Chrome browser), open the developer tools.  When the debugger statement is hit, the **Sources** tab will open and reveal the breakpoint, pausing the run of the Javascript and converting the code back into Typescript for your viewing convenience.

## Contribute

There are two main ways to contribute: [fix outstanding issues](https://github.com/rhyeen/shardrealms_ng2/issues) or [check the wiki](https://github.com/rhyeen/shardrealms_ng2/wiki/) for possible tasks.  Either way, when a task is completed and ready to be merged back into the master repo branch, [create a pull request](https://github.com/rhyeen/shardrealms_ng2/pulls) for the core team to review and merge.

If you plan to contribute to the tasks found in the Wiki, please contact the core team at *shardrealms@gmail.com*.  We'd like to provide you with the project management tools and expertise to help your development.  We would also like to coordinate with you to ensure we work together in unison and towards the desired end result.