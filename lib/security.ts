export type SecurityStatus = "verified" | "suspicious" | "malicious" | "unsafe" | "error"

export interface ScanResult {
  url: string
  status: SecurityStatus
  is_safe: boolean
  safety_score: number
  advice: string
  site_info?: {
    title: string
    description: string
    og_image: string
    category: string
  }
  analysis?: any
  history_id?: string
  // Legacy fields for UI compatibility
  threatType?: string
  threatLevel?: number
  publisher?: string
}

export async function verifyUrl(url: string): Promise<ScanResult> {
  const apiUrl = process.env.NEXT_PUBLIC_SCAN_API_URL || "--";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url || "https://example.com" }), // Ensure we have a URL
    })

    if (!response.ok) {
      throw new Error(`Failed to scan URL: ${response.statusText}`);
    }

    const data = await response.json()

    
    // Map API response to ScanResult
    let status: SecurityStatus = "verified"
    if (!data.is_safe) {
      status = "malicious"
    } else if (data.safety_score < 70) {
      status = "suspicious"
    }

    let publisher = "Publisher";
    try {
      if (data.site_info?.category) {
        publisher = data.site_info.category;
      } else if (url) {
        publisher = new URL(url).hostname.split(".").slice(-2, -1)[0].toUpperCase();
      }
    } catch (err) {
      console.warn("Error parsing URL for publisher:", err);
    }

    return {
      ...data,
      status,
      // Map new fields to legacy fields for UI
      threatType: data.is_safe ? undefined : (data.analysis?.threat_database?.reason || "Malicious Link"),
      threatLevel: Math.ceil((100 - (data.safety_score || 0)) / 20),
      publisher,
    }
  } catch (e) {
    console.error("Scan error details:", e);
    return {
      url,
      status: "error",
      is_safe: false,
      safety_score: 0,
      advice: "Failed to connect to security engine. Please try again.",
      threatType: "Connection Error",
    }
  }
}
