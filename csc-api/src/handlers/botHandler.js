const AWS = require("aws-sdk");
const lexruntime = new AWS.LexRuntime();
const botName = "YourBotName"; // Replace with your bot's name

module.exports.botHandler = async (event) => {
  try {
    const connectionId = event.requestContext.connectionId;
    const body = JSON.parse(event.body);

    // Call Amazon Lex
    const lexParams = {
      botName,
      inputText: body.message,
      userId: connectionId, // Use connectionId as a unique user identifier
    };

    const lexResponse = await lexruntime.postText(lexParams).promise();

    // Create a response object
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: lexResponse.message }),
    };

    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
