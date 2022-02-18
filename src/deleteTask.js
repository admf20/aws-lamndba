const aws = require('aws-sdk');

const deleteTask = async (event) => {

    const dynamodb = new aws.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    await dynamodb.delete({
        TableName: "TaskTable",
        Key: { id }
    }).promise();

    return {
        status: 200,
        body: {
            message: "Tarea eliminada correctamente"
        }
    };
}

module.exports = {
    deleteTask,
};