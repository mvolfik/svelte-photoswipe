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
</script>

<p><label><input type="checkbox" bind:checked={individual} /> Individual</label></p>

<p><label>n = <input type="number" bind:value={n} /></label></p>

<PhotoSwipeGallery {images} {individual} />
