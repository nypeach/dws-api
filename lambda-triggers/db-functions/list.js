import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be The id of the creator
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});