const path = require('path');

const getCacheDirs = (constants, inputs) => [
  constants.PUBLISH_DIR,
  inputs.cacheDir || env.CECIL_CACHE_DIR || '.cache'
];

module.exports = {
  async onPreBuild({constants, inputs, utils}) {
    if (process.cwd() === constants.PUBLISH_DIR) {
      utils.build.failBuild(
        `Your site’s publish directory is not set correctly (“${constants.PUBLISH_DIR}”).`
      );
    }

    const cacheDirs = getCacheDirs(constants, inputs);

    if (await utils.cache.restore(cacheDirs)) {
      console.log('Found the Cecil cache.');
    } else {
      console.log('Cecil cache not found.');
    }
  },
  async onPostBuild({constants, inputs, utils}) {
    const cacheDirs = getCacheDirs(constants, inputs);

    if (await utils.cache.save(cacheDirs)) {
      console.log('Stored the Cecil cache to speed up next builds.');
    } else {
      console.log('No Cecil build found.');
    }
  },
};
