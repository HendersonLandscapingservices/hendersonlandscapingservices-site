function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function safeString(v, max = 2000) {
  return String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function isEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export async function onRequestPost({ request, env }) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false, error: "Expected application/json" }, 415);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const name = safeString(payload.name, 120);
  const email = safeString(payload.email, 200);
  const phone = safeString(payload.phone, 80);
  const postcode = safeString(payload.postcode, 30);
  const service = safeString(payload.service, 80);
  const availability = safeString(payload.availability, 500);
  const details = safeString(payload.details, 2000);
  const photosLink = safeString(payload.photosLink, 300);
  const pageUrl = safeString(payload.pageUrl, 300);

  if (!name || !email || !postcode || !service) {
    return json(
      { ok: false, error: "Missing required fields (name, email, postcode, service)" },
      400
    );
  }
  if (!isEmail(email)) {
    return json({ ok: false, error: "Invalid email address" }, 400);
  }

  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "";
  const userAgent = request.headers.get("User-Agent") || "";

  const subject = `New website enquiry: ${service} (${postcode})`;

  const text = [
    "New enquiry received via Henderson Landscaping Services website",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Postcode: ${postcode}`,
    `Service: ${service}`,
    availability ? `Preferred times: ${availability}` : null,
    details ? `Details: ${details}` : null,
    photosLink ? `Photos/plan link: ${photosLink}` : null,
    pageUrl ? `Page URL: ${pageUrl}` : null,
    "",
    ip ? `IP: ${ip}` : null,
    userAgent ? `User-Agent: ${userAgent}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Postcode:</strong> ${escapeHtml(postcode)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      ${availability ? `<p><strong>Preferred times:</strong> ${escapeHtml(availability)}</p>` : ""}
      ${details ? `<p><strong>Details:</strong><br/>${escapeHtml(details)}</p>` : ""}
      ${photosLink ? `<p><strong>Photos/plan link:</strong> ${linkify(photosLink)}</p>` : ""}
      ${pageUrl ? `<p><strong>Page URL:</strong> ${linkify(pageUrl)}</p>` : ""}
      <hr/>
      <p style="color:#666; font-size:12px;">
        ${ip ? `IP: ${escapeHtml(ip)}<br/>` : ""}
        ${userAgent ? `User-Agent: ${escapeHtml(userAgent)}` : ""}
      </p>
    </div>
  `;

  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO || !env.ENQUIRY_FROM) {
    console.log("Missing env vars:", {
      hasKey: Boolean(env.RESEND_API_KEY),
      hasTo: Boolean(env.ENQUIRY_TO),
      hasFrom: Boolean(env.ENQUIRY_FROM),
    });
    return json({ ok: false, error: "Server not configured" }, 500);
  }

  const resendResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM,
      to: [env.ENQUIRY_TO],
      subject,
      text,
      html,
      reply_to: email,
    }),
  });

  if (!resendResp.ok) {
    const errText = await resendResp.text().catch(() => "");
    console.log("Resend error:", resendResp.status, errText);
    return json({ ok: false, error: "Failed to send enquiry email" }, 500);
  }

  return json({ ok: true });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function linkify(url) {
  const safe = escapeHtml(url);
  return `<a href="${safe}" target="_blank" rel="noreferrer">${safe}</a>`;
}
