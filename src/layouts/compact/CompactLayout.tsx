// next
import { Container, Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import { HEADER } from '../../config';
import useOffSetTop from '../../hooks/useOffSetTop';
//
const Header = dynamic(() => import('./Header'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
