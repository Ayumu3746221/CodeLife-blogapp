import "@testing-library/jest-dom";
import "whatwg-fetch";

if (typeof global.Request === "undefined") {
  global.Request = require("node-fetch").Request;
  global.Response = require("node-fetch").Response;
  global.Headers = require("node-fetch").Headers;
}

if (!global.Response.prototype.json) {
  global.Response.prototype.json = function () {
    return this.text().then((text) => JSON.parse(text));
  };
}
