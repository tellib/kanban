// TODO edit list name

'use client';

import { useEffect, useRef, useState } from 'react';
import {
  IconCheck,
  IconDots,
  IconPencil,
  IconPlus,
  IconTrack,
  IconTrash,
  IconX,
} from '@tabler/icons-react';

import { Input } from './Input';
import { Button } from './Button';
import { Card } from './Card';
import { ListData, CardData } from '@/lib/data';

import { useSession } from '@/hooks/useSession';
import { Dropdown } from './Dropdown';
import { Container } from './Container';
import { useBoard } from '@/hooks/useBoard';
import { Modal } from './Modal';

export const List = ({ list }: { list: ListData }) => {
  const { addCard, deleteList, deleteCard, updateList, updateCard } =
    useBoard();
  const [mode, setMode] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const session = useSession();

  const handleAddCard = () => {
    if (!inputRef.current?.value || !list) return;

    const card: CardData = {
      title: inputRef.current.value,
      user_id: session?.user.id,
      list_id: list.id as number,
      position: list.cards ? list.cards.length + 1 : 0,
    };
    addCard(card);
    setMode('');
    inputRef.current.value = '';
  };

  const handleDeleteList = () => {
    if (!list.id) return;
    deleteList(list.id);
  };

  const handleUpdateList = () => {
    if (!inputRef.current?.value || !list) return;

    const updatedList: ListData = {
      ...list,
      title: inputRef.current.value,
    };
    updateList(updatedList);
    setMode('');
    inputRef.current.value = '';
  };

  useEffect(() => {
    if (mode === 'add') {
      inputRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMode('');
        }
        if (e.key === 'Enter') {
          if (inputRef.current?.value !== '') {
            handleAddCard();
          }
          setMode('');
        }
      });
      inputRef.current?.focus();
    }

    if (mode !== '') {
      modalRef.current?.showModal();
      modalRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMode('');
        }
        if (mode === 'edit' && e.key === 'Enter') {
          if (inputRef.current?.value !== '') {
            handleUpdateList();
          }
        }
      });
    }
  }, [mode]);

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
          {
            name: 'Edit List Name',
            func: () => setMode('edit'),
            icon: <IconPencil />,
          },
          {
            name: 'Delete List',
            func: () => handleDeleteList(),
            icon: <IconTrash />,
          },
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
        list.cards.map((card) => <Card key={'c' + card.id} card={card} />)}
    </div>
  );

  const ListButtons = () => {
    if (mode === '') {
      return (
        <Button variant={'hover'} onClick={() => setMode('add')}>
          <IconPlus size={18} />
          Add card
        </Button>
      );
    }

    if (mode === 'add') {
      return (
        <div className='flex w-full flex-col gap-2'>
          <Input
            type='text'
            ref={inputRef}
            placeholder='Card title'
            id='card'
          />
          <div className='flex gap-2'>
            <Button variant={'outlined'} onClick={() => setMode('')}>
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

  const ListModal = () => {
    if (mode === 'edit')
      return (
        <Modal size='sm' title={'Edit List'} ref={modalRef}>
          <Input
            type='text'
            ref={inputRef}
            placeholder='List title'
            id='list'
          />
          <div className='flex gap-2'>
            <Button variant={'outlined'} onClick={() => setMode('')}>
              <IconX stroke={3} />
            </Button>
            <Button
              variant={'outlined'}
              className='w-full'
              onClick={() => handleUpdateList()}
            >
              <IconCheck stroke={3} />
              <p>Save</p>
            </Button>
          </div>
        </Modal>
      );
  };

  return (
    <Container size={'sm'} snap={true}>
      <ListHeader />
      <ListContent />
      <ListButtons />
      <ListModal />
    </Container>
  );
};
