import cheerio from "cheerio";
import axios from "axios";
import formatDate from "date-fns/format";

import { pruneEmpty } from "./manageJSON";

const log = (i, count, ms) => {
  return new Promise(r =>
    setTimeout(() => {
      console.log(`
  Индекс: ${i};
  Всего записей: ${count}
  `);
      r();
    }, ms)
  );
};

function parsePost(url, elems) {
  return new Promise((resolve, reject) => {
    axios.get(url).then((body, error) => {
      if (error) reject(error);

      const $ = cheerio.load(body.data, { decodeEntities: false });

      // $.prototype.logHtml = function() {
      //   console.log(this.html());
      // };

      // $('body').logHtml();

      const image = $(elems.image).attr("src");
      const pubDate = $(elems.pubDate).text();
      const title = $(elems.title)
        .text()
        .trim();

      const description = $(elems.description)
        .text()
        .trim();

      const content = $(elems.content).each((i, item) => {
        $("div.rsp_block_text p a")
          .removeAttr("href")
          .removeAttr("target")
          .removeAttr("rel");

        $('a[itemprop="contentUrl"] img.owl-lazy.wpstickies').attr(
          "src",
          $('a[itemprop="contentUrl"] img.owl-lazy.wpstickies').data("src")
        );

        $(item)
          .removeAttr("style")
          .removeAttr("class")
          .removeAttr("alt")
          .removeAttr("height")
          .removeAttr("data-height")
          .removeAttr("data-width")
          .removeAttr("data-srcrsp")
          .removeAttr("data-src")
          .removeAttr("data-ratio")
          .removeAttr("data-ur")
          .removeAttr("data-slug")
          .removeAttr("data-alt")
          .removeAttr("data-title")
          .removeAttr("data-products");
      });

      const link = url;
      const logo = elems.logo;

      const today = formatDate(new Date(), "YYYY-MM-DD"),
        getDate = formatDate(pubDate, "YYYY-MM-DD");
      let post;

      getDate === today
        ? (post = {
            pubDate: getDate,
            title: title,
            image: image,
            description: description,
            content: content.toString(),
            link: link,
            count: 9,
            logo: logo,
            id: formatDate(pubDate, "x")
          })
        : console.log("not today's news...");

      // post = {
      //   pubDate: getDate,
      //   title: title,
      //   image: image,
      //   description: description,
      //   content: content.toString(),
      //   link: link,
      //   count: 9,
      //   logo: logo,
      //   id: formatDate(pubDate, "x")
      // };

      if (post) {
        console.log(post);
        resolve(post);
      } else {
        console.log("> Data not received: " + post);
        resolve(pruneEmpty(post));
      }
    });
  });
}

function parseLinks(url, className) {
  return new Promise((resolve, reject) => {
    let links = [];

    axios.get(url).then((body, error) => {
      if (error) reject(error);

      const $ = cheerio.load(body.data);

      $(className).each((i, elems) => {
        links.push($(elems).attr("href"));
      });
      resolve(links);
      if (!links.length) reject({ error: "> empty links" });
    });
  });
}

async function getPosts(links, elems) {
  let posts = [];
  let count = links.length;

  for (let i = 0; i < count; i++) {
    const post = await parsePost(links[i], elems).then(post => post);

    post !== undefined ? posts.push(post) : null;
    console.log(posts.length);

    await log(i + 1, count, 2000);
  }
  return new Promise((resolve, reject) => {
    if (!posts.length) reject({ error: "> empty posts" });
    resolve(posts);
  });
}

export { parsePost, parseLinks, getPosts };
