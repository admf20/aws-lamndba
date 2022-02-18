"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Serverles, hello world"
      },
      null,
      2
    ),
  };
};
