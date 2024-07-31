import { createContext, useState, ReactNode, useEffect, useRef } from 'react';
import { BoardData, ListData, CardData } from '@/lib/data';
import {
  addBoard as addBoardDB,
  addList as addListDB,
  addCard as addCardDB,
  deleteBoard as deleteBoardDB,
  deleteList as deleteListDB,
  deleteCard as deleteCardDB,
  updateBoard as updateBoardDB,
  updateList as updateListDB,
  updateCard as updateCardDB,
} from '@/lib/db';
import { Message } from './Message';

interface BoardContextType {
  board: BoardData | null;
  setBoard: (board: BoardData) => void;
  addBoard: (newBoard: BoardData) => void;
  addList: (newList: ListData) => void;
  addCard: (newCard: CardData) => void;
  deleteBoard: (id: number) => void;
  deleteList: (id: number) => void;
  deleteCard: (id: number) => void;
  updateBoard: (updatedBoard: BoardData) => void;
  updateList: (updatedList: ListData) => void;
  updateCard: (updatedCard: CardData) => void;
}

export const BoardContext = createContext<BoardContextType | null>(null);

export const BoardProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: BoardData;
}) => {
  const [board, setBoard] = useState<BoardData | null>(data);
  const [message, setMessage] = useState<string | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const addBoard = (newBoard: BoardData) => {
    addBoardDB(newBoard).then((aBoard) => {
      if (aBoard) {
        setBoard(aBoard);
        console.log('Added board', aBoard);
      } else {
        setMessage('Unable to add board');
      }
    });
  };

  const addList = (newList: ListData) => {
    if (!board?.id) return;
    addListDB(newList).then((aList) => {
      if (aList) {
        setBoard((prev) => ({
          ...prev!,
          lists: [...(prev?.lists || []), aList],
        }));
        console.log('Added list', aList);
      } else {
        setMessage('Unable to add list');
      }
    });
  };

  const addCard = (newCard: CardData) => {
    if (!board?.id) return;
    addCardDB(newCard).then((aCard) => {
      if (aCard) {
        setBoard((prev) => ({
          ...prev!,
          lists: prev?.lists?.map((list) =>
            list.id === newCard.list_id
              ? { ...list, cards: [...(list.cards || []), aCard] }
              : list
          ),
        }));
        console.log('Added card', aCard);
      } else {
        setMessage('Unable to add card');
      }
    });
  };

  const deleteBoard = (id: number) => {
    deleteBoardDB(id).then((dBoard) => {
      if (dBoard) {
        setBoard(null);
        console.log('Deleted board', dBoard);
      } else {
        setMessage('Unable to delete board');
      }
    });
  };

  const deleteList = (id: number) => {
    if (!board?.id) return;
    deleteListDB(id).then((dList) => {
      if (dList) {
        setBoard((prev) => ({
          ...prev!,
          lists: prev?.lists?.filter((list) => list.id !== id),
        }));
        setMessage('Deleted list');
        console.log('Deleted list', dList);
      } else {
        setMessage('Unable to delete list');
      }
    });
  };

  const deleteCard = (id: number) => {
    if (!board?.id) return;
    deleteCardDB(id).then((dCard) => {
      if (dCard) {
        setBoard((prev) => ({
          ...prev!,
          lists: prev?.lists?.map((list) => ({
            ...list,
            cards: list.cards?.filter((card) => card.id !== id),
          })),
        }));
        setMessage('Deleted card');
        console.log('Deleted card', dCard);
      } else {
        setMessage('Unable to delete card');
      }
    });
  };

  const updateBoard = (updatedBoard: BoardData) => {
    if (!board?.id) return;
    updateBoardDB(updatedBoard).then((uBoard) => {
      if (uBoard) {
        setMessage('Updated board');
        console.log('Updated board', uBoard);
        setBoard((board) => ({ ...board!, ...uBoard }));
      } else {
        setMessage('Unable to update board');
      }
    });
  };

  const updateList = (updatedList: ListData) => {
    if (!board?.id) return;
    updateListDB(updatedList).then((uList) => {
      if (uList) {
        setBoard((prev) => ({
          ...prev!,
          lists: prev?.lists?.map((list) =>
            list.id === uList.id ? { ...list, ...uList } : list
          ),
        }));
        setMessage('Updated list');
        console.log('Updated list', uList);
      } else {
        setMessage('Unable to update list');
      }
    });
  };

  const updateCard = (updatedCard: CardData) => {
    if (!board?.id) return;
    updateCardDB(updatedCard).then((uCard) => {
      if (uCard) {
        setBoard((prev) => ({
          ...prev!,
          lists: prev?.lists?.map((list) => ({
            ...list,
            cards: list.cards?.map((card) =>
              card.id === uCard.id ? uCard : card
            ),
          })),
        }));
        console.log('Updated card', uCard);
      } else {
        setMessage('Unable to update card');
      }
    });
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        addBoard,
        addList,
        addCard,
        deleteBoard,
        deleteList,
        deleteCard,
        updateBoard,
        updateList,
        updateCard,
      }}
    >
      <>
        {children}

        {message && (
          <Message color='blue' ref={messageRef}>
            <p>{message}</p>
          </Message>
        )}
      </>
    </BoardContext.Provider>
  );
};
