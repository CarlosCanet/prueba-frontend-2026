import { Table } from "@/components/application/table/table";

function CallLogHeader() {
    return (
        <Table.Header className="sticky top-0 z-10">
            <Table.Head id="identifier" label="Identificador" isRowHeader className="w-full max-w-1/8" />
            <Table.Head id="type" label="Tipo" />
            <Table.Head id="phone" label="Teléfono" />
            <Table.Head id="status" label="Estado" />
            <Table.Head id="duration" label="Duración" allowsSorting />
            <Table.Head id="date" label="Fecha" allowsSorting />
        </Table.Header>
    );
}
export default CallLogHeader;
