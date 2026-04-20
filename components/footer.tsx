import { Shield, Camera, ArrowRight } from "lucide-react"
import Image from "next/image"

const footerLinks = {
  Product: ["Camera Scan", "Gallery Upload", "Threat Detection", "API Access"],
  Resources: ["Documentation", "Blog", "Security Reports", "Status"],
  Company: ["About", "Contact", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-16 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 relative">
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">

          <div className="">
            <div className="mb-4 flex items-center gap-2.5">
             <Image src="/Gbejadark.png" alt="GbejaQR Logo" width={105} height={105} />
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Scan with confidence.
            </p>
            <p className="text-xs text-muted-foreground">
              Protecting mobile users worldwide, one scan at a time.
            </p>
          </div>

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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 lg:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GbejaQR. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care for a safer digital world.
          </p>
        </div>
      </div>
    </footer>
  )
}
