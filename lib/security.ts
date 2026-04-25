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
  const apiUrl = process.env.NEXT_PUBLIC_SCAN_API_URL;
  if (!apiUrl) {
    return {
      url,
      status: "error",
      is_safe: false,
      safety_score: 0,
      advice: "Security engine configuration missing.",
      threatType: "Configuration Error",
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url || "https://example.com" }),
    })

    if (!response.ok) {
      throw new Error(`Failed to scan URL: ${response.statusText}`);
    }

    const data = await response.json()
    
    let status: SecurityStatus = "verified"
    if (!data.is_safe) {
      status = "malicious"
    } else if (data.safety_score < 70) {
      status = "suspicious"
    }

    const getPublisher = (item: any, fallbackUrl: string) => {
      const category = item.site_info?.category;
      const description = item.site_info?.description;
      
      if (category && category.toLowerCase() !== "unknown") {
        return category;
      }
      
      if (description && description.toLowerCase() !== "unknown") {
        return description;
      }
      
      if (fallbackUrl) {
        try {
          return new URL(fallbackUrl).hostname.split(".").slice(-2, -1)[0].toUpperCase();
        } catch (err) {
          console.warn("Error parsing URL for publisher:", err);
        }
      }
      
      return "Publisher";
    };

    const publisher = getPublisher(data, url);

    return {
      ...data,
      status,
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
  const historyUrl = process.env.NEXT_PUBLIC_HISTORY_API_URL;
  if (!historyUrl) {
    console.warn("History API URL missing");
    return [];
  }
  
  const getPublisher = (item: any, fallbackUrl: string) => {
    const category = item.site_info?.category;
    const description = item.site_info?.description;
    
    if (category && category.toLowerCase() !== "unknown") {
      return category;
    }
    
    if (description && description.toLowerCase() !== "unknown") {
      return description;
    }
    
    if (fallbackUrl) {
      try {
        return new URL(fallbackUrl).hostname.split(".").slice(-2, -1)[0].toUpperCase();
      } catch (err) {
      }
    }
    
    return "Publisher";
  };

  try {
    const response = await fetch(historyUrl);
    if (!response.ok) throw new Error("Failed to fetch history");
    const data = await response.json();
    
    return data.map((item: any) => {
      let status: SecurityStatus = "verified";
      if (!item.is_safe) status = "malicious";
      else if (item.safety_score < 70) status = "suspicious";
      
      const publisher = getPublisher(item, item.url);

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
