// TODO checklists

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { TextArea } from '@/components/TextArea';
import { deleteCard, getCard, updateCard } from '@/lib/card';
import { CardData } from '@/models/data';
import { IconTrash, IconX } from '@tabler/icons-react';
import { forwardRef, useEffect, useRef, useState } from 'react';

interface CardWindowProps {
  data: CardData;
  onClose: () => void;
  onDelete: (id: number) => void;
  onUpdate: (card: CardData) => void;
}

export const CardWindow = forwardRef<HTMLDialogElement, CardWindowProps>(
  ({ data, onClose, onDelete, onUpdate }, ref) => {
    const [card, setCard] = useState<CardData>(data);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const dueRef = useRef<HTMLInputElement>(null);
    const completedRef = useRef<HTMLInputElement>(null);

    const handleUpdateCard = () => {
      const uCard: CardData = {
        ...card,
        title: titleRef.current?.value || '',
        description: descriptionRef.current?.value || '',
        // due_on: dueRef.current?.value || '',
        // completed_at: completedRef.current?.value || '',
      };

      updateCard(uCard).then((uCard) => {
        if (uCard) {
          console.log('Updated card', uCard);
          setCard(uCard);
          onUpdate(uCard);
        } else console.log('Error updating card');
      });
    };

    const handleDeleteCard = () => {
      if (!card.id) return;
      deleteCard(card.id).then((dCard) => {
        if (dCard && card.id) {
          console.log('Deleted card', dCard);
          setCard(dCard);
          onDelete(card.id);
        }
      });
    };

    useEffect(() => {
      getCard(card.id as number).then((gCard) => {
        if (gCard) {
          setCard(gCard);
        }
      });
    }, []);

    if (!card) return <></>;

    const handleCancel = () => {
      onClose();
    };

    return (
      <Modal ref={ref}>
        <Input
          ref={titleRef}
          type='text'
          defaultValue={card?.title}
          label='Title'
          className='text-lg font-bold'
        />
        <TextArea
          ref={descriptionRef}
          defaultValue={card?.description}
          label='Description'
          className='h-96'
          typeof='text'
        />
        <div>
          <Button onClick={() => handleDeleteCard()} className=''>
            <IconTrash />
            <p>Delete</p>
          </Button>
        </div>
        <div className='flex gap-4'>
          <Input
            ref={dueRef}
            type='date'
            defaultValue={card?.due_on}
            label='Due Date'
          />
          <Input
            ref={completedRef}
            type='date'
            defaultValue={card?.completed_at}
            label='Completed'
          />
        </div>
        <div className='flex gap-4'>
          <Button variant={'secondary'} onClick={onClose} className='w-full'>
            Cancel
          </Button>
          <Button onClick={() => handleUpdateCard()} className='w-full'>
            Save
          </Button>
        </div>
      </Modal>
    );
  }
);
CardWindow.displayName = 'CardWindow';
