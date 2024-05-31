import { IconClose } from '@websolute/icons';
import { useLayout } from '@websolutespa/bom-mixer-hooks';
import { Box, Button, Flex, Link } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Logo } from '../../components/logo/logo';
import { LogoDot } from '../../components/logo/logo-dot';

type HeaderDialogProps = {
  onClose?: () => void;
};

const StyledButtonWebsolute = styled(Button)`
  display: flex;
  justify-content: center;
  column-gap: 10px;

  .icon--logo-dot {
    width: 21px;
    height: 21px;
    color: var(--color-cyan-500);
  }

  .icon--logo {
    width: 100px;
    height: 17px;
    color: var(--color-neutral-800);
  }
`;

const StyledButtonClose = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 19px;
  background: var(--color-neutral-800);
  color: var(--color-neutral-100);

  svg {
    width: 10px;
    height: 10px;
    fill: currentColor;
  }
`;

export const HeaderDialog = (props: HeaderDialogProps) => {
  const layout = useLayout();
  const onClose = () => {
    if (typeof props.onClose === 'function') {
      props.onClose();
    }
  };
  return (
    <Box className="header-dialog" padding="20px" paddingSm="30px">
      <Flex.Row justifyContent="space-between" alignItems="center">
        <Link href={layout.topLevelHrefs.homepage || '/'}>
          <StyledButtonWebsolute as="a" title="Websolute">
            <LogoDot />
            <Logo />
          </StyledButtonWebsolute>
        </Link>
        <StyledButtonClose title="Chiudi" onClick={onClose}>
          <IconClose />
        </StyledButtonClose>
      </Flex.Row>
    </Box>
  );
};
