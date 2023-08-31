export interface Slideshow {
  id: string;
  name: string;
  slides: Slide[];
}

export interface Slide {
  id: string;
  title: string;
  description: string;
  image: Image;
}

export interface Image {
  id: string;
  url: string;
}

export interface Sport {
  id: string;
  name: string;
  category: string;
  image: Image;
}
