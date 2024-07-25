import { BoardData, CardData, ListData } from '@/models/data';
import axios from './axios';

export { getStatus };
export { addList, addCard, addBoard };
export { getBoard, getAllBoards };

async function getStatus() {
  try {
    const response = await axios.get('/');
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addList(list: ListData) {
  const { title, board_id } = list;
  try {
    const response = await axios.post('/list/', {
      title: title,
      board_id: board_id,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addCard(card: CardData) {
  const { title, description, list_id } = card;
  try {
    const response = await axios.post('/card/', {
      title: title,
      description: description,
      list_id: list_id,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addBoard(board: BoardData) {
  const { title, description } = board;
  try {
    const response = await axios.post('/board/', {
      title: title,
      description: description,
      owner_id: 1,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getBoard(id: number) {
  try {
    const response = await axios.get(`/board/${id}/`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getAllBoards() {
  try {
    const response = await axios.get('/board/');
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
