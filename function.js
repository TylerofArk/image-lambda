const AWS = require('aws-sdk');
const S3 = new AWS.S3();


exports.handler = async (event) => {
      
    let bucketName = event.Records[0].s3.bucket.name;
    let key = event.Records[0].s3.object.key;
    
    let images = await S3.getObject({Bucket: bucketName, Key: key}).promise();

    
    // notice we have  a buffer string that needs to be parsed
    // console.log('numbers ----------', numbers);
    let stringifiedImages = images.Body.toString();
    let parsedImages = JSON.parse(stringifiedImages);
    console.log('parsed numbers ----------', parsedImages);
    // let { numberOne, numberTwo } = parsedNumbers.numbers;
    // let result = numberOne + numberTwo;
    
    console.log('here is result ---------', result);

    
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};