import { Drawer } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const Sidebar = ({ children }: Props) => {
  return (
    <Drawer>
      {children}
    </Drawer>
  );
};

export default Sidebar;
