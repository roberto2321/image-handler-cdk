# image-handler-cdk

## How to Run

1. **Clone the code repository**

```bash
$ git clone <git url>
```

2. **Install the dependencies**

```bash
$ npm install
```

3. **Set env variables**

```bash
$ cp .env.example .env
```

4. **Run the code locally**

```bash
$ npm run start
```

5. **Now you deploy the application**

```bash
$ npm run deploy -- --stage prod
```

## Commands
### `npm run start`

Starts the local Lambda development environment.

### `npm run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `npm run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy a specific stack.

### `npm run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally remove a specific stack.

### `npm run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## Documentation

Learn more about the Serverless Stack.

- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)
