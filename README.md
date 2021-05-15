# netlify-plugin-cecil-cache

Persist the [Cecil](https://cecil.app) cache between Netlify builds.

## Usage

Add the following lines to your project's `netlify.toml` file:

```toml
[build]
  publish = "_site"

[[plugins]]
  package = "netlify-plugin-cecil-cache"
```

Add the plugin in `package.json`:

```bash
npm install -D netlify-plugin-cecil-cache
```

### Inputs

```toml
[build]
  publish = "_site"

[[plugins]]
package = "netlify-plugin-cecil-cache"

  [plugins.inputs]
  cacheDir = ".cache" # Custom cache directory. Optional.
  debug = true # Print full list of cached files in build log. Default = false.
```
