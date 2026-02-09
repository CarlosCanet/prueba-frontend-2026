import { PhoneIncoming01 } from "@untitledui/icons/PhoneIncoming01";
import { PhoneOutgoing01 } from "@untitledui/icons/PhoneOutgoing01";
import { Table } from "@/components/application/table/table";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { Call } from "@/types/call-logs";
import { dateToHourString, dateToStringShort, secondsToHMS } from "@/utils/date";
import ButtonCopy from "./button-copy";
import CallStatusBadge from "./call-status-badge";

function CallLogTableBody({ items }: { items: Call[] }) {
    return (
        <Table.Body items={items}>
            {(item) => (
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
            )}
        </Table.Body>
    );
}
export default CallLogTableBody;
