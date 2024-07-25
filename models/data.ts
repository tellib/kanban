export interface BoardData {
  id?: number;
  title: string;
  description?: string;
  owner_id?: number;
  board_members?: number[];
  lists?: ListData[];
}

export interface ListData {
  id?: number;
  board_id: number;
  title: string;
  order?: number;
  cards?: CardData[];
}

export interface CardData {
  id?: number;
  title: string;
  description?: string;
  list_id: number;
  order?: number;
  labels?: ListData[];
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
