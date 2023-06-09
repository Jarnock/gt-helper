# gt-helper

```console
 _____ _____            _   _      _
|  __ \_   _|          | | | |    | |
| |  \/ | |    ______  | |_| | ___| |_ __   ___ _ __
| | __  | |   |______| |  _  |/ _ \ | '_ \ / _ \ '__|
| |_\ \ | |            | | | |  __/ | |_) |  __/ |
 \____/ \_/            \_| |_/\___|_| .__/ \___|_|
                                    | |
                                    |_|
```

GT Helper is a tool to help developers create new Gather.Town Extensions.

## Usage

`npx gt-helper@latest`

### CLI Interface

The CLI interface will ask you a series of questions to set up your project.

`What is the name of your project?`

This is the name of your project. This will be used to create the folder for your project.

`Do you want to use a database?`

This determines if you will be using a database. If you select `y` or `yes`, you will be asked what ORM you want to use. If you select `n` or `no`, you will not be asked what ORM you want to use.

`What ORM do you want to use?`

This is the ORM you want to use. The options are `none`, `prisma`, or `drizzle`.

`Do you want to enable experimental features?`

This determines if you want to enable experimental features. Currently, this adds an alpha version of a Gather Space backup feature.

### Alternate Method: Additional Arguments

If you do not want to use the CLI interface to set up your project, you can use the following arguments to set up your project.

`npx gt-helper@latest --name <name> --orm <prisma | drizzle> --experimental`

`--name` is the name of your project. This will be used to create the folder for your project.

`--orm` is the ORM you want to use. The options are `prisma` and `drizzle`.

`--experimental` is a flag to enable experimental features. Currently, this adds an alpha version of a Gather Space backup feature.

## Features

- Quick setup for Gather.Town Extensions
- Support for Prisma and Drizzle ORM
- Focus on type safety and ease of use
- Verbose Object and Player classes with type checking, and utility functions for extensions
- Gather Space backup feature (alpha)
- Overt Gather.Town Extension lifecycle, for easy debugging and testing
- Modular helper functions, easy to add your own

### Player Utility Class

The Player Utility Class is a class that extends the Gather.Town Player class. It adds a lot of utility functions to make it easier to work with players in extensions.

### Player Utility Class Functions (Brief Overview)

- Player Status Utilities:

  - `ghost`/`unghost`: control player ghost status
  - `setSpeed`: control player speed

- Player Outfit Utilities:

  - `parseOutfit`: parse outfit string into an object format
  - `updateOutfitString`: update outfit string
  - `updateOutfitJSON`: update outfit via JSON object
  - `updateOutfit`: update outfit via object
  - `getSpriteUrl`: get sprite url for player

- Player Inventory Utilities:
  - `inventory`: get player inventory
  - `getInventoryItem`: get item from player inventory
  - `giveItem`: give item to player
  - `removeItem`: remove item from player

### Object Utility Class

The Object Utility Class is a class that extends the Gather.Town Object class. It adds a lot of utility functions to make it easier to work with objects in extensions.

### Object Utility Class Functions (Brief Overview)

- `GTObjectFactory`

  - Factory style object creation
  - `create`: Object creation
  - `createFromMapObject`: Object creation from Map Object
  - `create_type_[x]`: Object creation by object type
  - `create_[usecase]_object`: Object creation by usecase

- `GTObject`

  - Accessors and Mutators for all Object properties
  - `update`: Update object in game
  - `toString`/`toJSON`: Object export for easy debugging
  - `moveTo`/`moveBy`: Easy object movement

## Example Setup

### Basic Usage with Prisma

Start by running the following command in your terminal. Press Y to install the latest version if asked.

```console
npx gt-helper@latest
```

Answer the questions as follows:

```console
What is the name of your project? my-project
Would you like to enable experimental features? No
Do you want to use a database? Yes
What ORM do you want to use? Prisma
```

Once the setup is complete, run the following commands in your terminal to add a space URL to your database.

```console
cd my-project
npm run studio
```

In the Prisma Studio window, click on the 'spaces' table, then add new record, and fill in the URL field with your Gather Space URL.

```console
npm run start
```

## Roadmap

- [x] Add CLI interface
- [x] Add Prisma ORM support
- [x] Add Object Utility Class
- [x] Add Player Utility Class
- [x] Add Drizzle ORM support
- [x] Add Gather Space backup feature
- [ ] Add automatic backup feature
- [ ] Add more helper functions
- [ ] Add more documentation
- [ ] Add more code examples
- [ ] Add 'studio mode' for Gather.Town Extension development
- [ ] Add more utility functions to Object and Player classes

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

[GitHub](https://github.com/Jarnock/gt-helper) for this project.

[NPM](https://www.npmjs.com/package/gt-helper) for this package.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits

- [Gather.Town](https://gather.town/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Drizzle-ORM](https://github.com/drizzle-team/drizzle-orm)
- [Discord](https://discord.gg/ymbbq4Umq6)
