const AWS = require('aws-sdk');

AWS.config.update({ 
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});

// create DynamoDB service object using the DynamoDB class
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// create params object that will hold the schema and metadata of the table 
const params = {
    TableName: "Thoughts",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH" }, // Partition Key
        { AttributeName: "createdAt", KeyType: "RANGE" } // Sort Key
    ],

    // defines the attributes for the hash and range keys. Must assign a data type to the attributes, which we've done here using "S" for string for the username and "N" for integer for createdAt.
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

// make call to DynamoDB instance to create table
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
})