import { v4 as uuidv4 } from "uuid";

const appointments = [];

export async function GET() {
  return new Response(JSON.stringify(appointments), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const body = await req.json();
  const { client_name, client_phone, date, time, service } = body;

  if (!client_name || !client_phone || !date || !time || !service) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const newAppointment = {
    id: uuidv4(),
    client_name,
    client_phone,
    date,
    time,
    service,
  };

  appointments.push(newAppointment);
  return new Response(JSON.stringify(newAppointment), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
