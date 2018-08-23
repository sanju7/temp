# index.js
'use strict';
const Buffer = require('safe-buffer').Buffer;
// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');
// Creates a client
const storage = new Storage();
exports.moveFileToEncryptedStorage = (event, callback) => {
  const file = event.data;
  console.log(  Event ${event.eventId});
  console.log(  Event Type: ${event.eventType});
  console.log(  Bucket: ${file.bucket});
  console.log(  File: ${file.name});
  console.log(  Metageneration: ${file.metageneration});
  console.log(  Created: ${file.timeCreated});
  console.log(  Updated: ${file.updated});
const newBucket = "gcp-org-sync-destination-enc";
const newBucketAndFileName = "gs://"+newBucket+"/"+file.name;
console.log("Moving to..."+newBucketAndFileName);
return storage
      .bucket(file.bucket)
      .file(file.name)
      .move(newBucketAndFileName)
      .then(() => {
        
        console.log("content has been moved to "+newBucketAndFileName);
})
      .catch((err) => { 
        console.error("ERROR:"+err);
      });
}
