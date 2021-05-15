const getCacheDirs = (constants, inputs) => [
  constants.PUBLISH_DIR,
  inputs.cacheDir || process.env.CECIL_CACHE_DIR || '.cache'
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
        title: 'Build cache',
        summary: 'Cecil cache restored from previous build. ' + cachedFiles.length + ' files.'
      })
      console.log('Cecil cache (%s) restored from previous build.', cacheDirs.join(', '));
      if (inputs.debug) printDebug(cachedFiles);
    } else {
      console.log('Cecil cache not found.');
    }
  },
  async onPostBuild({constants, inputs, utils}) {
    const cacheDirs = getCacheDirs(constants, inputs);

    if (await utils.cache.save(cacheDirs)) {
      const cachedFiles = await utils.cache.list();

      utils.status.show({
        title: 'Build cache',
        summary: 'Cecil cache stored to speed up next builds. ' + cachedFiles.length + ' files.'
      })
      console.log('Cecil cache (%s) stored to speed up next builds.', cacheDirs.join(', '));
      if (inputs.debug) printDebug(cachedFiles);
    } else {
      console.log('No Cecil build found.');
    }
  },
};
