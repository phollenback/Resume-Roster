import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize DynamoDB Client
const dbClient = new DynamoDBClient({ region: "your-region" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { positionTitle, company, keywords, date, fileUrl } = JSON.parse(req.body);

        const params = {
            TableName: "YourDynamoDBTable",
            Item: {
                id: { S: "unique-id" }, // Use a unique ID generation mechanism
                positionTitle: { S: positionTitle },
                company: { S: company },
                keywords: { SS: keywords }, // Store as a set of strings
                date: { S: new Date(date).toISOString() },
                fileUrl: { S: fileUrl || "" }, // Store the S3 URL
            },
        };

        try {
            await dbClient.send(new PutItemCommand(params));
            return res.status(200).json({ message: "Metadata stored successfully" });
        } catch (error) {
            console.error("Error storing metadata:", error);
            return res.status(500).json({ error: "Error storing metadata" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}