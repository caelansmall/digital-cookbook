export type Recipe = {
  id?: number;
  title: string;
  description?: string;
  ingredients?: Ingredient[],
  instructions?: Instruction[];
  userCreatedId?: number;
  dateCreated?: Date;
}

export type Ingredient = {
  id?: number;
  name?: string;
  quantity?: string;
}

export type Instruction = {
  instruction?: string;
  stepNumber?: number;
}