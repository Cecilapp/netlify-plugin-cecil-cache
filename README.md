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
