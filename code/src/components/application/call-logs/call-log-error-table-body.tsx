import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Table } from "@/components/application/table/table";

function CallLogErrorTableBody({ error }: { error: string }) {
    return (
        <Table.Body>
            <Table.Row className="flex-1">
                <Table.Cell colSpan={6} className="h-full align-middle">
                    <div className="flex h-full items-center justify-center">
                        <EmptyState size="sm" className="mt-12">
                            <EmptyState.Header pattern="square">
                                <EmptyState.FeaturedIcon color="error" theme="modern-neue" />
                            </EmptyState.Header>
                            <EmptyState.Content>
                                <EmptyState.Title className="text-error-dark">Error</EmptyState.Title>
                                <EmptyState.Description className="text-error-darkest">{error}</EmptyState.Description>
                            </EmptyState.Content>
                        </EmptyState>
                    </div>
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    );
}
export default CallLogErrorTableBody;
