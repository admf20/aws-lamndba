const aws = require('aws-sdk');

const getTasks = async (event) => {

  try {
    const dynamodb = new aws.DynamoDB.DocumentClient();

    const resultado = await dynamodb.scan({
        TableName: 'TaskTable'
    }).promise();

    const Tareas = resultado.Items;

    return{
        status: 200,
        body: {
            Tareas
        }
    };    
  } catch (error) {
      console.log(error);
  }
  
};

module.exports = {
    getTasks,
};