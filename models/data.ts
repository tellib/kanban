export interface Board {
  id?: number;
  user_id?: string;
  title: string;
  inserted_at?: string;
  position?: number;
  lists?: List[];
}

export interface List {
  id?: number;
  user_id?: string;
  board_id: number;
  title: string;
  inserted_at?: string;
  position?: number;
  cards?: Card[];
}

export interface Card {
  id?: number;
  user_id?: string;
  list_id: number;
  description: string;
  completed_at?: string;
  inserted_at?: string;
  position?: number;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export type {
  Board as BoardData,
  List as ListData,
  Card as CardData,
  User as UserData,
};
