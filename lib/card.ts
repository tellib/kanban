import { CardData } from '@/models/data';
import { supabase } from './db';

async function getCard(id: number) {
  const { data } = await supabase
    .from('cards')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

async function addCard(card: CardData) {
  const { data } = await supabase.from('cards').insert(card).select();
  return data;
}

async function deleteCard(id: number) {
  const { data } = await supabase.from('cards').delete().eq('id', id).select();
}

async function updateCard(card: CardData) {
  const { data } = await supabase
    .from('cards')
    .update(card)
    .match({ id: card.id })
    .select()
    .maybeSingle();
  return data;
}

export { getCard, addCard, deleteCard, updateCard };
