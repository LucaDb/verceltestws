
import { getClassNames } from '@websolutespa/bom-core';
import { CssDefault, CssFormControl, Flex, Media, Text, TextComponent, UIComponentWithRef, UIStyledComponentProps, getChildsByType, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import React, { ComponentPropsWithRef, ReactNode, SVGProps, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { CheckboxIcon } from './checkbox-icon';

type Props = ComponentPropsWithRef<'input'> & {
  children?: ReactNode;
};

export type CheckboxCardProps = UIStyledComponentProps<Props, 'input'>;

export type CheckboxCardComponent<C extends React.ElementType = 'input'> = UIComponentWithRef<C, Props>;

const CheckboxCardDisabledSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor" {...props}>
    <line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke"></line>
  </svg>
);

const CheckboxCardDisabled = styled(CheckboxCardDisabledSvg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;

  border: var(--form-border);
  border-width: var(--form-border-width);
  border-color: var(--form-border-color-disabled);
  border-radius: var(--form-border-radius);
  color: var(--form-border-color-disabled);

  input:disabled ~ &,
  input.disabled ~ & {
    display: block;
  }
`;

const StyledCheckboxCardInput = styled.div`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledCheckboxCardButton = styled.div<CheckboxCardProps>`
  ${CssDefault}
  ${CssFormControl}

  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  padding: 15px 30px;
  border-radius: 40px;

  ${props => mediaUp(props, 'md', css`
    padding: 10px 25px;
    border-radius: 30px;
  `)}

  input:not(:disabled):hover ~ & {
    border-color: var(--form-border-color-hover);
    color: var(--form-color-hover);
    box-shadow: 0 20px 20px -5px rgba(0, 0, 0, 0.15);
  }

  input:focus ~ &,
  input:active ~ & {
    outline-color: var(--form-outline-color-focus);
  }

  input:checked ~ &,
  input.active ~ & {
    outline-color: var(--form-outline-color-active);
  }

  input:disabled ~ &,
  input.disabled ~ & {
    background: var(--form-background-color-disabled);
    color: var(--form-color-disabled);
    pointer-events: none;

    .checkbox-icon {
      color: var(--form-color-disabled);
    }
  }

  input:not(:checked) ~ & {
    .abstract {
      display: none;
    }
  }

  input:checked ~ & {
    .checkbox-icon {
      color: var(--form-outline-color-active);
    }
  }

  input:not(:disabled):hover ~ & {
    .checkbox-icon {
      outline-color: var(--form-border-color-hover);
    }
  }

  input:focus ~ & {
    .checkbox-icon {
      outline-color: var(--form-outline-color-focus);
    }
  }

  ${props => getCssResponsive(props)}
`;

const StyledCheckboxIcon = styled.div`
  border-radius: 50%;
  color: var(--color-neutral-300);
  pointer-events: none;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline-color 150ms ease-in 0s, color 200ms ease-out 0s;
  margin: 8px 0;
`;

const StyledCheckboxCard = styled.div<CheckboxCardProps>`
  position: relative;
  display: flex;
  line-height: 1;
  ${props => getCssResponsive(props)}
`;

export const CheckboxCardTitle: TextComponent = forwardRef(({
  as = 'div',
  className,
  ...props
}, ref) => {
  const classNames = getClassNames('title', className);
  return (
    <Text variant="paragraph30" variantMd="paragraph20" className={classNames} ref={ref} {...props} />
  );
});

CheckboxCardTitle.displayName = 'CheckboxCardTitle';

export const CheckboxCardAbstract: TextComponent = forwardRef(({
  as = 'div',
  className,
  ...props
}, ref) => {
  const classNames = getClassNames('abstract', className);
  return (
    <Text className={classNames} ref={ref} {...props} />
  );
});

CheckboxCardAbstract.displayName = 'CheckboxCardAbstract';

export const CheckboxCardExtra: TextComponent = forwardRef(({
  as = 'div',
  className,
  ...props
}, ref) => {
  const classNames = getClassNames('extra', className);
  return (
    <Text variant="paragraph20" whiteSpace="nowrap" className={classNames} ref={ref} {...props} />
  );
});

CheckboxCardExtra.displayName = 'CheckboxCardExtra';

export const CheckboxCardMedia = styled(Media)`
  width: 80px;
  height: 40px;
`;

export const CheckboxCardBase: CheckboxCardComponent = forwardRef(({
  as = 'input',
  children,
  className,
  ...props
}, ref) => {

  const [mediaChildren, withoutMediaChildren] = getChildsByType(children, CheckboxCardMedia);
  const hasMedia = mediaChildren && React.Children.count(mediaChildren) > 0;

  const [extraChildren, otherChildren] = getChildsByType(withoutMediaChildren, CheckboxCardExtra);
  const hasExtra = extraChildren && React.Children.count(extraChildren) > 0;

  const classNames = getClassNames('checkbox-option', className);

  return (
    <StyledCheckboxCard className={classNames} {...props}>
      <StyledCheckboxCardInput ref={ref} as={as} type="checkbox" {...props} />
      <StyledCheckboxCardButton as="button">
        <Flex.Row gap="1rem" alignItems="flex-start" width="100%">
          {false && (
            <Flex.Col className="checkbox-option__icon" flexBasis="24px">
              <StyledCheckboxIcon as={CheckboxIcon} className="checkbox-icon" aria-hidden="true" />
            </Flex.Col>
          )}
          <Flex.Col className="checkbox-option__description" flexGrow="1">
            {otherChildren}
          </Flex.Col>
          {(hasExtra || hasMedia) &&
            <Flex className="checkbox-option__extra" flexBasis="50px">
              {mediaChildren}
              {extraChildren}
            </Flex>
          }
        </Flex.Row>
      </StyledCheckboxCardButton>
      <CheckboxCardDisabled className="line" />
    </StyledCheckboxCard>
  );
});

CheckboxCardBase.displayName = 'CheckboxCard';
