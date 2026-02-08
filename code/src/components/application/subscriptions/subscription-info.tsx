import { ProgressBarCircle } from "@/components/base/progress-indicators/progress-circles";
import { Subscription } from "@/types/subscription";
import { dateToStringLong } from "@/utils/date";

interface SubscriptionInfoProps {
    subscription: Subscription;
}

function SubscriptionInfo({ subscription }: SubscriptionInfoProps) {
    return (
        <div className="rounded-xl border border-tertiary-500 bg-tertiary-200">
            <div className="text-brand-aditional-500 p-4 text-body-md font-semibold">{subscription.name}</div>
            <div className="rounded-xl bg-white p-4 ring ring-tertiary-500">
                <div className="flex gap-6">
                    <ProgressBarCircle value={subscription.minutes_count} size="xs" max={subscription.included_minutes} />
                    <div className="grid flex-1 grid-cols-2 items-center gap-x-6">
                        <div className="flex h-max items-end gap-1">
                            <h4 className="text-header-4 font-semibold text-brand-additional-500">{subscription.price}€</h4>
                            <p className="text-body-md text-neutral-colors-700">/{subscription.period}</p>
                        </div>
                        <div className="flex h-max flex-col">
                            <p className="text-body-sm text-brand-additional-500">Próximo pago</p>
                            <p className="text-body-sm text-neutral-colors-600">{dateToStringLong(subscription.period_end)}</p>
                        </div>
                        <div className="flex h-max flex-col">
                            <p className="text-body-sm text-brand-additional-500">Minutos restantes</p>
                            <p className="text-body-sm text-neutral-colors-600">{subscription.included_minutes - subscription.minutes_count}/{subscription.included_minutes}</p>
                        </div>
                        <div className="flex h-max flex-col">
                            <p className="text-body-sm text-brand-additional-500">Minutos acumulados</p>
                            <p className="text-body-sm text-neutral-colors-600">{subscription.rollover_minutes_count}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SubscriptionInfo;
