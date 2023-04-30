# gt-helper

GT Helper is a tool to help developers create new Gather.Town Extensions.

## Usage

`npx gt-helper@latest`

## CLI Interface

The CLI interface will ask you a series of questions to set up your project.

`What is the name of your project?`

This is the name of your project. This will be used to create the folder for your project.

`Do you want to use a database?`

This determines if you will be using a database. If you select `y` or `yes`, you will be asked what ORM you want to use. If you select `n` or `no`, you will not be asked what ORM you want to use.

`What ORM do you want to use?`

This is the ORM you want to use. The options are `none`, `prisma`, or `drizzle`.

`Do you want to enable experimental features?`

This determines if you want to enable experimental features. Currently, this adds an alpha version of a Gather Space backup feature.

## Additional Arguments

If you do not want to use the CLI interface to set up your project, you can use the following arguments to set up your project.

`npx gt-helper@latest --name <name> --orm <prisma | drizzle> --experimental`

`--name` is the name of your project. This will be used to create the folder for your project.

`--orm` is the ORM you want to use. The options are `prisma` and `drizzle`.

`--experimental` is a flag to enable experimental features. Currently, this adds an alpha version of a Gather Space backup feature.

## Features

- Quick setup for Gather.Town Extensions
- Support for Prisma and Drizzle ORM
- Verbose Object and Player classes with type checking, and utility functions for extensions
- Gather Space backup feature (alpha)
- Overt Gather.Town Extension lifecycle, for easy debugging and testing
- Modular helper functions, easy to add your own

## Player Utility Class

The Player Utility Class is a class that extends the Gather.Town Player class. It adds a lot of utility functions to make it easier to work with players in extensions.

### Player Utility Class Functions (Brief Overview)

- Player Outfit Utilities:

  - `parseOutfit`
  - `updateOutfitString`
  - `updateOutfitJSON`
  - `updateOutfit`
  - `getSpriteUrl`

- Player Status Utilities:

  - `ghost`/`unghost`
  - `setSpeed`

- Player Inventory Utilities:
  - `inventory`
  - `getInventoryItem`
  - `giveItem`
  - `removeItem`

## Object Utility Class

The Object Utility Class is a class that extends the Gather.Town Object class. It adds a lot of utility functions to make it easier to work with objects in extensions.

### Object Utility Class Functions (Brief Overview)

- `GTObjectFactory`

  - `create`: Typesafe Object creation
  - `createFromMapObject`
  - `create_type_[x]`: Typesafe Object creation by object type
  - `create_[usecase]_object`: Typesafe Object creation by usecase

- `GTObject`
  - Accessors and Mutators for all Object properties
  - `update`: Update object in game
  - `toString`/`toJSON`: Object export for easy debugging
  - `moveTo`/`moveBy`: Easy object movement

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
