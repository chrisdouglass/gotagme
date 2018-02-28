# Gotagme

Gotagme allows Twitter users to tag other Twitter users in flickr photos.

# Code Structure
Gotagme is divided into a `client` and `server` components, each in their own folder. Each component
runs independently in its own process. The `project` directory contains resources related to the
project.

# Getting Started
1. Clone the repository.
2. Install `node` and `yarn`. Also install `mongodb` if you want to run the backend.
3. In each of the client and server directories, run `yarn install`.
4. Start the client and/or server instances with the instructions below.

# Local Development Servers
## Backend
In the `server` directory, create an `.env` file containing your flickr/Twitter API keys and MongoDB
credentials. Then run:
1. `yarn compile`
2. `yarn dev`

The server will now be available at `http://localhost:3000/api`.

## Client
In the `client` directory:
1. `yarn start`

The client will now be available at `http://localhost:4200`.
