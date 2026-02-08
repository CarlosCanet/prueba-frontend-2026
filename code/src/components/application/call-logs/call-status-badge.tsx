import { AlertTriangle, CheckCircleBroken, Loading02, SwitchHorizontal01 } from "@untitledui/icons";
import { CallStatus } from "@/types/call-logs";
import type { BadgeColors, IconComponentType } from "@/components/base/badges/badge-types";
import { BadgeWithIcon } from "@/components/base/badges/badges";

interface CallStatusBadgeProps {
    status: CallStatus;
}

const STATUS_CONFIG: Record<
    CallStatus,
    {
        color: BadgeColors;
        icon: IconComponentType;
        label: string;
    }
> = {
    active: {
        color: "indigo",
        icon: Loading02,
        label: "Activa",
    },
    completed: {
        color: "success",
        icon: CheckCircleBroken,
        label: "Completada",
    },
    rejected: {
        color: "error",
        icon: AlertTriangle,
        label: "Rechazada",
    },
    transfered: {
        color: "gray",
        icon: SwitchHorizontal01,
        label: "Transferida",
    },
};

function CallStatusBadge({ status }: CallStatusBadgeProps) {
    const config = STATUS_CONFIG[status];

    return (
        <BadgeWithIcon size="lg" color={config.color} type="color" iconLeading={config.icon} className="[--badge-bg:var(--color-error-darkest)] [--badge-text:var(--color-error-darkest)]">
            {config.label}
        </BadgeWithIcon>
    );
}

export default CallStatusBadge;
