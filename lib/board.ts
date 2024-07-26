import { BoardData } from '@/models/data';
import { supabase } from './db';

async function getBoard(id: number) {
  const { data } = await supabase
    .from('boards')
    .select(
      'id, title, lists ( id, title, position, cards ( id, description, position ))'
    )
    .eq('id', id)
    .order('position')
    .order('position', { foreignTable: 'lists' })
    .order('position', { foreignTable: 'lists.cards' })
    .single();

  return data;
  /* Example response
  {
    "data": [
      {
        "name": "Kiran",
        "teams": [
          {
            "name": "Green"
          },
          {
            "name": "Blue"
          }
        ]
      },
      {
        "name": "Evan",
        "teams": [
          {
            "name": "Blue"
          }
        ]
      }
    ],
    "status": 200,
    "statusText": "OK"
  } */
}

async function getAllBoards() {
  const { data } = await supabase.from('boards').select('*').order('position');
  return data;
  /* Example response
  {
    "data": [
      {
        "id": 1,
        "name": "Afghanistan"
      },
      {
        "id": 2,
        "name": "Albania"
      },
      {
        "id": 3,
        "name": "Algeria"
      }
    ],
    "status": 200,
    "statusText": "OK"
  } */
}

async function addBoard(board: BoardData) {
  const { data } = await supabase.from('boards').insert(board).select();
  return data;

  /* Example response
  {
    "data": [
      {
        "id": 1,
        "name": "Denmark"
      }
    ],
    "status": 201,
    "statusText": "Created"
  } */
}

async function deleteBoard(id: number) {
  const { data } = await supabase.from('boards').delete().eq('id', id).select();
  return data;
  /* Example response
  {
    "data": [
      {
        "id": 1,
        "name": "Spain"
      }
    ],
    "status": 200,
    "statusText": "OK"
  } */
}

async function updateBoard(board: BoardData): Promise<BoardData | null> {
  const { data } = await supabase
    .from('boards')
    .update({ title: board.title })
    .match({ id: board.id })
    .select()
    .maybeSingle();

  return data;
  /* Example response
  {
    "data": [
      {
        "id": 1,
        "name": "Australia"
      }
    ],
    "status": 200,
    "statusText": "OK"
  } */
}

async function sortBoard(board: BoardData) {
  const { data } = await supabase.rpc('sort_board', {
    board_id: board.id,
    list_ids: board.lists?.map((list) => list.id),
  });

  return data;
}

export { getBoard, getAllBoards, addBoard, deleteBoard, updateBoard };
