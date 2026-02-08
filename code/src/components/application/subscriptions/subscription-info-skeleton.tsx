import { ProgressBarCircleSkeleton } from "@/components/base/progress-indicators/progress-circles";
import SkeletonRectangle from "../../shared-assets/skeleton-rectangle";


function SubscriptionInfoSkeleton() {
    

    return (
        <div className="rounded-xl border border-tertiary-500 bg-tertiary-200">
            <SkeletonRectangle className="m-4"/>
            <div className="rounded-xl bg-white p-4 ring ring-tertiary-500">
                <div className="flex gap-6">
                    <ProgressBarCircleSkeleton size="xs" />
                    <div className="grid flex-1 grid-cols-2 items-center gap-x-6">
                        <div className="flex h-max items-center gap-1">
                            <SkeletonRectangle className="w-15 h-7.75"/>
                            <SkeletonRectangle className="w-9.25 h-5.5"/>
                        </div>
                        <div className="flex h-max flex-col gap-1">
                            <SkeletonRectangle className="w-45.25 h-3.25"/>
                            <SkeletonRectangle className="w-30 h-2.5"/>
                        </div>
                        <div className="flex h-max flex-col gap-1">
                            <SkeletonRectangle className="w-45.25 h-3.25"/>
                            <SkeletonRectangle className="w-30 h-2.5"/>
                        </div>
                        <div className="flex h-max flex-col gap-1">
                            <SkeletonRectangle className="w-45.25 h-3.25"/>
                            <SkeletonRectangle className="w-30 h-2.5"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SubscriptionInfoSkeleton;
