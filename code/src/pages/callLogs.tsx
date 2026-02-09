import { useEffect, useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import CallLogEmptyTableBody from "@/components/application/call-logs/call-log-empty-table-body";
import CallLogErrorTableBody from "@/components/application/call-logs/call-log-error-table-body";
import CallLogHeader from "@/components/application/call-logs/call-log-header";
import CallLogSkeletonTableBody from "@/components/application/call-logs/call-log-skeleton-table-body";
import CallLogTableBody from "@/components/application/call-logs/call-log-table-body";
import { Table, TableCard } from "@/components/application/table/table";
import { useProject } from "@/providers/project-provider";
import { getCallLogs } from "@/shared/api/fetch";
import type { CallResponse } from "@/types/call-logs";

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
        <div className="flex h-screen flex-col gap-8 overflow-hidden p-8">
            <div className="flex w-full max-w-full flex-col gap-1 lg:max-w-3xl">
                <h1 className="text-header-3 font-semibold text-brand-additional-500">Registro de llamadas</h1>
                <div className="text-body-sm text-neutral-900">
                    Revisa el historial de llamadas realizadas, con fecha, duraciones y detalles de cada registro.
                </div>
            </div>
            <div className="flex-1 overflow-hidden p-1">
                <TableCard.Root className="flex h-full flex-col [&>.overflow-x-auto]:flex-1 [&>.overflow-x-auto]:overflow-auto">
                    <Table aria-label="Call Logs" selectionMode="none" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} className="min-h-full">
                        <CallLogHeader />

                        {loading ? (
                            <CallLogSkeletonTableBody />
                        ) : error ? (
                            <CallLogErrorTableBody error={error} />
                        ) : sortedItems.length === 0 ? (
                            <CallLogEmptyTableBody />
                        ) : (
                            <CallLogTableBody items={sortedItems} />
                        )}
                    </Table>
                </TableCard.Root>
            </div>
        </div>
    );
}
export default CallLogs;
