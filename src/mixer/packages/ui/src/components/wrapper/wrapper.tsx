
import { IComponent } from '@websolute/models';
import { getClassNames, withSchema } from '@websolutespa/bom-core';
import { UIComponentWithRef, UIStyledComponentProps } from '@websolutespa/bom-mixer-ui';
import { ReactNode, forwardRef } from 'react';
import styled from 'styled-components';

type Props = IComponent & {
  children?: ReactNode;
  className?: string;
};

export type WrapperProps = UIStyledComponentProps<Props>;

const WrapperContainer = styled.section<WrapperProps>`
  position: relative;
  z-index: 1;
`;

export type WrapperBaseComponent<C extends React.ElementType = 'section'> = UIComponentWithRef<C, Props>;

const WrapperBase: WrapperBaseComponent = forwardRef(({ children, className, as = 'section', anchor, colorScheme = 'light', ...props }, ref) => {

  const id = anchor?.hash;
  const title = anchor?.title;
  const classNames = getClassNames(className, colorScheme);

  return (
    <WrapperContainer ref={ref} as={as} id={id} title={title} className={classNames} {...props}>
      {children}
    </WrapperContainer>
  );
});

WrapperBase.displayName = 'Wrapper';

export const Wrapper = withSchema(WrapperBase, {
  displayName: 'Wrapper',
});
