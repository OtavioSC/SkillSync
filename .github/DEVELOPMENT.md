# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

```shell
git clone https://github.com/<your-name-here>/template-typescript-node-package
cd template-typescript-node-package
pnpm install
```

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

## Building

Run [**tsup**](https://tsup.egoist.dev) locally to build source files from `src/` into output files in `lib/`:

```shell
pnpm build
```

Add `--watch` to run the builder in a watch mode that continuously cleans and recreates `lib/` as you save files:

```shell
pnpm build --watch
```

## Formatting

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

```shell
pnpm format:write
```

## Linting

This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- `pnpm lint` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files
- `pnpm lint:knip` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports
- `pnpm lint:md` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files
- `pnpm lint:package` ([npm-package-json-lint](https://npmpackagejsonlint.org/)): Lints the `package.json` file
- `pnpm lint:packages` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the `pnpm-lock.yml` file
- `pnpm lint:spelling` ([cspell](https://cspell.org)): Spell checks across all source files

## Testing

[Vitest](https://vitest.dev) is used for tests.
You can run it locally on the command-line:

```shell
pnpm run test
```

Add the `--coverage` flag to compute test coverage and place reports in the `coverage/` directory:

```shell
pnpm run test --coverage
```

Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to `console.log`, `console.warn`, and other console methods will cause a test to fail.

### Debugging Tests

This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).

## Type Checking

You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

However, it can be useful to run the TypeScript command-line (`tsc`) to type check all files in `src/`:

```shell
pnpm tsc
```

Add `--watch` to keep the type checker running in a watch mode that updates the display as you save files:

```shell
pnpm tsc --watch
```

## Setup Scripts

As described in the `README.md` file and `docs/`, this template repository comes with three scripts that can set up an existing or new repository.

> **Warning**
> Each setup script overrides many files in the directory they're run in.
> Make sure to save any changes you want to preserve before running them.

### The Creation Script

This template's "creation" script is located in `src/create/`.
You can run it locally with `node bin/index.js --mode create`.
Note that files need to be built with `pnpm run build` beforehand.

#### Testing the Creation Script

You can run the end-to-end test for creation locally on the command-line.
Note that the files need to be built with `pnpm run build` beforehand.

```shell
pnpm run create:test
```

That end-to-end test executes `script/create-test-e2e.js`, which:

1. Runs the creation script to create a new `test-repository` child directory and repository
2. Asserts that commands such as `build` and `lint` each pass

### The Initialization Script

This template's "initialization" script is located in `src/initialize/`.
You can run it locally with `pnpm run initialize`.
It uses [`tsx`](https://github.com/esbuild-kit/tsx) so you don't need to build files before running.

```shell
pnpm run initialize
```

> 💡 Consider running `git add -A` to stage all local changes before running.

#### Testing the Initialization Script

You can run the end-to-end test for initializing locally on the command-line.
Note that files need to be built with `pnpm run build` beforehand.

```shell
pnpm run initialize:test
```

That end-to-end test executes `script/initialize-test-e2e.js`, which:

1. Runs the initialization script using `--skip-github-api` and other skip flags
2. Checks that the local repository's files were changed correctly (e.g. removed initialization-only files)
3. Runs `pnpm run lint:knip` to make sure no excess dependencies or files were left over
4. Resets everything
5. Runs initialization a second time, capturing test coverage

The `pnpm run initialize:test` script is run in CI to ensure that templating changes are in sync with the template's actual files.
See `.github/workflows/test-initialize.yml`.

### The Migration Script

This template's "migration" script is located in `src/migrate/`.
Note that files need to be built with `pnpm run build` beforehand.

To test out the script locally, run it from a different repository's directory:

```shell
cd ../other-repo
node ../template-typescript-node-package/bin/migrate.js
```

The migration script will work on any directory.
You can try it out in a blank directory with scripts like:

```shell
cd ..
mkdir temp
cd temp
node ../template-typescript-node-package/bin/migrate.js
```

#### Testing the Migration Script

You can run the end-to-end test for migrating locally on the command-line:

```shell
pnpm run initiamigratelize:test
```

That end-to-end test executes `script/migrate-test-e2e.js`, which:

1. Runs the migration script using `--skip-github-api` and other skip flags
2. Checks that only a small list of allowed files were changed
3. Checks that the local repository's files were changed correctly (e.g. removed initialization-only files)

The `pnpm run migrate:test` script is run in CI to ensure that templating changes are in sync with the template's actual files.
See `.github/workflows/test-migrate.yml`.
