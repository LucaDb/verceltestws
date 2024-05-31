import { Box, UIComponent, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import React, { ReactNode } from 'react';

// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styled, { css } from 'styled-components';

// gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};

export type FolderProps = UIStyledComponentProps<Props>;
export type FolderContainerProps = FolderProps;
export type FolderComponent<C extends React.ElementType = 'div'> = UIComponent<C, Props>;

const FolderContainer = styled.div<FolderContainerProps>`

    flex: none;
    height: auto;
    max-width: 100%;
    position: sticky;
    top: 100px;
    transform: perspective(1200px);
    width: 100%;
    will-change: transform;
    z-index: 1;
    border-radius: 15px;

  .card {
    align-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 80vh;
    justify-content: space-between;
    overflow: hidden;
    padding: 20px;
    position: relative;
    will-change: transform;
    max-width: 100%;
    width: 100%;
    opacity: 1;

    ${props => mediaUp(props, 'sm', css`
      padding: 40px;
    `)}
  }

  ${props => getCssResponsive(props)}
`;

export const FolderCard: FolderComponent = ({ children, ...props }) => {

  return (
    <FolderContainer {...props}>
      <Box className="card" >{children}</Box>
    </FolderContainer>
  );
};
