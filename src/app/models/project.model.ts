/** Declaration of 'project' item interface. */
export interface project {
    pid: number;
    title: string;
    descn: string;
    effort: number;
    selected: boolean;
    file: string | null;
}