export async function sendPushPlusMessage(token: string, title: string, content: string) {
  const apiUrl = process.env.PUSHPLUS_API_URL ?? "https://www.pushplus.plus/send";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      title,
      content,
      template: "markdown",
    }),
  });

  if (!response.ok) {
    throw new Error(`PushPlus request failed: ${response.status}`);
  }

  return response.json();
}
