import { v4 as uuidv4 } from "uuid";

const members = [
  {
    id: uuidv4(),
    name: "Aura De los Santos",
    role: "Peluquera",
    image: "/hairstylist.png",
  },
  {
    id: uuidv4(),
    name: "Ana Sanchez",
    role: "Peluquera",
    image: "/hairstylist-2.png",
  },
  {
    id: uuidv4(),
    name: "Florencia Ramos",
    role: "Manicurista",
    image: "/hairstylist-3.png",
  },
];

export async function GET(req) {
  return new Response(JSON.stringify(members), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
