"use client"

export type ResultType = "verified" | "suspicious" | "malicious" | "unsafe" | "error"

export { VerifiedResult } from "./results/VerifiedResult"
export { SuspiciousResult } from "./results/SuspiciousResult"
export { MaliciousResult } from "./results/MaliciousResult"
export { UnsafeResult } from "./results/UnsafeResult"
export { ErrorResult } from "./results/ErrorResult"
