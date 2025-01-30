import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request : NextRequest) {
    try {
        const s3Client = new S3Client({ region: process.env.AWS_REGION });

        // Extract the file name from the request body
        const { fileName } = await request.json();

        // Create a presigned post with the original file name
        const { url, fields } = await createPresignedPost(s3Client, {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: fileName, // Use the original file name as the key
        });

        console.log(url, fields);
        return NextResponse.json({ url, fields }); // Use NextResponse to return JSON
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        return NextResponse.json({ error: "Error generating pre-signed URL" }, { status: 500 });
    }
}