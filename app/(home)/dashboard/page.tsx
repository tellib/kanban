import { Dashboard } from '@/components/Dashboard';

export default function Page() {
  return (
    <div className='mx-auto flex w-full flex-1 flex-col items-center gap-2 overflow-y-auto p-4 sm:w-[640px]'>
      <Dashboard />
    </div>
  );
}
