import { cx } from "@/utils/cx";

function SkeletonRectangle({ className }: { className?: string }) {
    return <div className={cx("h-6 w-43.5 rounded-sm bg-neutral-200 animate-pulse", className)}></div>;
}
export default SkeletonRectangle;
