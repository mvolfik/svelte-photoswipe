<script lang="ts">
  import PhotoSwipeGallery from "$lib/PhotoSwipeGallery.svelte";

  let n = 10;
  const sizes = [208, 197, 302, 306, 320, 237, 256, 291, 111, 140];
  $: images = [...Array(n).keys()].map((i) => {
    const h = sizes[i % 10];
    const w = sizes[(i * 3) % 10];
    return {
      src: `https://picsum.photos/id/${i * 2}/${w}0/${h}0`,
      width: w * 10,
      height: h * 10,
      thumbnail: { src: `https://picsum.photos/id/${i * 2}/${w}/${h}`, width: w, height: h },
    };
  });

  let individual = false;
  let styling: "none" | "grid" | "flex" = "flex";
  let gridColumns = 5;
</script>

<svelte:head>
  <title>svelte-photoswipe</title>
</svelte:head>

<h1>svelte-photoswipe</h1>
<p>
  GitHub repository: <a href="https://github.com/mvolfik/svelte-photoswipe"
    >mvolfik/svelte-photoswipe</a
  >
</p>
<p>NPM: <a href="https://npmjs.com/package/svelte-photoswipe">svelte-photoswipe</a></p>
<h2>Usage:</h2>
<div class="outer">
  <pre style="overflow: auto;"><code
      >&lt;script lang="ts"&gt;
  import PhotoSwipeGallery from "svelte-photoswipe";
  import type &lbrace; GalleryItem &rbrace; from "svelte-photoswipe";
  const images: GalleryItem[] = [];
  images.push(&lbrace;
    src: "https://picsum.photos/id/1/3000/4000",
    width: 3000,
    height: 4000,
    alt: "Photo", // optional
    cropped: true, // optional, default=false; see https://photoswipe.com/v5/docs/ <!-- TODO: more specific link -->
    thumbnail: &lbrace; src: "https://picsum.photos/id/1/300/400", width: 300, height: 400 &rbrace;,
  &rbrace;);
  // ...
&lt;/script&gt;

&lt;PhotoSwipeGallery &lbrace;images&rbrace;{individual ? " individual" : ""}{styling === "none"
        ? ""
        : ` styling="${styling}"`}{styling !== "grid"
        ? ""
        : ` gridColumns={${gridColumns}}`} /&gt;</code
    ></pre>
  <div class="knobby">
    <h3>Customize:</h3>
    <p><label><input type="checkbox" bind:checked={individual} /> Individual</label></p>

    <p><label>Images in gallery: <input type="number" bind:value={n} min="0" /></label></p>

    <fieldset>
      <legend>Styling</legend>
      <label><input type="radio" name="styling" value="none" bind:group={styling} />None</label>
      <label><input type="radio" name="styling" value="grid" bind:group={styling} />Grid</label>
      <label class="child"
        >Grid columns: <input type="range" min="2" max="10" bind:value={gridColumns} /></label
      >
      <label><input type="radio" name="styling" value="flex" bind:group={styling} />Flex</label>
    </fieldset>
  </div>
</div>

<PhotoSwipeGallery {images} {individual} {styling} {gridColumns} />

<style>
  fieldset {
    display: inline grid;
    margin: 0 0.3rem 1rem;
    padding-right: 3rem;
  }
  fieldset > label:not(:first-child):not(.child) {
    margin-top: 0.3rem;
  }
  fieldset > label.child {
    padding-left: 1.5rem;
  }
  fieldset > label > input[type="range"] {
    vertical-align: middle;
  }
  fieldset > label > input {
    margin: 0 0.3rem;
  }

  div.outer {
    display: grid;
  }
  @media (min-width: 70rem) {
    div.outer {
      grid-template-columns: auto 1fr;
    }
  }
</style>
