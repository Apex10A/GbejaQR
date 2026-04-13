export type SecurityStatus = "verified" | "suspicious" | "malicious" | "unsafe"

export interface ScanResult {
  url: string
  status: SecurityStatus
  threatType?: string
  threatLevel?: number
  publisher?: string
}

const MALICIOUS_DOMAINS = [
  "phish-login.com",
  "secure-update-now.net",
  "bank-verify-account.info",
  "giftcard-claim.xyz",
  "malware-download.biz",
]

const SUSPICIOUS_KEYWORDS = [
  "login",
  "verify",
  "account",
  "secure",
  "update",
  "free",
  "prize",
  "winner",
  "urgent",
]

const SUSPICIOUS_TLDS = [".xyz", ".top", ".buzz", ".gq", ".tk", ".cf", ".ga", ".ml"]

export function verifyUrl(url: string): ScanResult {
  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname.toLowerCase()

    // 1. Check for known malicious domains
    if (MALICIOUS_DOMAINS.some((domain) => hostname.includes(domain))) {
      return {
        url,
        status: "malicious",
        threatType: "Phishing/Credential Harvest",
        threatLevel: 5,
      }
    }

    // 2. Check for suspicious patterns
    let suspicionScore = 0

    // Check for IP address instead of domain
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      suspicionScore += 3
    }

    // Check for suspicious TLDs
    if (SUSPICIOUS_TLDS.some((tld) => hostname.endsWith(tld))) {
      suspicionScore += 2
    }

    // Check for too many subdomains
    if (hostname.split(".").length > 3) {
      suspicionScore += 1
    }

    // Check for keywords in path or hostname
    const fullString = (hostname + parsedUrl.pathname).toLowerCase()
    SUSPICIOUS_KEYWORDS.forEach((keyword) => {
      if (fullString.includes(keyword)) {
        suspicionScore += 0.5
      }
    })

    if (suspicionScore >= 4) {
      return {
        url,
        status: "malicious",
        threatType: "Potential Malware/Phishing",
        threatLevel: 4,
      }
    }

    if (suspicionScore >= 2) {
      return {
        url,
        status: "suspicious",
        threatType: "Untrusted Source",
        threatLevel: 2,
      }
    }

    // 3. Default to verified (for demo purposes)
    return {
      url,
      status: "verified",
      publisher: hostname.split(".").slice(-2, -1)[0].toUpperCase(),
    }
  } catch (e) {
    return {
      url,
      status: "unsafe",
      threatType: "Invalid URL Format",
    }
  }
}
