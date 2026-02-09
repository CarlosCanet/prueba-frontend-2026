import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Table } from "@/components/application/table/table";

function CallLogEmptyTableBody() {
    return (
        <Table.Body>
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
        </Table.Body>
    );
}
export default CallLogEmptyTableBody;
