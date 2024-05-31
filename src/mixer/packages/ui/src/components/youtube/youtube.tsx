import { IYoutube } from '@websolute/models';
import styled from 'styled-components';

const StyledYoutube = styled.iframe`
  display: flex;
  aspect-ratio: 16/9;
  width: 100%;
  border: none;
`;
export const Youtube: React.FC<IYoutube> = ({ title, src }: IYoutube) => {
  return (
    <StyledYoutube
      src={src}
      title={title || 'Untitled'}
      aria-label={title || 'Youtube video'}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};
