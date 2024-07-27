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

export { getCard, addCard, deleteCard, updateCard };
