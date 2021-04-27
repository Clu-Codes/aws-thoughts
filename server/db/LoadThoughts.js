const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

// use of DocumentClient class enables use of Javascript Objects as arguments and return native JS types. This constructor helps map objects, reducing impedance mismatching and speeds up development. 
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

console.log("Importing thoughts into DynamoDB. Please wait.");
// fs.readFileSync is relative to the execution point, not path  between files.
const allUsers = JSON.parse(fs.readFileSync('./server/seed/users.json', 'utf-8'));

allUsers.forEach(user => {
    const params = {
        TableName: "Thoughts",
        Item: {
            "username": user.username,
            "createdAt": user.createdAt,
            "thought": user.thought
        }
    };

    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", user.username);
        }
    });
})