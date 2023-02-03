import * as sst from "@serverless-stack/resources";
import * as rds from "@aws-cdk/aws-rds";

export interface ConnectionProps extends sst.StackProps {
  dbCluster: rds.ServerlessCluster;
  dbEnvs: Record<string, string>;
}