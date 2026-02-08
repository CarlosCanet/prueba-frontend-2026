import { useEffect, useState } from "react";
import { ProgressBarCircle } from "@/components/base/progress-indicators/progress-circles";
import { useProject } from "@/providers/project-provider";
import { getSubscription } from "@/shared/api/fetch";
import { Subscription } from "@/types/subscription";
import { getDaysDifference } from "@/utils/date";
import { EmptyState } from "@/components/application/empty-state/empty-state";

export default function SubscriptionPage() {
    const [subscription, setSubscription] = useState<Subscription>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const projects = useProject();

    async function fetchData() {
        if (!projects.currentProject?.apiKey) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getSubscription(projects.currentProject.apiKey);
            setSubscription(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to fetch subscription.");
            console.error("Error fetching subscription:", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [projects.currentProject]);

    const daysLeft = subscription ? getDaysDifference(subscription.period_end) : 0;

    return (
        <div className="flex flex-1 flex-col gap-8 p-8">
            <div className="flex w-full max-w-full flex-col gap-1 lg:max-w-3xl">
                <h1 className="text-header-3 font-semibold text-brand-additional-500">Suscripción</h1>
                <p className="text-body-sm text-neutral-900">Consulta tu plan actual, los minutos disponibles y la próxima fecha de facturación.</p>
            </div>

            {loading ? (
                <p className="font-xl text-brand-500">Cargando...</p>
            ) : error ? (
                <EmptyState size="sm" className="mt-12">
                    <EmptyState.Header pattern="square">
                        <EmptyState.FeaturedIcon color="error" theme="modern-neue" />
                    </EmptyState.Header>
                    <EmptyState.Content>
                        <EmptyState.Title className="text-error-dark">Error</EmptyState.Title>
                        <EmptyState.Description className="text-error-darkest">{error}</EmptyState.Description>
                    </EmptyState.Content>
                </EmptyState>
            ) : (
                subscription && (
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
                                        <p className="text-body-sm text-brand-additional-500">Días restantes para el próximo pago</p>
                                        <p className="text-body-sm text-neutral-colors-600">{daysLeft} días</p>
                                    </div>
                                    <div className="flex h-max flex-col">
                                        <p className="text-body-sm text-brand-additional-500">Minutos restantes</p>
                                        <p className="text-body-sm text-neutral-colors-600">{subscription.included_minutes - subscription.minutes_count}</p>
                                    </div>
                                    <div className="flex h-max flex-col">
                                        <p className="text-body-sm text-brand-additional-500">Minutos acumulados</p>
                                        <p className="text-body-sm text-neutral-colors-600">{subscription.rollover_minutes_count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
