const {v4} = require('uuid');
const aws = require('aws-sdk');
const middy = require('@middy/core'); 
const JsonBodyParse = require('@middy/http-json-body-parser');

const addTask = async (event) => {

    const dynamodb = new aws.DynamoDB.DocumentClient();

    const {title, description} = event.body;
    const createdAt = new Date();
    const id = v4();

    const newTask = {
        id,
        title,
        description,
        createdAt,
    };

    await dynamodb.put({
        TableName: "TaskTable",
        Item: newTask,
    }).promise();  

    return {
        status: 200,
        body: JSON.stringify({
            messages: "Tarea creada correctamente",
            newTask
        })
    };
}

module.exports = {
    addTask: middy(addTask).use(JsonBodyParse()),
};