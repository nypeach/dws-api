import * as uuid from "uuid";
import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {

  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the creator
      dwId: uuid.v1(), // A unique uuid
      dwTitle: data.dwTitle, // Parsed from requet body
      dwDescription: data.dwDescription, // Parsed from request body
      cloudApps: data.cloudApps, // Parsed from request body
      onPremApps: data.onPremApps, // Parsed from request body
      recordsPerMonth: data.recordsPerMonth, // Parsed from request body
      hoursPerMonth: data.hoursPerMonth, // Parsed from request body
      whoDoesItNow: data.whoDoesItNow, // Parsed from request body
      hourlyRate: data.hourlyRate,  // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  await dynamoDb.put(params);
  return params.Item;
});
