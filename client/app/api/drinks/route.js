import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const drinks = await prisma.drink.findMany({
      orderBy: { price: "asc" },
    });
    return new Response(JSON.stringify(drinks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching drinks:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch drinks." }),
      { status: 500 }
    );
  }
}
