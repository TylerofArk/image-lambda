const AWS = require('aws-sdk');
const S3 = new AWS.S3();


exports.handler = async (event) => {
      
    let bucketName = event.Records[0].s3.bucket.name;
    let key = event.Records[0].s3.object.key;
    const size = event.Records[0].s3.object.size;
    
    try{
    let images = await S3.getObject({Bucket: bucketName, Key: key}).promise();
    let stringifiedImages = images.Body.toString();
    let parsedImages = JSON.parse(stringifiedImages);
    console.log('parsed images ----------', parsedImages);
    parsedImages.push({
            name: key,
            size: size,
            type: "jpg",
            
        });
        
        const params = {
            Bucket: bucketName,
            Key: "images.json"
        
        };
        
        let imagesBody = JSON.stringify(parsedImages);
        await S3.putObject({... params, Body: imagesBody, ContentType: "application/json"}).promise();
        
        console.log("current manifest", parsedImages);
        
    } catch (e) {
        console.log(e);
        
        let newImage = {
            Bucket: bucketName,
            Key: "images.json",
            Body: JSON.stringify([{name: key, size: size, type: ".jpg"}]),

        };
        await S3.putObject(newImage).promise();
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello World'),
    };
    return response;
};