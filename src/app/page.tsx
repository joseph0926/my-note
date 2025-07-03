import { Memo } from '@/components/ui/memo';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <ScrollProgress />
      <main className="flex h-screen items-center justify-center">
        <Memo />
      </main>
      {/* TODO: 스크롤 프로그래스를 위한 더미 요소 */}
      <div className="h-[200vh] w-full bg-yellow-400 opacity-50" />
    </div>
  );
}
