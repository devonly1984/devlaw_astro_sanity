import LuxuryImg from "../assets/luxury.webp";
import DeluxeImg from "../assets/deluxe.webp";
import ExecutiveImg from "../assets/executive.webp";
interface CategoryProps {
  name: string;
  image: ImageMetadata;
  url: string;
}

export const categories: CategoryProps[] = [
    {name: "Luxury Suites",
        image: LuxuryImg,
        url: "/luxury-rooms"
    },
    {
        name: "Deluxe Rooms",
        image: DeluxeImg,
        url: "/deluxe-rooms"
    },
    {
        name: "Executive Suites",
        image: ExecutiveImg,
        url: "/executive-rooms"
    }
];