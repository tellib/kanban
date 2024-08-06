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
  updateCardPosition: (
    sourceIndex: number,
    destinationIndex: number,
    sourceListId: number,
    destinationListId: number
  ) => void;
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
  const [message, setMessage] = useState<{ text: string | null; key: number }>({
    text: null,
    key: 0,
  });
  const messageRef = useRef<HTMLDivElement>(null);

  const addBoard = (newBoard: BoardData) => {
    addBoardDB(newBoard).then((aBoard) => {
      if (aBoard) {
        setBoard(aBoard);
        setMessage({ text: `Added board '${aBoard.title}'`, key: Date.now() });
      } else {
        setMessage({ text: 'Unable to add board', key: Date.now() });
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
        setMessage({ text: `Added list '${aList.title}'`, key: Date.now() });
      } else {
        setMessage({ text: 'Unable to add list', key: Date.now() });
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
        setMessage({ text: `Added card '${aCard.title}'`, key: Date.now() });
      } else {
        setMessage({ text: 'Unable to add card', key: Date.now() });
      }
    });
  };

  const deleteBoard = (id: number) => {
    deleteBoardDB(id).then((dBoard) => {
      if (dBoard) {
        setBoard(null);
        setMessage({ text: 'Deleted board', key: Date.now() });
      } else {
        setMessage({ text: 'Unable to delete board', key: Date.now() });
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
        setMessage({ text: 'Deleted list', key: Date.now() });
      } else {
        setMessage({ text: 'Unable to delete list', key: Date.now() });
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
            cards: list.cards?.filter((card) => card.id !== id) || [],
          })),
        }));
        setMessage({ text: 'Deleted card', key: Date.now() });
      } else {
        setMessage({ text: 'Unable to delete card', key: Date.now() });
      }
    });
  };

  const updateBoard = (updatedBoard: BoardData) => {
    if (!board?.id) return;
    updateBoardDB(updatedBoard).then((uBoard) => {
      if (uBoard) {
        setMessage({ text: 'Updated board', key: Date.now() });
        setBoard((board) => ({ ...board!, ...uBoard }));
      } else {
        setMessage({ text: 'Unable to update board', key: Date.now() });
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
        setMessage({ text: 'Updated list', key: Date.now() });
      } else {
        setMessage({ text: 'Unable to update list', key: Date.now() });
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
            cards:
              list.cards?.map((card) =>
                card.id === uCard.id ? uCard : card
              ) || [],
          })),
        }));
        setMessage({ text: 'Updated card', key: Date.now() });
      } else {
        setMessage({ text: 'Unable to update card', key: Date.now() });
      }
    });
  };

  // used for drag and drop
  const updateCardPosition = async (
    sourceIndex: number,
    destinationIndex: number,
    sourceListId: number,
    destinationListId: number
  ) => {
    if (!board) return;

    const updatedLists = board.lists?.map((list) => {
      if (list.id === sourceListId) {
        const sourceCards = list.cards || [];
        const [movedCard] = sourceCards.splice(sourceIndex, 1);

        if (sourceListId === destinationListId) {
          sourceCards.splice(destinationIndex, 0, movedCard);
          return { ...list, cards: sourceCards };
        }

        return { ...list, cards: sourceCards };
      }

      if (list.id === destinationListId) {
        const destinationCards = list.cards || [];
        const movedCard = board.lists?.find((lst) => lst.id === sourceListId)
          ?.cards?.[sourceIndex];

        if (movedCard) {
          destinationCards.splice(destinationIndex, 0, movedCard);
        }

        return { ...list, cards: destinationCards };
      }

      return list;
    });

    if (updatedLists) {
      setBoard((prev) => ({
        ...prev!,
        lists: updatedLists,
      }));

      const sourceList = updatedLists.find((list) => list.id === sourceListId);
      const destinationList = updatedLists.find(
        (list) => list.id === destinationListId
      );

      if (sourceList && destinationList) {
        const updateSource = sourceList.cards?.map((card, index) => ({
          title: card.title,
          id: card.id,
          position: index,
          list_id: sourceListId,
        }));

        const updateDestination = destinationList.cards?.map((card, index) => ({
          title: card.title,
          id: card.id,
          position: index,
          list_id: destinationListId,
        }));

        const updates = [...(updateSource || []), ...(updateDestination || [])];

        // Update each card's position and list_id in the database
        for (const update of updates) {
          await updateCard({
            title: update.title,
            id: update.id,
            position: update.position,
            list_id: update.list_id,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (message.text) {
      setMessage((prev) => ({ ...prev, key: Date.now() }));
    }
  }, [message.text]);

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
        updateCardPosition,
      }}
    >
      <>
        {children}

        {/* {message.text && (
          <Message title='Message' ref={messageRef} key={message.key}>
            {message.text}
          </Message>
        )} */}
      </>
    </BoardContext.Provider>
  );
};
