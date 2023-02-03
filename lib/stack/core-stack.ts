import * as sst from "@serverless-stack/resources";
import { IGrantable } from '@aws-cdk/aws-iam';
import { ConnectionProps } from "../construct/props";

export default class CoreStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: ConnectionProps) {
    super(scope, id, props);

    // Create the HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /results": "src/http/results/list.main"
      },
      defaultFunctionProps: {
        environment: props.dbEnvs,
        bundle: {
          externalModules: ['pg-native'],
        }
      }
    });
    props.dbCluster?.grantDataApiAccess(api.getFunction("GET /results") as unknown as IGrantable)

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
