interface Board {
  id?: number;
  user_id?: string;
  title: string;
  inserted_at?: string;
  position?: number;
  lists?: List[];
  preferences?: BoardPref;
}

interface BoardPref {
  themeColor: string | 'default';
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
  description: string;
  completed_at?: string;
  inserted_at?: string;
  position?: number;
}

interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  preferences?: UserPref;
}

interface UserPref {
  darkMode: 'light' | 'dark' | 'system';
}

export type {
  Board as BoardData,
  List as ListData,
  Card as CardData,
  User as UserData,
};
