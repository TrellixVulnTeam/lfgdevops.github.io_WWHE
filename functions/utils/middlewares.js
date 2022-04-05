exports.jsonBodyParser = (event) => {
  console.log("event.body: ", event.body);
  try {
    event.body = JSON.parse(event.body);
  } catch (e) {
    console.log("Body already JSON Parsed");
  }
  return;
};

exports.response = (event, message) => {
  const { statusCode } = event;
  let res = { body: {} };
  if (!message.error && !statusCode) {
    res.body.success = true;
    res.body.error = null;
    res.statusCode = 200;
    //adds attributes from message to res
    for (var attrname in message) {
      res.body[attrname] = message[attrname];
    }
  } else {
    res.body.success = false;
    res.body.error = "something went wrong";
    res.statusCode = 400;
  }
  res.body = JSON.stringify(res.body);
  res.headers = res.headers ? res.headers : {};
  res.headers["Access-Control-Allow-Origin"] = "*";

  return Promise.resolve(res);
};
