export interface PlatformStats {
  scans_protected: number
  threats_blocked: number
  african_countries: number
  avg_scan_time_ms: number
}

const DEFAULT_STATS: PlatformStats = {
  scans_protected: 0,
  threats_blocked: 0,
  african_countries: 34,
  avg_scan_time_ms: 200,
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const apiUrl = process.env.NEXT_PUBLIC_STATS_API_URL

  if (!apiUrl) {
    return DEFAULT_STATS
  }

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      return DEFAULT_STATS
    }

    const data = await response.json()

    return {
      scans_protected: data.scans_protected ?? data.scansProtected ?? 0,
      threats_blocked: data.threats_blocked ?? data.threatsBlocked ?? 0,
      african_countries: data.african_countries ?? data.africanCountries ?? 34,
      avg_scan_time_ms: data.avg_scan_time_ms ?? data.avgScanTimeMs ?? 200,
    }
  } catch {
    return DEFAULT_STATS
  }
}
