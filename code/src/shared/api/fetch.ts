import { CallResponse } from "@/types/call-logs";
import { Subscription } from "@/types/subscription";

export async function getSubscription(apiKey: string): Promise<Subscription> {
    const res = await fetch("/api/v1/billing/subscription", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });
    if (!res.ok) throw new Error(`Failed to fetch subscription. HTTP ${res.status}: ${res.statusText}`);
    
    const data: Subscription = await res.json();
    return data;
}

export async function getCallLogs(apiKey: string): Promise<CallResponse> {
    const res = await fetch("/api/v1/call?limit=20", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });
    if (!res.ok) throw new Error(`Failed to fetch call logs. HTTP ${res.status}: ${res.statusText}`);
    
    const data: CallResponse = await res.json();
    return data;
}
