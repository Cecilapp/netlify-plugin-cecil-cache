# netlify-plugin-cecil-cache

Persist the [Cecil](https://cecil.app) cache between Netlify builds.

## Usage

There are two ways to install this plugin on your application:

### Installing from Netlify UI

[One-click install](http://app.netlify.com/plugins/netlify-plugin-cecil-cache/install) to add this to your Cecil site.

### Installing with Netlify configuration file

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
