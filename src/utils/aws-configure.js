import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_KEY,
  region: process.env.VUE_APP_AWS_REGION, 
});

const s3 = new AWS.S3();
export default {
    s3
}