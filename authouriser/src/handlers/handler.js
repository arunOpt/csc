"use strict";
const WebBaseLoader = require("langchain/document_loaders");
module.exports.chatbot = (event, context, cb) => {
  cb(null, { message: "Only logged in users can see this" });
};

module.exports.test = (event, context, cb) => {
  cb(null, { message: "All users can see this" });
};
