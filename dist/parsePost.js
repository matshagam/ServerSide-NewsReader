"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = exports.parseLinks = exports.parsePost = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var getPosts = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(links, elems) {
    var posts, count, i, post;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            posts = [];
            count = links.length;
            i = 0;

          case 3:
            if (!(i < count)) {
              _context.next = 14;
              break;
            }

            _context.next = 6;
            return parsePost(links[i], elems).then(function (post) {
              return post;
            });

          case 6:
            post = _context.sent;


            post !== undefined ? posts.push(post) : null;
            console.log(posts.length);

            _context.next = 11;
            return log(i + 1, count, 2000);

          case 11:
            i++;
            _context.next = 3;
            break;

          case 14:
            return _context.abrupt("return", new _promise2.default(function (resolve, reject) {
              if (!posts.length) reject({ error: "> empty posts" });
              resolve(posts);
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getPosts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _format = require("date-fns/format");

var _format2 = _interopRequireDefault(_format);

var _manageJSON = require("./manageJSON");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = function log(i, count, ms) {
  return new _promise2.default(function (r) {
    return setTimeout(function () {
      console.log("\n  \u0418\u043D\u0434\u0435\u043A\u0441: " + i + ";\n  \u0412\u0441\u0435\u0433\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439: " + count + "\n  ");
      r();
    }, ms);
  });
};

function parsePost(url, elems) {
  return new _promise2.default(function (resolve, reject) {
    _axios2.default.get(url).then(function (body, error) {
      if (error) reject(error);

      var $ = _cheerio2.default.load(body.data, { decodeEntities: false });

      // $.prototype.logHtml = function() {
      //   console.log(this.html());
      // };

      // $('body').logHtml();

      var image = $(elems.image).attr("src");
      var pubDate = $(elems.pubDate).text();
      var title = $(elems.title).text().trim();

      var description = $(elems.description).text().trim();

      var content = $(elems.content).each(function (i, item) {
        $("div.rsp_block_text p a").removeAttr("href").removeAttr("target").removeAttr("rel");

        $('a[itemprop="contentUrl"] img.owl-lazy.wpstickies').attr("src", $('a[itemprop="contentUrl"] img.owl-lazy.wpstickies').data("src"));

        $(item).removeAttr("style").removeAttr("class").removeAttr("alt").removeAttr("height").removeAttr("data-height").removeAttr("data-width").removeAttr("data-srcrsp").removeAttr("data-src").removeAttr("data-ratio").removeAttr("data-ur").removeAttr("data-slug").removeAttr("data-alt").removeAttr("data-title").removeAttr("data-products");
      });

      var link = url;
      var logo = elems.logo;

      var today = (0, _format2.default)(new Date(), "YYYY-MM-DD"),
          getDate = (0, _format2.default)(pubDate, "YYYY-MM-DD");
      var post = void 0;

      // getDate === today
      //   ? (post = {
      //       pubDate: getDate,
      //       title: title,
      //       image: image,
      //       description: description,
      //       content: content.toString(),
      //       link: link,
      //       count: 9,
      //       logo: logo,
      //       id: formatDate(pubDate, 'x')
      //     })
      //   : console.log("not today's news...");

      post = {
        pubDate: getDate,
        title: title,
        image: image,
        description: description,
        content: content.toString(),
        link: link,
        count: 9,
        logo: logo,
        id: (0, _format2.default)(pubDate, "x")
      };

      if (post) {
        console.log(post);
        resolve(post);
      } else {
        console.log("> Data not received: " + post);
        resolve((0, _manageJSON.pruneEmpty)(post));
      }
    });
  });
}

function parseLinks(url, className) {
  return new _promise2.default(function (resolve, reject) {
    var links = [];

    _axios2.default.get(url).then(function (body, error) {
      if (error) reject(error);

      var $ = _cheerio2.default.load(body.data);

      $(className).each(function (i, elems) {
        links.push($(elems).attr("href"));
      });
      resolve(links);
      if (!links.length) reject({ error: "> empty links" });
    });
  });
}

exports.parsePost = parsePost;
exports.parseLinks = parseLinks;
exports.getPosts = getPosts;