const getCacheDirs = (constants, inputs) => [
  inputs.cacheDir || process.env.CECIL_CACHE_DIR
];

const printDebug = (items) => {
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
}

module.exports = {
  async onPreBuild({constants, inputs, utils}) {
    if (process.cwd() === constants.PUBLISH_DIR) {
      utils.build.failBuild(
        `Your site’s publish directory is not set correctly (“${constants.PUBLISH_DIR}”).`
      );
    }

    const cacheDirs = getCacheDirs(constants, inputs);

    if (await utils.cache.restore(cacheDirs)) {
      const cachedFolders = await utils.cache.list();

      utils.status.show({
        title: cachedFolders.length + ' cache folders restored',
        summary: 'Cecil’s cache restored from previous build. ' + cachedFolders.length + ' folders.'
      })
      console.log('%s folders from Cecil’s cache (%s) restored from previous build.', cachedFolders.length, cacheDirs.join(', '));
      if (inputs.debug || process.env.CECIL_DEBUG) printDebug(cachedFolders);
    } else {
      console.log('Cache not found.');
    }
  },
  async onPostBuild({constants, inputs, utils}) {
    const cacheDirs = getCacheDirs(constants, inputs);

    if (await utils.cache.save(cacheDirs)) {
      const cachedFolders = await utils.cache.list();

      utils.status.show({
        title: cachedFolders.length + ' cache folders stored',
        summary: 'Cecil’s cache stored to speed up next builds. ' + cachedFolders.length + ' folders.'
      })
      console.log('%s folders from Cecil’s cache (%s) stored to speed up next builds.', cachedFolders.length, cacheDirs.join(', '));
      if (inputs.debug || process.env.CECIL_DEBUG) printDebug(cachedFolders);
    } else {
      console.log('Cecil’s cache not found.');
    }
  },
};
