export function getDaysDifference(targetDate: Date | string): number {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diffInSeconds = (target - now) / 1000;
    const diffInDays = diffInSeconds / (3600 * 24);
    return Math.round(diffInDays);
}

export function secondsToHMS(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + " h " : ""}${m > 0 ? m + " m " : ""}${s} s`;
}

export function dateToString(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

export function dateToHourString(date: string) {
    const d = new Date(date);
    return d.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}