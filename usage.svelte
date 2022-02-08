<script lang="ts">
  import PhotoSwipeGallery from "svelte-photoswipe";
  import type { GalleryItem } from "svelte-photoswipe";
  const images: GalleryItem[] = [];
  images.push({
    src: "https://picsum.photos/id/1/3000/4000",
    width: 3000,
    height: 4000,
    alt: "Photo", // optional
    cropped: true, // optional, default=false; see https://photoswipe.com/v5/docs/
    thumbnail: { src: "https://picsum.photos/id/1/300/400", width: 300, height: 400 },
  });
  // ...
</script>

<PhotoSwipeGallery {images} styling="flex" />
