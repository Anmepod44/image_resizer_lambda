Sure! Here's a README.md file for your Lambda function:

---

# Image Processing Lambda Function

This AWS Lambda function processes images uploaded to an S3 bucket. It resizes the images to a specified dimension and uploads the resized images back to the same bucket under a different folder.

## Features

- Resizes images uploaded to an S3 bucket.
- Supports JPG, JPEG, PNG, and GIF image formats.
- Automatically creates processed images in a designated folder in the same S3 bucket.
- Provides the URL of the processed image after resizing.

## Setup

1. **AWS Account Setup**:
    - Make sure you have an AWS account.
    - Set up an S3 bucket to store images.

2. **IAM Role**:
    - Create an IAM role with permissions to access S3 and Lambda.
    - Attach the role to the Lambda function.

3. **Lambda Function**:
    - Create a new Lambda function in the AWS Management Console.
    - Use Node.js runtime for the function.
    - Copy the code from `handler.js` into the Lambda function code editor.
    - Set the handler to `handler.handler`.
    - Add environment variables if required (e.g., S3 bucket name).

4. **Trigger**:
    - Configure an S3 bucket trigger to invoke the Lambda function when new images are uploaded.

## Usage

- Upload images to the specified S3 bucket.
- The Lambda function automatically resizes the images to 200x200 pixels.
- Processed images are stored in the `/processed` folder within the same bucket.
- Access the processed images using the provided URL.

## Dependencies

- `aws-sdk`: AWS SDK for JavaScript to interact with S3.
- `sharp`: Node.js image processing library for resizing images.

## Configuration

- `bucketName`: Name of the S3 bucket where images are uploaded.
- `width`: Width of the resized image (default: 200 pixels).
- `height`: Height of the resized image (default: 200 pixels).

## Author

Marvin Nyaranga

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to modify it according to your specific requirements!