"use server";

export async function submitFreeDiagnostic(data: any) {
  const url = process.env.NEXT_FREE_DIAGNOSTIC_URL;
  console.log("Sending to: ", url);
  if (!url) {
    console.error("NEXT_FREE_DIAGNOSTIC_URL is not defined");
    return { success: false, error: "Configuration error" };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit");
    }

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "Submission failed" };
  }
}

export async function submitContactForm(data: any) {
  const url = process.env.NEXT_CONTACT_URL;
  if (!url) {
    console.error("NEXT_CONTACT_URL is not defined");
    return { success: false, error: "Configuration error" };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit");
    }

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "Submission failed" };
  }
}
