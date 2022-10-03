# netlify-plugin-cecil-cache

This [Netlify plugins](https://www.netlify.com/products/build/plugins/) persist the [Cecil](https://cecil.app)’s cache between Netlify builds.

## Usage

There are two ways to install this plugin:

### Installing from [Netlify UI](https://app.netlify.com/teams/cecil-app/plugins?search=cecil)

[One-click install](http://app.netlify.com/plugins/netlify-plugin-cecil-cache/install) to add this to your Cecil site.

### Installing from [npm](https://www.npmjs.com/package/netlify-plugin-cecil-cache)

Add the plugin in `package.json`:

```bash
npm install -D netlify-plugin-cecil-cache
```

Add the following lines to your project's `netlify.toml` file:

```toml
[build]
  publish = "_site"

[[plugins]]
  package = "netlify-plugin-cecil-cache"
```

### Available inputs

```toml
[[plugins]]
  package = "netlify-plugin-cecil-cache"
  [plugins.inputs]
  cacheDir = ".cache" # Cache directory (`.cache` by default)
  debug = true        # Print full list of cached files in build log (`false` by default)
```

## License

_netlify-plugin-cecil-cache_ is a free software distributed under the terms of the MIT license.

© [Arnaud Ligny](https://arnaudligny.fr)
