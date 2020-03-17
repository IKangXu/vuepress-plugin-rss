```js
[require('@ikangxu/vuepress-plugin-rss'), {
  base_url: '/', // required
  site_url: 'http://ikangxu.cn', // required
  copyright: 'IKangXu 2020', // optional
  // filter some post
  filter: (frontmatter) => { return [true|false] },
  // How much articles
  count: 20
}]
```