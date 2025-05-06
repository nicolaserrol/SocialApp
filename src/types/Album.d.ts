interface Album {
  id: number;
  title: string;
  userId: number;
  thumbnails: string[];
  photos?: Photo[];
}
