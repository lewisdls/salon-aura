// WhatsApp Business API client
// Wraps the Cloud API (graph.facebook.com) for sending messages.
//
// Required env vars:
//   WHATSAPP_TOKEN          – Permanent system-user access token
//   WHATSAPP_PHONE_ID       – Phone number ID from Meta Business dashboard
//   WHATSAPP_BUSINESS_NAME  – Display name used in message templates (optional)
//   WHATSAPP_TEST_RECIPIENT – Local dev only (set in .env, never in prod):
//                             redirects EVERY outgoing message to this number
//                             so jobs can run safely against real data.

const GRAPH_API = "https://graph.facebook.com/v25.0";

async function postMessage(body) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const testRecipient = process.env.WHATSAPP_TEST_RECIPIENT;

  if (!token || !phoneId) {
    throw new Error(
      "WhatsApp env vars not configured (WHATSAPP_TOKEN, WHATSAPP_PHONE_ID)",
    );
  }

  if (testRecipient) {
    body = { ...body, to: testRecipient };
  }

  const res = await fetch(`${GRAPH_API}/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const errMsg = data?.error?.message || JSON.stringify(data);
    throw new Error(`WhatsApp API error (${res.status}): ${errMsg}`);
  }

  console.log("WhatsApp API response:", data);

  return data;
}

/**
 * Send a free-form text message via WhatsApp Cloud API.
 * Note: free-form messages are only delivered inside the 24-hour customer
 * service window (i.e. the recipient messaged the business in the last 24h).
 * Outside that window Meta requires a pre-approved template.
 *
 * @param {string}  to         – Recipient phone in E.164 format (e.g. +18095551234)
 * @param {string}  text       – Message body (supports WhatsApp formatting like *bold*)
 * @returns {Promise<object>}  – API response
 */
async function sendText(to, text) {
  return postMessage({
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text }
  });
}

/**
 * Send a pre-approved template message via WhatsApp Cloud API.
 *
 * @param {string} to          – Recipient phone in E.164 format (e.g. +18095551234)
 * @param {string} template    – Template name registered in Meta Business
 * @param {string} langCode    – Template language code (e.g. 'es' or 'en_US')
 * @param {Array}  components  – Template component parameters (header/body)
 * @returns {Promise<object>}  – API response
 */
async function sendTemplate(to, template, langCode, components = []) {
  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: template,
      language: { code: langCode },
    },
  };

  if (components.length) {
    body.template.components = components;
  }

  console.log("Sending WhatsApp template message:", body);

  return postMessage(body);
}

module.exports = { sendText, sendTemplate };
