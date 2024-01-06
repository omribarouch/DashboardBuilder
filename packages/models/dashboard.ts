import IChart from "./chart";

export interface IDashboardPreview {
    _id: string;
    name: string;
    description: string;
    creatorUsername: string;
}

export interface IDashboard extends IDashboardPreview {
    charts: IChart[];
}