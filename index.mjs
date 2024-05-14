import AWS from 'aws-sdk';
import sharp from 'sharp';

const s3 = new AWS.S3();

async function handler(event, context) {
    try {
        const bucketName = event.Records[0].s3.bucket.name;
        const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
        
        // Check if the uploaded object is an image
        if (!key.match(/\.(jpg|jpeg|png|gif)$/i)) {
            throw new Error('Uploaded file is not an image');
        }
        
        // Get the object from S3
        const getObjectParams = {
            Bucket: bucketName,
            Key: key
        };
        
        const data = await s3.getObject(getObjectParams).promise();
        
        // Resize the image
        const resizedImageBuffer = await sharp(data.Body)
            .resize({ width: 200, height: 200 })
            .toBuffer();
        
        // Upload the resized image to the /processed folder
        const processedKey = `processed/${key.split('/').pop()}`;
        const putObjectParams = {
            Bucket: bucketName,
            Key: processedKey,
            Body: resizedImageBuffer,
            ContentType: data.ContentType
        };
        
        await s3.putObject(putObjectParams).promise();
        
        console.log(`Resized image uploaded to: ${processedKey}`);
        
        // Get the URL of the processed image
        const processedImageUrl = `https://${bucketName}.s3.amazonaws.com/${processedKey}`;
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Image resized and uploaded successfully', imageUrl: processedImageUrl })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error processing image')
        };
    }
}

export { handler };
