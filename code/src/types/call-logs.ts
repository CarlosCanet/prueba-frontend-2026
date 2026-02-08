export type CallStatus = "active" | "rejected" | "completed" | "transfered";

export interface Contact {
    id: string;
    created_date: string;
    identifier: string;
    contact_type: string;
}

export interface Call {
    id: string;
    agent_id: string;
    agent_version_id: string;
    status: CallStatus;
    type: "inbound" | "outbound";
    contact: Contact;
    phone_register_id: string;
    created_date: string;
    recording_url: string;
    start_time: string;
    end_time: string;
    duration: number;
    end_reason: string;
}

export interface CallResponse {
    data: Call[];
    has_more: boolean;
    first_id: string;
    last_id: string;
    current_page: number;
    total_pages: number;
}
