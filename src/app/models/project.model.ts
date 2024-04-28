export interface project {
    pid: number;
    title: string;
    descn: string;
    effort: number;
    selected: boolean;
    upload: File | null;
}