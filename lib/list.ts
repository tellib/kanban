import { ListData } from '@/models/data';
import { supabase } from './db';

// async function getList(id: number): Promise<ListData | null> {
//   const { data } = await supabase
//     .from('lists')
//     .select('*')
//     .eq('id', id)
//     .single();
//   return data;
// }

// async function getAllLists(): Promise<ListData[] | null> {
//   const { data } = await supabase.from('lists').select('*').order('position');
//   return data;
// }

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
    .update(list)
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

export { addList, deleteList, updateList };
// export { getList, getAllLists }
