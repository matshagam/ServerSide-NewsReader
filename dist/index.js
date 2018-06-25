"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _parsePost = require("./parsePost");

var _config = require("./config");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from "fs";

// const saveResult = json => {
//   fs.writeFile("result.json", json, err => {
//     if (err) console.log("> Not saved...");
//   });
// };

var urlPage = "https://roomble.com/ideas/soveti-i-idei/";

(0, _parsePost.parseLinks)(urlPage, _config.elems.roomble.link).then(function (links) {
  (0, _parsePost.getPosts)(links, _config.elems.roomble).then(function (posts) {
    (0, _axios2.default)("http://192.168.1.13:3000/posts", {
      method: "POST",
      data: (0, _stringify2.default)(posts),
      headers: {
        "Content-Type": "application/json"
      }
    });
    // saveResult(JSON.stringify(posts, 0, 4));
  });
}).catch(function (e) {
  return console.log(e);
});

// To start server run terminal: json-server --host "192.168.1.13" --port 3000 --watch db.json