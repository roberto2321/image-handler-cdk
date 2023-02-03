import * as sst from "@serverless-stack/resources";
import { Function } from "@serverless-stack/resources";
import { ConnectionProps } from "../construct/props";

export default class MigrateStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: ConnectionProps) {
    super(scope, id, props);

    const upRunner = new Function(this, "Up", {
      handler: "src/migration-runner.up",
      environment: props.dbEnvs,
      bundle: {
        externalModules: ["pg-native"],
      },
    });
    props.dbCluster?.grantDataApiAccess(upRunner);

    const downRunner = new Function(this, "Down", {
      handler: "src/migration-runner.down",
      environment: props.dbEnvs,
      bundle: {
        externalModules: ["pg-native"],
      },
    });
    props.dbCluster?.grantDataApiAccess(downRunner);

    // Show the ARN in the output
    this.addOutputs({
      MigrationUp: upRunner.functionArn,
      MigrationDown: downRunner.functionArn,
    });
  }
}
