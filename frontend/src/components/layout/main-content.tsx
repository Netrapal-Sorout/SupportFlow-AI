import type { PropsWithChildren } from 'react';

export function MainContent({
  children,
}: PropsWithChildren) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
      <div className="mx-auto w-full max-w-[1600px] p-6 lg:p-7">
        {children}
      </div>
    </main>
  );
}