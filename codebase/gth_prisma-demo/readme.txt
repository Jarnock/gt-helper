Setup Instructions

Welcome, and thanks for using Gathertown Helper, the Gathertown websocket
extension helper

---------------------------------------------------------------------

Requirements

Nodejs
TSC

---------------------------------------------------------------------

Terminal Commands

npm install     :   Load all default modules.
npm run watch   :   Begin TSC real-time compile.
npm run start   :   Launch the extension.

---------------------------------------------------------------------

Structure (Default)

|package.json
|package-lock.json (created by npm install)
|tsconfig.json
|.gitignore (set to ignore config files to protect sensitive info)
|.env
|src
    |config
        |config.ts (holds API key and space urls)
    |functions
        |connection.ts (functions to create and control connections)
        |subscriptions.ts (set up subscriptions and actions here)
|dist (empty prior to compile)
    |config
        |config.js
    |functions
        |connection.js
        |subscriptions.js

---------------------------------------------------------------------

Modules

@gathertown/gather-game-client  * Base Gathertown websocket package
isomorphic-ws                   * Needed for Gathertown websocket connection
dotenv                          * To access local environment variables
@types/node                     * Imports node types for TS

---------------------------------------------------------------------