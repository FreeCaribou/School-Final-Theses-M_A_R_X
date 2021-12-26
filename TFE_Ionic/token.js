var jwt = require("jsonwebtoken");
const args = process.argv.slice(2);
var token = jwt.sign({ foo: args }, "shhhhh");
console.log(token);
