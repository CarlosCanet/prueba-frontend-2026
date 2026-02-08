import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Clipboard, Check } from "@untitledui/icons";
import { useClipboard } from "@/hooks/use-clipboard";

function ButtonCopy({ text }: { text: string }) {
    const { copied, copy } = useClipboard();

    return (
        <ButtonUtility
            size="xs"
            color="tertiary"
            tooltip={copied ? "Copied" : "Copy"}
            icon={copied ? Check : Clipboard}
            onClick={() => copy(text)}
        />
    );
}
export default ButtonCopy;
