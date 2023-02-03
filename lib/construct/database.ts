import * as rds from "@aws-cdk/aws-rds";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as sst from "@serverless-stack/resources";

interface DatabaseProps extends sst.StackProps {
  vpc: ec2.IVpc;
}

export default class Database extends sst.Stack {
  readonly prodCluster: rds.ServerlessCluster;
  readonly dbName: string;
  readonly dbEnvs: Record<string, string>;

  constructor(scope: sst.App, id: string, props: DatabaseProps) {
    super(scope, id, props);

    const vpc = props.vpc;
    this.dbName = process.env.DEFAULT_DATABASE_NAME as string;

    if (scope.stage === "prod") {
      const cluster = new rds.ServerlessCluster(this, 'Database', {
        vpc,
        defaultDatabaseName: this.dbName,
        engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
        parameterGroup: rds.ParameterGroup.fromParameterGroupName(
          this,
          "ParameterGroup",
          "default.aurora-postgresql10"
        ),
        enableDataApi: true
      })
      this.prodCluster = cluster;
      this.dbEnvs = {
        DATABASE_CLUSTER_ARN: cluster.clusterArn,
        DATABASE_SECRET_ARN: cluster.secret?.secretArn ?? '',
      }
    } else {
      const dbInstance = new rds.DatabaseInstance(this, 'Database', {
        engine: rds.DatabaseInstanceEngine.POSTGRES,
        vpc,
        vpcSubnets: vpc.selectSubnets({ subnets: vpc.publicSubnets }),
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
        publiclyAccessible: true,  
        databaseName: this.dbName,
      });
      dbInstance.connections.allowFromAnyIpv4(ec2.Port.tcp(5432));

      this.dbEnvs = {
        DATABASE_HOST: dbInstance.instanceEndpoint.hostname,
        DATABASE_PORT: "5432",
        DATABASE_ENGINE: dbInstance.secret?.secretValueFromJson("engine").toString() ?? '',
        DATABASE_USER: dbInstance.secret?.secretValueFromJson("username").toString() ?? '',
        DATABASE_PASSWORD: dbInstance.secret?.secretValueFromJson("password").toString() ?? '',
      }
    }

    this.dbEnvs['DATABASE_NAME'] = this.dbName;
    this.dbEnvs['STAGE'] = scope.stage;
  }
}