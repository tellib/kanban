// Auth
export { getSession, signUp, signInWithPassword, signOut };

// Board
export {
  getBoard,
  getAllBoards,
  addBoard,
  deleteBoard,
  updateBoard,
  sortBoard,
};

// List
export { getList, getAllLists, addList, deleteList, updateList, sortList };

// Card
export { getCard, addCard, deleteCard, updateCard };

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!supabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL not defined');
if (!supabaseKey) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY not defined');
export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth
async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session', error.message);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Unexpected error getting session', error);
    return null;
  }
}

async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error('Error signing up: ', error.message);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Unexpected error signing up', error);
    return null;
  }
}

async function signInWithPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error('Error signing in: ', error.message);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Unexpected error signing in', error);
    return null;
  }
}

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out: ', error.message);
    }
  } catch (error) {
    console.error('Unexpected error signing out: ', error);
  }
}

// Board
import { BoardData } from '@/lib/data';

async function getBoard(id: number) {
  const { data } = await supabase
    .from('boards')
    .select(
      'id, title, preferences, lists ( id, title, position, cards ( id, title, position ))'
    )
    .eq('id', id)
    .order('position')
    .order('position', { referencedTable: 'lists' })
    .order('position', { referencedTable: 'lists.cards' })
    .single();

  return data;
}

async function getAllBoards(): Promise<BoardData[] | null> {
  const { data } = await supabase.from('boards').select('*').order('position');
  return data;
}

async function addBoard(board: BoardData): Promise<BoardData | null> {
  const { data } = await supabase
    .from('boards')
    .insert(board)
    .select()
    .single();
  return data;
}

async function deleteBoard(id: number): Promise<BoardData | null> {
  const { data } = await supabase
    .from('boards')
    .delete()
    .eq('id', id)
    .select()
    .single();
  return data;
}

async function updateBoard(board: BoardData): Promise<BoardData | null> {
  const { data } = await supabase
    .from('boards')
    .update({ title: board.title, preferences: board.preferences })
    .match({ id: board.id })
    .select()
    .single();
  return data;
}

async function sortBoard(board: BoardData): Promise<BoardData | null> {
  const { data } = await supabase.rpc('sort_board', {
    board_id: board.id,
    list_ids: board.lists?.map((list) => list.id),
  });
  return data;
}

// List
import { ListData } from '@/lib/data';

async function getList(id: number): Promise<ListData | null> {
  const { data } = await supabase
    .from('lists')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

async function getAllLists(): Promise<ListData[] | null> {
  const { data } = await supabase.from('lists').select('*').order('position');
  return data;
}

async function addList(list: ListData): Promise<ListData | null> {
  const { data } = await supabase.from('lists').insert(list).select().single();
  return data;
}

async function deleteList(id: number): Promise<ListData | null> {
  const { data } = await supabase
    .from('lists')
    .delete()
    .eq('id', id)
    .select()
    .single();
  return data;
}

async function updateList(list: ListData): Promise<ListData | null> {
  const { data } = await supabase
    .from('lists')
    .update({ title: list.title, position: list.position })
    .match({ id: list.id })
    .select()
    .single();
  return data;
}

async function sortList(list: ListData): Promise<ListData[] | null> {
  const { data } = await supabase.rpc('sort_list', {
    new_list_id: list.id,
    card_ids: list.cards?.map((card) => card.id),
  });
  return data;
}

// Card
import { CardData } from '@/lib/data';

async function getCard(id: number) {
  const { data } = await supabase
    .from('cards')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

async function addCard(card: CardData): Promise<CardData | null> {
  const { data } = await supabase.from('cards').insert(card).select().single();
  return data;
}

async function deleteCard(id: number): Promise<CardData | null> {
  const { data } = await supabase
    .from('cards')
    .delete()
    .eq('id', id)
    .select()
    .single();
  return data;
}

async function updateCard(card: CardData): Promise<CardData | null> {
  const { data } = await supabase
    .from('cards')
    .update(card)
    .match({ id: card.id })
    .select()
    .single();
  return data;
}
