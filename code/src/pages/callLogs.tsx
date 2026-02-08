import { useEffect, useMemo, useState } from "react";
import { PhoneIncoming01, PhoneOutgoing01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import ButtonCopy from "@/components/application/call-logs/button-copy";
import CallStatusBadge from "@/components/application/call-logs/call-status-badge";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Table, TableCard } from "@/components/application/table/table";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { useProject } from "@/providers/project-provider";
import { getCallLogs } from "@/shared/api/fetch";
import type { CallResponse } from "@/types/call-logs";
import { dateToHourString, dateToStringShort, secondsToHMS } from "@/utils/date";

function CallLogs() {
    const [calls, setCalls] = useState<CallResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const projects = useProject();
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });

    useEffect(() => {
        fetchData();
    }, [projects.currentProject]);

    const sortedItems = useMemo(() => {
        if (!calls?.data) return [];
        return calls.data.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [sortDescriptor, calls]);

    async function fetchData() {
        if (!projects.currentProject?.apiKey) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getCallLogs(projects.currentProject.apiKey);
            setCalls(data);
            //! Mock data for testing empty state
            // setCalls({ data: [], has_more: false, first_id: "", last_id: "", current_page: 0, total_pages: 0 });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to fetch call logs.");
            console.error("Error fetching calls:", e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-8 p-8">
            <div className="flex w-full max-w-full flex-col gap-1 lg:max-w-3xl">
                <h1 className="text-header-3 font-semibold text-brand-additional-500">Registro de llamadas</h1>
                <div className="text-body-sm text-neutral-900">
                    Revisa el historial de llamadas realizadas, con fecha, duraciones y detalles de cada registro.
                </div>
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
                <div className="flex-1 overflow-hidden p-1">
                    <TableCard.Root className="flex h-full flex-col [&>.overflow-x-auto]:flex-1 [&>.overflow-x-auto]:overflow-auto">
                        <Table
                            aria-label="Team members"
                            selectionMode="none"
                            sortDescriptor={sortDescriptor}
                            onSortChange={setSortDescriptor}
                            className="min-h-full"
                        >
                            <Table.Header className="sticky top-0 z-10">
                                <Table.Head id="identifier" label="Identificador" isRowHeader className="w-full max-w-1/8" />
                                <Table.Head id="type" label="Tipo" />
                                <Table.Head id="phone" label="Teléfono" />
                                <Table.Head id="status" label="Estado" />
                                <Table.Head id="duration" label="Duración" allowsSorting />
                                <Table.Head id="date" label="Fecha" allowsSorting />
                            </Table.Header>

                            <Table.Body items={sortedItems}>
                                {sortedItems.length === 0 ? (
                                    <Table.Row className="flex-1">
                                        <Table.Cell colSpan={6} className="h-full align-middle">
                                            <div className="flex h-full items-center justify-center">
                                                <EmptyState size="sm">
                                                    <EmptyState.Header pattern="square">
                                                        <EmptyState.FeaturedIcon color="gray" theme="modern-neue" />
                                                    </EmptyState.Header>

                                                    <EmptyState.Content>
                                                        <EmptyState.Title className="text-center text-body-lg! font-semibold text-neutral-900">
                                                            No se han encontrado llamadas
                                                        </EmptyState.Title>
                                                        <EmptyState.Description className="text-center text-body-sm text-neutral-600">
                                                            Por favor, asegúrate de que tus agentes están públicos para comenzar a realizar y recibir llamadas
                                                        </EmptyState.Description>
                                                    </EmptyState.Content>
                                                </EmptyState>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    (item) => (
                                        <Table.Row id={item.id}>
                                            <Table.Cell>
                                                <span className="flex justify-between">
                                                    <div className="flex items-center gap-3">{item.id.slice(0, 9)}...</div>
                                                    <ButtonCopy text={item.id} />
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {item.type === "inbound" ? (
                                                    <BadgeWithIcon size="lg" color="blue" type="color" iconLeading={PhoneIncoming01}>
                                                        Entrante
                                                    </BadgeWithIcon>
                                                ) : (
                                                    <BadgeWithIcon size="lg" color="blue" type="color" iconLeading={PhoneOutgoing01}>
                                                        Saliente
                                                    </BadgeWithIcon>
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>{item.contact.identifier}</Table.Cell>
                                            <Table.Cell>
                                                <CallStatusBadge status={item.status} />
                                            </Table.Cell>
                                            <Table.Cell>{secondsToHMS(item.duration)}</Table.Cell>
                                            <Table.Cell>
                                                <div className="text-body-sm font-medium text-neutral-900">{dateToStringShort(item.contact.created_date)}</div>
                                                <div className="text-body-sm text-neutral-600">{dateToHourString(item.contact.created_date)}</div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )}
                            </Table.Body>
                        </Table>
                    </TableCard.Root>
                </div>
            )}
        </div>
    );
}
export default CallLogs;
