import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import mm from "micromatch";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    paths: { base: "/svelte-photoswipe" },

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    package: {
      dir: "dist",
    },
  },
};

export default config;
