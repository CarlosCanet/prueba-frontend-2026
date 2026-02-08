import { createContext, useContext, useEffect, useState } from "react";
import { Project } from "@/types/project";

export interface ProjectContextType {
    currentProject: Project | null;
    setCurrentProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [currentProject, setCurrentProject] = useState<Project | null>(() => {
        const saved = localStorage.getItem("currentProject");
        return saved ? JSON.parse(saved) : null;
    });
    useEffect(() => {
        if (currentProject) {
            localStorage.setItem("currentProject", JSON.stringify(currentProject));
        }
    }, [currentProject]);

    const passedContext = { currentProject, setCurrentProject };

    return <ProjectContext.Provider value={passedContext}>{children}</ProjectContext.Provider>;
}

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
