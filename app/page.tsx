import { TradeEntryCalculator } from './components/TradeEntryCalculator';
import { CompoundingSimulator } from './components/CompoundingSimulator';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-full max-w-full px-0">
      <TradeEntryCalculator />
      <CompoundingSimulator />
      <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
        By{' '}
        <Link href="https://x.com/RiskyGhazi" target="_blank" rel="noopener noreferrer" className="text-[#ffc500] hover:underline">
          @Riskyghazi
        </Link>
        {' '}- For{' '}
        <Link href="https://x.com/alphadhad" target="_blank" rel="noopener noreferrer" className="text-[#ffc500] hover:underline">
          @Alphadhad
        </Link>
      </div>
    </main>
  );
}
