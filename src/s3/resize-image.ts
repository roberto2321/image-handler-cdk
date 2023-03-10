import { S3Event } from "aws-lambda";
import AWS from "aws-sdk";
import sharp from "sharp";
import stream from "stream";

const prefix = 'processed';

const S3 = new AWS.S3();

// Read stream for downloading from S3
function readStreamFromS3({ Bucket, Key }: { Bucket: string; Key: string }) {
  return S3.getObject({ Bucket, Key }).createReadStream();
}

// Write stream for uploading to S3
function writeStreamToS3({ Bucket, Key }: { Bucket: string; Key: string }) {
  const pass = new stream.PassThrough();

  return {
    writeStream: pass,
    upload: S3.upload({
      Key,
      Bucket,
      Body: pass,
    }).promise(),
  };
}

// Sharp resize stream
function streamToSharp(){
  const pipeline = sharp();
  pipeline.metadata()
  .then((metadata)=>{    
    // incase of the thumbnails resize to 300 width
    pipeline
    .withMetadata()
    .resize(300, metadata.height)
    .toFormat('jpg')
    .toBuffer();

    // in case of portrait image case
    pipeline
    .withMetadata()
    .rotate(-450) // rotates 270 degrees on portrait;
    .resize(metadata.width, 1600)
    .toBuffer();
    


  })

  return pipeline;

}

export async function main(event: S3Event) {
  const s3Record = event.Records[0].s3;

  // Grab the filename and bucket name
  const Key = s3Record.object.key;
  const Bucket = s3Record.bucket.name;

  // Check if the file has already been resized
  if (Key.startsWith(prefix)) {
    return false;
  }

  // Create the new filename with the dimensions
  const newKey = `${prefix}-${Key}`;

  // Stream to read the file from the bucket
  const readStream = readStreamFromS3({ Key, Bucket });
  // Stream to resize the image
  const resizeStream = streamToSharp();
  // Stream to upload to the bucket
  const { writeStream, upload } = writeStreamToS3({
    Bucket,
    Key: newKey,
  });

  // Trigger the streams
  readStream.pipe(resizeStream).pipe(writeStream);

  // Wait for the file to upload
  await upload;

  return true;
}
