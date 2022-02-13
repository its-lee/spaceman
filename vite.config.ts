// vite.config.js
import { defineConfig } from 'vite';
import { name } from './package.json';

export default defineConfig({
  // This is required so when hosting on github pages, index.html uses relative paths rather than
  // absolute, which is necessary as the base url is https://cygnut.github.io/spaceman/, not
  // something like https://cygnut.github.io/ - where absolute rather than relative would work.
  //   From https://vitejs.dev/guide/static-deploy.html#github-pages
  base: `/${name}/`
});