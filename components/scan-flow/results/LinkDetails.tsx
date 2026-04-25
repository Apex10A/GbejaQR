"use client"

import { Lock, Globe, Shield, Activity, Database, CheckCircle2, AlertTriangle, Info } from "lucide-react"
import { type ScanResult } from "@/lib/security"

interface LinkDetailsProps {
  result: ScanResult
}

export function LinkDetails({ result }: LinkDetailsProps) {
  const analysis = result.analysis

  if (!analysis) return null

  const sections = [
    {
      title: "Connection & SSL",
      icon: <Lock className="h-4 w-4 text-safe" />,
      items: [
        { label: "HTTPS", value: analysis.heuristics?.is_https ? "Yes" : "No", status: analysis.heuristics?.is_https ? "safe" : "warning" },
        { label: "Redirected", value: analysis.resolution?.was_redirected ? "Yes" : "No", status: analysis.resolution?.was_redirected ? "warning" : "safe" },
        { label: "SSL Valid", value: analysis.ssl?.valid ? "Yes" : "No", status: analysis.ssl?.valid ? "safe" : "danger" },
        { label: "Issuer", value: analysis.ssl?.issuer || "Unknown" },
      ]
    },
    {
      title: "Security Analysis",
      icon: <Shield className="h-4 w-4 text-safe" />,
      items: [
        { 
          label: "Look-alike Domain", //Homograph 
          value: analysis.heuristics?.homograph?.suspicious ? "Warning: Fake Characters" : "Authentic Characters", 
          status: analysis.heuristics?.homograph?.suspicious ? "danger" : "safe" 
        },
        { 
          label: "Brand Impersonation", //Typosquatting
          value: analysis.heuristics?.typosquatting?.is_typo ? "Potential Typosquat" : "Clean Domain", 
          status: analysis.heuristics?.typosquatting?.is_typo ? "danger" : "safe" 
        },
        { 
          label: "Decoded Domain", //Decoded Homograph
          value: analysis.heuristics?.homograph?.decoded_name || "N/A",
          status: analysis.heuristics?.homograph?.is_idn ? "warning" : "safe"
        },
        { label: "Domain Entropy", value: analysis.heuristics?.entropy_score || "N/A" },
        { 
          label: "High-Risk TLD", 
          value: analysis.heuristics?.is_high_risk_tld ? "Yes" : "No", 
          status: analysis.heuristics?.is_high_risk_tld ? "danger" : "safe" 
        },
      ]
    },
    {
      title: "Network & Reputation",
      icon: <Globe className="h-4 w-4 text-safe" />,
      items: [
        { label: "IP Address", value: analysis.ip_reputation?.ip || "N/A" },
        { label: "ISP", value: analysis.ip_reputation?.reputation?.isp || "N/A" },
        { label: "Country", value: analysis.ip_reputation?.reputation?.country || "N/A" },
        { label: "Abuse Score", value: analysis.ip_reputation?.reputation?.abuse_score || "0" },
      ]
    },
    {
      title: "Threat Intelligence",
      icon: <Database className="h-4 w-4 text-safe" />,
      items: [
        { label: "Database", value: analysis.threat_database?.is_malicious ? "Malicious" : "Clean", status: analysis.threat_database?.is_malicious ? "danger" : "safe" },
        { label: "Reason", value: analysis.threat_database?.reason || "N/A" },
        { label: "Category", value: result.site_info?.category || "Unknown" },
      ]
    }
  ]

  return (
    <div className="px-6 py-4 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      {sections.map((section, idx) => (
        <div key={idx} className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-border/50">
            {section.icon}
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider font-sans">
              {section.title}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx} className="space-y-1">
                <p className="text-[10px] text-muted-foreground font-sans">{item.label}</p>
                <div className="flex items-center gap-1.5">
                  <p className={`text-xs font-semibold font-sans ${
                    item.status === 'safe' ? 'text-safe' : 
                    item.status === 'warning' ? 'text-amber-500' : 
                    item.status === 'danger' ? 'text-destructive' : 
                    'text-foreground'
                  }`}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {analysis.visual_preview?.screenshot_url && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-border/50">
            <Activity className="h-4 w-4 text-safe" />
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider font-sans">
              Visual Preview
            </h3>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-muted">
            <img 
              src={analysis.visual_preview.screenshot_url} 
              alt="Site Preview" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}
