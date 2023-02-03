import * as sst from "@serverless-stack/resources";
import Database from "./construct/database";
import MigrateStack from "./stack/migrate-stack";
import NetworkStack from "./construct/network";
import CoreStack from "./stack/core-stack";
import S3Bucket from "./construct/s3";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  // const network = new NetworkStack(app, "Network");
  // const database = new Database(app, "Database", { vpc: network.vpc });

  // new MigrateStack(app, "Migrate", {
  //   dbCluster: database.prodCluster,
  //   dbEnvs: database.dbEnvs,
  // });

  new S3Bucket(app, "Files", {

  })
  
  // new CoreStack(app, "Core", {
  //   dbCluster: database.prodCluster,
  //   dbEnvs: database.dbEnvs,
  // })
  // new ListStack(app, "list-stack");
  // new UploadStack(app, "upload");
}
