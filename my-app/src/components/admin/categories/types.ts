export interface ICategoryItem {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface ICategoryCreate {
    name: string;
    image: string;
    description: string;
}

export interface ICategoryEdit {
    id: number;
    name: string;
    image: string;
    description: string;
}