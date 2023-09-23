'use client';

import { SWRConfig } from 'swr';
import type { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((r) => r.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
