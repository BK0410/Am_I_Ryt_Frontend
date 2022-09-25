import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  uploadFile(file) {
    const contentType = 'pdf';
    const bucket = new S3({
      accessKeyId: 'AKIAVM6ULLGEKQWF4NIE',
      secretAccessKey: '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',
      region: 'us-east-1',
    });
    const params = {
      Bucket: 'am-i-ryt-pdf',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
}
