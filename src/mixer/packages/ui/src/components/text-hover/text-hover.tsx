import { ITextHover } from '@websolute/models';
import { Box } from '@websolutespa/bom-mixer-ui';

export const TextHover: React.FC<ITextHover> = ({ children, index, setModal }: ITextHover) => {
  return (
    <Box onMouseEnter={() => { setModal({ active: true, index }) }} onMouseLeave={() => { setModal({ active: false, index }) }}>
      {children}
    </Box>
  );
};
