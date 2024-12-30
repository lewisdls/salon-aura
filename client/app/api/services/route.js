import { v4 as uuidv4 } from "uuid";

const services = [
  {
    id: uuidv4(),
    name: "Corte de Pelo",
    price: 60,
    description:
      "El corte de pelo perfecto para resaltar tu estilo y personalidad. Nuestros estilistas profesionales te asesorarán para encontrar el look que mejor se adapte a ti, ya sea un cambio radical o un simple retoque.",
    image: "/haircut.jpg",
  },
  {
    id: uuidv4(),
    name: "Manicure",
    price: 700,
    description:
      "Dale un cuidado especial a tus manos con nuestro servicio de manicure. Incluye limpieza, limado, tratamiento de cutículas y la aplicación del esmalte que prefieras para lograr unas uñas impecables y saludables.",
    image: "/manicure.jpg",
  },
  {
    id: uuidv4(),
    name: "Pedicure",
    price: 800,
    description:
      "Relájate mientras cuidamos tus pies con nuestro servicio de pedicure. Tratamos durezas, cutículas y uñas para dejar tus pies suaves y con un acabado perfecto. Además, puedes elegir entre una amplia gama de esmaltes.",
    image: "/pedicure.jpg",
  },
  {
    id: uuidv4(),
    name: "Extensiones de Pelo",
    price: 1000,
    description:
      "Consigue el cabello largo y voluminoso que siempre has deseado con nuestras extensiones de alta calidad. Disponibles en varios estilos y colores, nuestras extensiones se adaptan perfectamente a tu look natural.",
    image: "/extensions.jpg",
  },
];

export async function GET(req) {
  return new Response(JSON.stringify(services), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
