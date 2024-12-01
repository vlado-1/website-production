/** Declaration of 'project' item interface. */
export interface project {
    pid: number;
    title: string;
    descn: string;
    pageUrl: string;
    selected: boolean;
    file: string | null;
}