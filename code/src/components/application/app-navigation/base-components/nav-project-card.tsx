import { useCallback, useEffect, useRef, useState } from "react";
import type { Placement } from "@react-types/overlays";
import { ChevronSelectorVertical } from "@untitledui/icons";
import { useFocusManager } from "react-aria";
import type { DialogProps as AriaDialogProps } from "react-aria-components";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useProject } from "@/providers/project-provider";
import { Project } from "@/types/project";
import { cx } from "@/utils/cx";

const placeholderProjects: Project[] = [
    {
        id: "project-1",
        name: "Sk-**********",
        apiKey: import.meta.env.VITE_API_KEY_PROJECT_1 || "",
    },
    {
        id: "project-2",
        name: "Sk-**********",
        apiKey: import.meta.env.VITE_API_KEY_PROJECT_2 || "",
    },
    {
        id: "project-3",
        name: "Sk-**********",
        apiKey: import.meta.env.VITE_API_KEY_PROJECT_3 || "",
    },
];

export const NavProjectMenu = ({
    className,
    selectedProjectId = "project-1",
    onClose,
    ...dialogProps
}: AriaDialogProps & { className?: string; projects?: Project[]; selectedProjectId?: string; onClose?: () => void }) => {
    const focusManager = useFocusManager();
    const dialogRef = useRef<HTMLDivElement>(null);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowDown":
                    focusManager?.focusNext({ tabbable: true, wrap: true });
                    break;
                case "ArrowUp":
                    focusManager?.focusPrevious({ tabbable: true, wrap: true });
                    break;
            }
        },
        [focusManager],
    );
    const projects = useProject();

    useEffect(() => {
        if (!projects.currentProject) {
            projects.setCurrentProject(placeholderProjects[0]);
        }
    }, []);

    useEffect(() => {
        const element = dialogRef.current;
        if (element) {
            element.addEventListener("keydown", onKeyDown);
        }

        return () => {
            if (element) {
                element.removeEventListener("keydown", onKeyDown);
            }
        };
    }, [onKeyDown]);

    return (
        <AriaDialog
            {...dialogProps}
            ref={dialogRef}
            className={cx("w-66 rounded-xl bg-secondary_alt shadow-lg ring ring-secondary_alt outline-hidden", className)}
        >
            <div className="rounded-xl bg-primary ring-1 ring-secondary">
                <div className="flex flex-col gap-0.5 border-t border-secondary py-1.5">
                    <div className="px-3 pt-1.5 pb-1 text-xs font-semibold text-tertiary">Switch project</div>

                    <div className="flex flex-col gap-0.5 px-1.5">
                        <RadioGroup
                            aria-label="Projects"
                            value={projects.currentProject?.id ?? "project-1"}
                            onChange={(value) => {
                                const project = placeholderProjects.find((p) => p.id === value);
                                if (project) {
                                    projects.setCurrentProject(project);
                                    onClose?.();
                                }
                            }}
                        >
                            {placeholderProjects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => {
                                        projects.setCurrentProject(project);
                                        onClose?.();
                                    }}
                                    className={cx(
                                        "relative w-full cursor-pointer rounded-md px-2 py-1.5 text-left outline-focus-ring hover:bg-primary_hover focus:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                                        project.id === selectedProjectId && "bg-primary_hover",
                                    )}
                                >
                                    <AvatarLabelGroup size="md" title={project.name} subtitle="" initials="OR" />

                                    <RadioButton value={project.id} className="absolute top-2 right-2" />
                                </button>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </AriaDialog>
    );
};

export const NavProjectCard = ({
    popoverPlacement,
    items = placeholderProjects,
}: {
    popoverPlacement?: Placement;
    selectedProjectId?: string;
    items?: Project[];
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useBreakpoint("lg");
    const { currentProject } = useProject();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectedProject = currentProject ?? items[0];

    if (!selectedProject) {
        console.warn("No project available in <NavProjectCard />");
        return null;
    }

    return (
        <div ref={triggerRef} className="relative mx-3 flex items-center gap-3 rounded-xl p-3 ring-1 ring-neutral-200 ring-inset bg-base-white">
            <AvatarLabelGroup size="md" title={selectedProject.name} subtitle="" initials="OR" />

            <div className="absolute top-1.5 right-1.5">
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <AriaButton className="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 pressed:bg-primary_hover pressed:text-fg-quaternary_hover pressed:border-brand-primary-500 pressed:border-2 pressed:rounded-xl">
                        <ChevronSelectorVertical className="size-4 shrink-0" />
                    </AriaButton>
                    <AriaPopover
                        placement={popoverPlacement ?? (isDesktop ? "right bottom" : "top right")}
                        triggerRef={triggerRef}
                        offset={8}
                        className={({ isEntering, isExiting }) =>
                            cx(
                                "origin-(--trigger-anchor-point) will-change-transform",
                                isEntering &&
                                    "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                                isExiting &&
                                    "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                            )
                        }
                    >
                        <NavProjectMenu selectedProjectId={selectedProject.id} projects={items} onClose={() => setIsOpen(false)} />
                    </AriaPopover>
                </AriaDialogTrigger>
            </div>
        </div>
    );
};
