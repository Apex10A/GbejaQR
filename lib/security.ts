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

export interface ScanHistoryItem extends ScanResult {
  id: string
  scanned_at: string
  cached_result: boolean
}

export async function verifyUrl(url: string): Promise<ScanResult> {
  const apiUrl = process.env.NEXT_PUBLIC_SCAN_API_URL || "https://gbeja-qr.vercel.app/api/scan";
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

export async function getHistory(): Promise<ScanHistoryItem[]> {
  const historyUrl = process.env.NEXT_PUBLIC_HISTORY_API_URL || "https://gbeja-qr.vercel.app/api/history";
  try {
    const response = await fetch(historyUrl);
    if (!response.ok) throw new Error("Failed to fetch history");
    const data = await response.json();
    
    return data.map((item: any) => {
      let status: SecurityStatus = "verified";
      if (!item.is_safe) status = "malicious";
      else if (item.safety_score < 70) status = "suspicious";
      
      let publisher = "Publisher";
      try {
        if (item.site_info?.category) {
          publisher = item.site_info.category;
        } else if (item.url) {
          publisher = new URL(item.url).hostname.split(".").slice(-2, -1)[0].toUpperCase();
        }
      } catch (err) {
        // ignore
      }

      return {
        ...item,
        status,
        threatType: item.is_safe ? undefined : (item.analysis?.threat_database?.reason || "Malicious Link"),
        threatLevel: Math.ceil((100 - (item.safety_score || 0)) / 20),
        publisher,
      };
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
}
