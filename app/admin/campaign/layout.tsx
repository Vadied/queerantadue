import { CampaignProvider } from '@/contexts/campaign';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Campagna',
  description: 'Gestione giocatori'
};

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  return <CampaignProvider>{children}</CampaignProvider>;
}
