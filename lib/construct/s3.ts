import * as s3 from "@aws-cdk/aws-s3";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sst from "@serverless-stack/resources";

export default class S3Bucket extends sst.Stack {
  readonly fileBucket: s3.Bucket;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const bucket = new sst.Bucket(this, "Bucket", {
      s3Bucket: {
        bucketName: `quidel-files-${scope.stage}`,
      },
      notifications: [
        {
          function: {
            handler: "src/s3/resize-image.main",
            bundle: {
              externalModules: ["sharp"]
            },
            layers: [
              new lambda.LayerVersion(this, "SharpLayer", {
                code: lambda.Code.fromAsset("layers/sharp"),
              }),
            ],
          },
          notificationProps: {
            events: [s3.EventType.OBJECT_CREATED],
            filters: [
              {prefix: '/original-test-images/'}
            ]
          }
        }
      ]
    })
    // Allow the notification functions to access the bucket
    bucket.attachPermissions([bucket]);

    this.fileBucket = bucket.s3Bucket;

    // Show the endpoint in the output
    this.addOutputs({
      BucketName: this.fileBucket.bucketName,
    });
  }
}