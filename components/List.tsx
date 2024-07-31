// TODO edit list name

'use client';

import { useEffect, useRef, useState } from 'react';
import { IconCheck, IconDots, IconPlus, IconX } from '@tabler/icons-react';

import { Input } from './Input';
import { Button } from './Button';
import { Card } from './Card';
import { ListData, CardData } from '@/models/data';

import { useSession } from '@/hooks/useSession';

import { addCard, deleteCard } from '@/lib/card';
import { deleteList, updateList } from '@/lib/list';
import { Dropdown } from './Dropdown';
import { Container } from './Container';

interface ListProps {
  data: ListData;
  onDelete: (id: number) => void;
  onUpdate: (list: ListData) => void;
}

export const List = ({ data, onDelete, onUpdate }: ListProps) => {
  const [list, setList] = useState<ListData>(data);
  const [addMode, setAddMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();

  const handleAddCard = () => {
    if (!inputRef.current?.value || !list?.id) return;

    const card: CardData = {
      title: inputRef.current.value,
      user_id: session?.user.id,
      list_id: list.id,
    };
    addCard(card).then((aCard) => {
      if (aCard) {
        inputRef.current?.blur();
        setAddMode(false);
        setList({
          ...list,
          cards: [...(list?.cards as CardData[]), aCard],
        });
      } else console.log('Error adding card');
    });
  };

  const handleDeleteCard = (id: number) => {
    setList({ ...list, cards: list?.cards?.filter((card) => card.id !== id) });
  };

  const handleUpdateCard = (uCard: CardData) => {
    setList({
      ...list,
      cards: list?.cards?.map((card) => (card.id === uCard.id ? uCard : card)),
    });
  };

  useEffect(() => {
    if (addMode) {
      inputRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setAddMode(false);
        }
        if (e.key === 'Enter') {
          if (inputRef.current?.value !== '') {
            handleAddCard();
          }
          setAddMode(false);
        }
      });
      inputRef.current?.focus();
    }
  });

  if (!list) return <></>;

  const ListHeader = () => (
    <div className='flex items-center justify-between text-lg font-semibold dark:text-white'>
      <h1 className='truncate pl-2'>
        <span className='font-mono text-black/20 dark:text-white/20'>
          {list.id}{' '}
        </span>
        {list.title}
      </h1>
      <Dropdown
        title={'Actions'}
        options={[
          // { name: 'Delete list', func: () => handleDeleteList() },
          { name: 'Edit list name', func: () => {} },
        ]}
      >
        <IconDots />
      </Dropdown>
    </div>
  );

  const ListContent = () => (
    <div className='flex flex-col gap-y-2 overflow-y-scroll'>
      {list.cards &&
        // list.cards.length > 0 &&
        list.cards.map((card) => (
          <Card
            key={'c' + card.id}
            data={card}
            onDelete={handleDeleteCard}
            onUpdate={handleUpdateCard}
          />
        ))}
    </div>
  );

  const ListButtons = () => {
    if (!addMode) {
      return (
        <Button variant={'hover'} onClick={() => setAddMode(true)}>
          <IconPlus size={18} />
          Add card
        </Button>
      );
    }

    if (addMode) {
      return (
        <div className='flex w-full flex-col gap-2'>
          <Input
            type='text'
            ref={inputRef}
            placeholder='Card title'
            id='card'
          />
          <div className='flex gap-2'>
            <Button variant={'outlined'} onClick={() => setAddMode(false)}>
              <IconX stroke={3} />
            </Button>
            <Button
              variant={'outlined'}
              className='w-full'
              onClick={() => handleAddCard()}
            >
              <IconCheck stroke={3} />
              <p>Add</p>
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <Container size={'sm'} snap={true}>
      <ListHeader />
      <ListContent />
      <ListButtons />
    </Container>
  );
};
