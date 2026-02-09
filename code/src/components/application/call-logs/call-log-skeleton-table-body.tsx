import { Table } from "@/components/application/table/table";
import SkeletonRectangle from "@/components/shared-assets/skeleton-rectangle";

function CallLogSkeletonTableBody() {
    return (
        <Table.Body items={Array.from({ length: 20 }, (_, i) => ({ id: i }))}>
            {(item) => (
                <Table.Row key={item.id}>
                    <Table.Cell>
                        <SkeletonRectangle className="h-5 w-35" />
                    </Table.Cell>
                    <Table.Cell>
                        <SkeletonRectangle className="w-20.5" />
                    </Table.Cell>
                    <Table.Cell>
                        <SkeletonRectangle className="h-5 w-35" />
                    </Table.Cell>
                    <Table.Cell>
                        <SkeletonRectangle className="w-20.5" />
                    </Table.Cell>
                    <Table.Cell>
                        <SkeletonRectangle className="h-5 w-35" />
                    </Table.Cell>
                    <Table.Cell className="flex flex-col gap-1">
                        <SkeletonRectangle className="h-5 w-20.5" />
                        <SkeletonRectangle className="h-3.5 w-11" />
                    </Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    );
}
export default CallLogSkeletonTableBody;
