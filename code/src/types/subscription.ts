export interface Subscription {
    id: string;
    name: string;
    next_invoice_date: string;
    period_start: string;
    period_end: string;
    included_minutes: number;
    active_since: string;
    price: number;
    currency: string;
    period: string;
    overage_price_per_minute: number;
    usage_based_billing_enabled: boolean;
    minutes_count: number;
    rollover_minutes_count: number;
    next_payment_date: string;
    next_invoice_amount: number;
    next_phase: {
        name: string;
        period: string;
        price: number;
    };
}