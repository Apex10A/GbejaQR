import { Shield, Camera, ArrowRight } from "lucide-react"

const footerLinks = {
  Product: ["Camera Scan", "Gallery Upload", "Threat Detection", "API Access"],
  Resources: ["Documentation", "Blog", "Security Reports", "Status"],
  Company: ["About", "Contact", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      {/* CTA Banner */}
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-16 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/8 blur-[80px]" />

          <div className="relative p-8 text-center lg:p-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/20">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-foreground lg:text-3xl font-sans text-balance">
              Ready to scan with confidence?
            </h2>
            <p className="mb-6 text-muted-foreground max-w-md mx-auto">
              No sign-up. No downloads. Just open, scan, and stay safe.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/85 font-sans animate-glow-blue"
            >
              <Camera className="h-5 w-5" />
              Start Scanning
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/25">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-bold text-foreground font-sans">Cybergbeja</span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Scan with confidence.
            </p>
            <p className="text-xs text-muted-foreground">
              Protecting Africa{"'"}s mobile users, one scan at a time.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-foreground font-sans">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 lg:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Cybergbeja. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care for a safer digital Africa.
          </p>
        </div>
      </div>
    </footer>
  )
}
