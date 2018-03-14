# Gotagme - Tag Your Friends on Flickr

Gotagme allows Twitter users to tag other Twitter users in flickr photos. This can help faciliate
getting photographs taken of people at conventions to the subjects of those images. Images can be
tagged with either a Twitter user or a specific costume if it has been added to the database.

~~You can visit the website at https://gotag.me/~~ *(Not available)*

# Code Structure
Gotagme is a MEAN stack single-page application. It is divided into the `client` and `server`
components, each in their own folder. Each component runs independently in its own process.

The `server` component is implemented as a RESTful API using Node, Express, and MongoDB. It is
currently being actively developed by @chrisdouglass.

The `client` component is an Angular 2 project. @chrisdouglass plans to work on this as soon as the
backend is fully written and tested.

# Setting Up the Environment on macOS 10.13
*Currently these instructions only work for the backend. As development shifts to the frontend, this
document will be updated with client instructions.*
1. Clone the repository. Open Terminal to the directory.
2. Install `brew` if not already installed *(or use your favorite package manager at your own
peril)*.

    *You can install brew by visiting https://brew.sh/*
3. Run the following to get your environment configured (you can ignore after the #):

    ```
    # Basic Global Environment Setup
    brew install node     # You could alternatively use nvm to manage multiple versions of Node.
    brew install yarn     # The required package manager for Node.
    brew install nodemon  # Allows you to run services which automatically refresh on save.

    # Server Setup
    cd server/
    yarn install          # Installs all server dependencies.
    ```
4. In the base of the server folder, rename `.env.template` to `.env` and fill in the required
information.

# Local Development Servers
## Backend
In the `server` directory:
1. `yarn compile`
2. `yarn dev`

The RESTful API will now be available at `http://localhost:3000/api`.

# Unit Testing
## Backend
Running `yarn watchtest` will start a watching process which runs all unit tests on any file change.

# Submitting a Pull Request
***Pull requests are welcome!*** We have tons of work remaining. If you're adept at typescript, send
a message to @chrisdouglass.
***Before submitting a PR, you must run the following commands on the code you are submitting:***

    npx gts check # Use Google TypeScript tslint. Fix all warnings and errors before submission.
    npx gts fix   # Code must be formatted using the Google TypeScript clang-format.
