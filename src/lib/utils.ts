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
