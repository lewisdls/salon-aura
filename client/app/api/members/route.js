import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const members = await prisma.member.findMany();
    return new Response(JSON.stringify(members), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch members." }), {
      status: 500,
    });
  }
}
