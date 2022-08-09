import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, // The id of the creator
      dwId: event.pathParameters.id, // The id of the wu from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    UpdateExpression: "SET dwTitle = :dwTitle, dwDescription = :dwDescription, cloudApps = :cloudApps, onPremApps = :onPremApps, recordsPerMonth = :recordsPerMonth, hoursPerMonth = :hoursPerMonth, whoDoesItNow = :whoDoesItNow, hourlyRate = :hourlyRate, attachment = :attachment",

    // 'ExpressionAttributeValues' defines the value in the update expression
    ExpressionAttributeValues: {
      ":dwTitle": data.wuTitle || null,
      ":dwDescription": data.wuDescription || null,
      ":cloudApps": data.cloudApps || null,
      ":onPremApps": data.onPremApps || null,
      ":recordsPerMonth": data.recordsPerMonth || null,
      ":hoursPerMonth": data.hoursPerMonth || null,
      ":whoDoesItNow": data.whoDoesItNow || null,
      ":hourlyRate": data.hourlyRate || null,
      ":attachment": data.attachment || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});