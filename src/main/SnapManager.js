const AWS = require('aws-sdk');
require('dotenv').config()

class SnapManager {
  constructor() {
    const s3 = new AWS.S3()
    const params = { Bucket: process.env.S3_BUCKET_NAME, Key: process.env.S3_KEY_NAME }
    s3.getObject(params, (err, data) => {
      if (!err) {
        this.json = JSON.parse(Buffer.from(data.Body).toString("utf8"))
      } else {
        console.error(err)
      }
    })
  }
}

export default SnapManager
