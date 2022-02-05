<script context="module" lang="ts">
  export interface GalleryItem {
    src: string;
    thumbnail?: {
      src: string;
      width: number;
      height: number;
    };
    width: number;
    height: number;
    cropped?: boolean;
    alt?: string;
  }
  export type GalleryData = Array<GalleryItem>;
</script>

<script lang="ts">
  import "photoswipe/dist/photoswipe.css";
  import PhotoSwipeLightbox from "photoswipe/dist/photoswipe-lightbox.esm";
  import PhotoSwipe from "photoswipe/dist/photoswipe.esm";

  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let images: GalleryData;
  export let individual = false;
  export let styling: "none" | "grid" | "flex" = "none";
  export let gridColumns = 5;

  let element: HTMLDivElement;

  const options = writable(undefined);
  $: {
    // update opts on any change to config params as well as
    // to image data (otherwise we risk triggering weird pswp bugs)

    if (!element || !Array.isArray(images)) break $;

    const opts: any = { pswpModule: PhotoSwipe };
    if (individual) {
      opts.gallery = element.childNodes;
    } else {
      opts.children = element.childNodes;
      opts.gallery = element;
    }
    $options = opts;
  }

  onMount(() => {
    let lightbox;
    // on each update, destroy any previous lightbox (to avoid weird bugs) and init new lightbox with new opts
    // note that subscribe runs the function immediately for the first time
    const unsub = options.subscribe((opts) => {
      lightbox?.destroy?.();
      if (opts === undefined) return;
      lightbox = new PhotoSwipeLightbox(opts);
      lightbox.init();
    });
    return () => {
      unsub();
      lightbox?.destroy?.();
    };
  });
</script>

<div class="gallery styling-{styling}" style:--grid-columns={gridColumns} bind:this={element}>
  {#each images as img}
    {@const thumb = img.thumbnail ?? img}
    <a href={img.src} data-pswp-width={img.width} data-pswp-height={img.height} target="_blank"
      ><img src={thumb.src} alt={img.alt ?? ""} width={thumb.width} height={thumb.height} /></a
    >
  {/each}
</div>

<style>
  .gallery.styling-flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.5rem;
  }

  .gallery.styling-grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
    justify-items: center;
    align-items: center;
    gap: 0.5rem;
  }

  .gallery > a > img {
    vertical-align: bottom;
    max-width: 100%;
    height: auto;
  }
</style>
