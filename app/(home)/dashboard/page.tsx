import { Dashboard } from '@/components/Dashboard';

export default function Page() {
  return (
    <div className='flex flex-col items-center gap-2 p-4'>
      <h1 className='text-3xl font-bold'>Boards</h1>
      <div className='flex h-max max-h-full min-w-full flex-1 flex-col gap-4 rounded-lg bg-white/70 p-4 shadow-xl ring-1 ring-inset ring-white/70 backdrop-blur sm:w-[640px] sm:min-w-72 dark:bg-black/70 dark:ring-black/70'>
        <Dashboard />
      </div>
    </div>
  );
}
