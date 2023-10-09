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

export interface Competition {
  id: string;
  name: string;
  description: string;
  logo: Image;
  location: Location;
  sport: Sport;
  organizer: Organizer;
  startDate: Date;
  enrollmentLink: string;
  endDate: Date;
  createdAt: string;
}

export interface Location {
  id: string;
  name: string;
  url: string;
  address: Address;
}

export interface Sport {
  id: string;
  name: string;
  category: string;
  image: Image;
}

export interface Organizer {
  id: string;
  name: string;
  url: string;
  address: Address;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  zip: string;
  city: string;
  state: string;
  country: string;
}

export interface Image {
  id: string;
  creatorLink: string;
  url: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  competitions: Competition[];
}
