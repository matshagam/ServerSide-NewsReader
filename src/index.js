import { parseLinks, getPosts } from "./parsePost";
import { elems } from "./config";
import axios from "axios";
import fs from "fs";

const saveResult = json => {
  fs.writeFile("result.json", json, err => {
    if (err) console.log("> Not saved...");
  });
};

const urlPage = "https://roomble.com/ideas/soveti-i-idei/";

parseLinks(urlPage, elems.roomble.link)
  .then(links => {
    getPosts(links, elems.roomble).then(posts => {
      axios(`http://localhost:3000/posts`, {
        method: "POST",
        data: JSON.stringify(posts),
        headers: {
          "Content-Type": "application/json"
        }
      });
      saveResult(JSON.stringify(posts, 0, 4));
    });
  })
  .catch(e => console.log(e));

// To start server run terminal: json-server --host "192.168.1.13" --port 3000 --watch db.json
