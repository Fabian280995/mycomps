import { Slideshow } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/slideshows`;

const getHeroSlideshow = async (): Promise<Slideshow> => {
  const res = await fetch(URL);
  const data = await res.json();

  if (data.length >= 0) {
    return data[0];
  }

  return {} as Slideshow;
};

export default getHeroSlideshow;
