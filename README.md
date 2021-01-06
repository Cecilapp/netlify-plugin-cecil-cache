# netlify-plugin-cecil-cache

Persist the Cecil cache between Netlify builds.

## Usage

Add the following lines to your project's `netlify.toml` file:

```toml
[build]
  publish = "_site"

[[plugins]]
  package = "netlify-plugin-cecil-cache"
```
