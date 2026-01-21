export type Recipe = {
    id?: number;
    title?: string;
    description?: string;
    instructions?: string;
    createdBy?: number;
    dateCreated?: Date;
}

export type Ingredient = {
    id?: number;
    name?: string;
    quantity?: string;
}