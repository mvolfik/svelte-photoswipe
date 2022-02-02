<script lang="ts">
  import "photoswipe/dist/photoswipe.css";
  import PhotoSwipeLightbox from "photoswipe/dist/photoswipe-lightbox.esm";
  import PhotoSwipe from "photoswipe/dist/photoswipe.esm";

  import { onMount } from "svelte";

  import type { GalleryData } from "./utils";
  import { writable } from "svelte/store";

  export let images: GalleryData;
  export let individual = false;

  let element: HTMLDivElement;

  const options = writable(undefined);
  $: {
    if (!element || !images) break $;

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

<div class="gallery" bind:this={element}>
  {#each images as img}
    {@const thumb = img.thumbnail ?? img}
    <a href={img.src} data-pswp-width={img.width} data-pswp-height={img.height} target="_blank"
      ><img src={thumb.src} alt={img.alt ?? ""} width={thumb.width} height={thumb.height} /></a
    >
  {/each}
</div>
