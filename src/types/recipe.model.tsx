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
  ingredientId?: number | null;
  ingredientAmountId?: number | null;
  name?: string;
  quantity?: string;
}

export type Instruction = {
  id?: number | null;
  instruction?: string;
  stepNumber?: number;
}