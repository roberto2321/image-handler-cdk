import * as sst from "@serverless-stack/resources";
import * as ec2 from "@aws-cdk/aws-ec2";

export default class NetworkStack extends sst.Stack {
  public readonly vpc: ec2.IVpc;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'Vpc');
  }
}