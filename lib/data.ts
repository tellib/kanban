export type {
  Board as BoardData,
  List as ListData,
  Card as CardData,
  User as UserData,
};

interface Board {
  id?: number;
  user_id?: string;
  title: string;
  inserted_at?: string;
  position?: number;
  lists?: List[];
  preferences?: {
    color?: string;
  };
}

interface List {
  id?: number;
  user_id?: string;
  board_id: number;
  title: string;
  inserted_at?: string;
  position?: number;
  cards?: Card[];
}

interface Card {
  id?: number;
  user_id?: string;
  list_id: number;
  title: string;
  description?: string;
  due_on?: string;
  completed_at?: string;
  inserted_at?: string;
  position?: number;
}

interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}
