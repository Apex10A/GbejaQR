"use client"

import { useEffect, useState } from "react"
import { Shield, ShieldCheck, ShieldAlert, ShieldX, Clock, ChevronRight, ArrowLeft } from "lucide-react"
import { getHistory, type ScanHistoryItem } from "@/lib/security"
import { Button } from "@/components/ui/button"

interface HistoryViewProps {
  onBack: () => void
  onItemClick: (item: ScanHistoryItem) => void
}

export function HistoryView({ onBack, onItemClick }: HistoryViewProps) {
  const [history, setHistory] = useState<ScanHistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHistory() {
      const data = await getHistory()
      setHistory(data)
      setLoading(false)
    }
    fetchHistory()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <ShieldCheck className="h-5 w-5 text-safe" />
      case "suspicious":
        return <ShieldAlert className="h-5 w-5 text-warning" />
      case "malicious":
      case "unsafe":
        return <ShieldX className="h-5 w-5 text-destructive" />
      default:
        return <Shield className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] mx-auto max-w-7xl flex-col">
      <div className="flex items-center gap-3 px-5 py-6 border-b border-border bg-white">
        <button onClick={onBack} className="text-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-foreground font-sans">Scan History</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
              <Clock className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No history yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Your recent scans will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick(item)}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-50 border border-border">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{item.url}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'verified' ? 'text-safe' : 
                      item.status === 'suspicious' ? 'text-warning' : 'text-destructive'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {new Date(item.scanned_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
