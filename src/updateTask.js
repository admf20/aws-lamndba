const aws = require('aws-sdk');
const middy = require('@middy/core');
const JsonBodyParse = require('@middy/http-json-body-parser');

const updateTask = async (event) => {

    const dynamodb = new aws.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { done, title, description } = event.body;

    await dynamodb.update({
        TableName: "TaskTable",
        Key: {id},
        UpdateExpression: "set done = :done, title = :title, description = :description",
        ExpressionAttributeValues: {
            ":done": done,
            ":title": title,
            ":description": description
        },
        ReturnValues: "ALL_NEW",
    }).promise();

    return {
        status: 200,
        body: JSON.stringify({
            messages: "Tarea Actualizada"
        })
    };
};

module.exports = {
    updateTask: middy(updateTask).use(JsonBodyParse()),
};