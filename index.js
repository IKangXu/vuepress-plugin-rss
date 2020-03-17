const path = require('path')
const RSS = require('rss')
const chalk = require('chalk')

module.exports = (options, ctx) => {
  return {
    name: 'rss',
    
    generated () {
      const fs = require('fs-extra')
      const { pages, sourceDir, themeConfig } = ctx
      const { filter = () => true, count = 20 } = options
      const siteData = require(path.resolve(sourceDir, '.vuepress/config.js'))

      const year = new Date().getFullYear()
      const author = themeConfig.author || siteConfig.title || 'IKangXu'

      const feed = new RSS({
        title: siteData.title,
        description: siteData.description,
        feed_url: `${options.site_url}/rss.xml`,
        site_url: `${options.site_url}`,
        copyright: `${options.copyright ? options.copyright : `${author} ${year}`}`,
        language: 'en',
      })

      pages
        .filter(page => filter(page.frontmatter))
        .map(page => ({...page, date: new Date(page.frontmatter.date || '')}))
        .sort((a, b) => b.date - a.date)
        .map(page => ({
          title: page.frontmatter.title,
          description: page.excerpt,
          url: `${options.site_url}${page.path}`,
          date: page.date,
        }))
        .slice(0, count)
        .forEach(page => feed.item(page))

      fs.writeFile(
        path.resolve(ctx.outDir, 'rss.xml'),
        feed.xml()
      );
      console.log(chalk.green.bold('RSS has been generated!'))
    }
  }
}