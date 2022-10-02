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
      const cachedFiles = await utils.cache.list();

      utils.status.show({
        title: cachedFiles.length + ' files restored',
        summary: 'Cecil cache restored from previous build. ' + cachedFiles.length + ' files.'
      })
      console.log('%s files from Cecil cache (%s) restored from previous build.', cachedFiles.length, cacheDirs.join(', '));
      if (inputs.debug || process.env.CECIL_DEBUG) printDebug(cachedFiles);
    } else {
      console.log('Cache not found.');
    }
  },
  async onPostBuild({constants, inputs, utils}) {
    const cacheDirs = getCacheDirs(constants, inputs);

    if (await utils.cache.save(cacheDirs)) {
      const cachedFiles = await utils.cache.list();

      utils.status.show({
        title: cachedFiles.length + ' files stored',
        summary: 'Cecil cache stored to speed up next builds. ' + cachedFiles.length + ' files.'
      })
      console.log('%s files from Cecil cache (%s) stored to speed up next builds.', cachedFiles.length, cacheDirs.join(', '));
      if (inputs.debug || process.env.CECIL_DEBUG) printDebug(cachedFiles);
    } else {
      console.log('Cecil cache not found.');
    }
  },
};
