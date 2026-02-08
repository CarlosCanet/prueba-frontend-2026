import { useEffect, useState } from "react";
import { useProject } from "@/providers/project-provider";
import { getSubscription } from "@/shared/api/fetch";
import { Subscription } from "@/types/subscription";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import SubscriptionInfo from "@/components/application/subscriptions/subscription-info";
import SubscriptionInfoSkeleton from "@/components/application/subscriptions/subscription-info-skeleton";

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

    return (
        <div className="flex flex-1 flex-col gap-8 p-8">
            <div className="flex w-full max-w-full flex-col gap-1 lg:max-w-3xl">
                <h1 className="text-header-3 font-semibold text-brand-additional-500">Suscripción</h1>
                <p className="text-body-sm text-neutral-900">Consulta tu plan actual, los minutos disponibles y la próxima fecha de facturación.</p>
            </div>

            {loading ? (
                <SubscriptionInfoSkeleton />
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
                    <SubscriptionInfo subscription={subscription} />
                )
            )}
        </div>
    );
}
