import { QueerantatreProvider } from '@/contexts/queerantatre';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Queerantatre',
  description: 'Gestione domande e risposte'
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  return <QueerantatreProvider>{children}</QueerantatreProvider>;
}
