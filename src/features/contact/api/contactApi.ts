export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message?: string;
  error?: string;
}

export const contactApi = {
  async sendMessage(payload: ContactPayload): Promise<ContactResponse> {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: ContactResponse = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to send message");
    }

    return data;
  },
};
