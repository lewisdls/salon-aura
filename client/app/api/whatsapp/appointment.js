// Birthday greeting job
// Queries customers whose birthday matches today (month + day) and sends
// them a WhatsApp template message with a discount code.
//
// Pre-requisites:
//   1. A WhatsApp message template named "birthdays" approved in Meta Business.
//      Body parameters: {{1}} = first name, {{2}} = discount, {{3}} = code.
//   2. Customers must have a phone number stored in E.164 format (e.g. +18095551234).
//   3. Environment variables: WHATSAPP_TOKEN, WHATSAPP_PHONE_ID

const crypto = require("crypto");
const { sendTemplate, sendText } = require("./client");

const TEMPLATE_NAME = "appointment_confirmation";
const TEMPLATE_LANG = "es";
const ADMIN_PHONE = process.env.ADMIN_PHONE;

async function sendAppointmentConfirmation(phone, name, date, hour) {
    try {

      // Template body parameters
      const components = [
        {
          type: "body",
          parameters: [
            { type: "text", text: name },
            { type: "text", text: date },
            { type: "text", text: hour },
          ],
        },
      ];

      await sendTemplate(phone, TEMPLATE_NAME, TEMPLATE_LANG, components);
      await sendText(ADMIN_PHONE, `${name} has scheduled an appointment for ${date} at ${hour}`);

      console.log(`Appointment confirmation sent to ${phone} for ${date} at ${hour}`);
    } catch (err) {
        console.error("Error sending appointment confirmation:", err);
    }
  }

module.exports = { sendAppointmentConfirmation };
