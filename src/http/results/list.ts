import "reflect-metadata";

import { APIGatewayProxyResult } from "aws-lambda";
import { TestResultService } from "../../core/services";

export async function main(): Promise<APIGatewayProxyResult> {
  try {
    const data = await TestResultService.findAll();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    }
  }
}