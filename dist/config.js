'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var elems = {
  roomble: {
    image: 'div.gallery-img a[src$=".jpg"]',
    title: 'div.post_name',
    pubDate: 'span[itemprop="datePublished"]',
    content: 'div.rsp_block_header p, div.rsp_block_text p, div.person_data h3, div.person_text p, div.rsp_block_quote p, div.rsp_author, a[itemprop="contentUrl"] img.owl-lazy.wpstickies',
    description: 'div.post_intro_text',
    link: 'li.post_holder.include > a',
    logo: 'https://roomble.com/wp-content/themes/roomble/images/rmb_logo_top.png',
    id: ''
  }
};

exports.elems = elems;