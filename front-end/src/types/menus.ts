export interface Menu {
  id: number;
  title: string;
  imageUrl: string;
  subcategories?: string[];
}

export const menus: Menu[] = [
  {
    id: 1,
    title: "NEW",
    imageUrl: "/images/mainscreen1.jpg",
  },
  {
    id: 2,
    title: "BEST",
    imageUrl: "/images/mainscreen2.jpg",
  },
  {
    id: 3,
    title: "WOMEN",
    imageUrl: "/images/mainscreen3.jpg",
    subcategories: ["OUTER", "TOP", "BOTTOM", "SHOES"],
  },
  {
    id: 4,
    title: "MEN",
    imageUrl: "/images/mainscreen4.jpg",
    subcategories: ["OUTER", "TOP", "BOTTOM", "SHOES"],
  },
  {
    id: 5,
    title: "ACC",
    imageUrl: "/images/mainscreen5.jpg",
    subcategories: ["BAG", "HEADWEAR", "INTERIOR"],
  },
];
