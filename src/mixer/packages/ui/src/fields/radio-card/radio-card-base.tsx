
import { getClassNames } from '@websolutespa/bom-core';
import { CssDefault, CssFormControl, Flex, Media, Text, TextComponent, UIComponentWithRef, UIStyledComponentProps, getChildsByType, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import React, { ComponentPropsWithRef, ReactNode, SVGProps, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { RadioIcon } from './radio-icon';

type Props = ComponentPropsWithRef<'input'> & {
  children?: ReactNode;
};

export type RadioCardProps = UIStyledComponentProps<Props, 'input'>;

export type RadioCardComponent<C extends React.ElementType = 'input'> = UIComponentWithRef<C, Props>;

const RadioCardDisabledSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor" {...props}>
    <line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke"></line>
  </svg>
);

const RadioCardDisabled = styled(RadioCardDisabledSvg)`
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

const StyledRadioCardInput = styled.div`
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

const StyledRadioCardButton = styled.div<RadioCardProps>`
  ${CssDefault}
  ${CssFormControl}

  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  padding: 0.8em;
  border-radius: 15px;
  border: 2px solid black;

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

    .radio-icon {
      color: var(--form-color-disabled);
    }
  }

  input:not(:checked) ~ & {
    .abstract {
      display: none;
    }
  }

  input:checked ~ & {
    .radio-icon {
      color: var(--form-outline-color-active);
    }
  }

  input:not(:disabled):hover ~ & {
    .radio-icon {
      outline-color: var(--form-border-color-hover);
    }
  }

  input:focus ~ & {
    .radio-icon {
      outline-color: var(--form-outline-color-focus);
    }
  }

  ${props => getCssResponsive(props)}
`;

const StyledRadioIcon = styled.div`
  border-radius: 50%;
  color: var(--color-neutral-300);
  pointer-events: none;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline-color 150ms ease-in 0s, color 200ms ease-out 0s;
  margin: 8px 0;
`;

const StyledRadioCard = styled.div<RadioCardProps>`
  position: relative;
  display: flex;
  line-height: 1;

  flex: 0 1 100%;

  ${props => mediaUp(props, 'md', css`
    flex: 0 1 calc(50% - 15px);
  `)}

  .text {
    font-feature-settings: 'ss01';
  }

  ${props => getCssResponsive(props)}
`;

export const RadioCardTitle: TextComponent = forwardRef(({
  as = 'div',
  className,
  ...props
}, ref) => {
  const classNames = getClassNames('title', className);
  return (
    <Text variant="paragraph40" variantMd="paragraph20" className={classNames} ref={ref} {...props} />
  );
});

RadioCardTitle.displayName = 'RadioCardTitle';

export const RadioCardAbstract: TextComponent = forwardRef(({
  as = 'div',
  className,
  ...props
}, ref) => {
  const classNames = getClassNames('abstract', className);
  return (
    <Text className={classNames} ref={ref} {...props} />
  );
});

RadioCardAbstract.displayName = 'RadioCardAbstract';

export const RadioCardExtra: TextComponent = forwardRef(({
  as = 'div',
  className,
  ...props
}, ref) => {
  const classNames = getClassNames('extra', className);
  return (
    <Text variant="paragraph30" whiteSpace="nowrap" className={classNames} ref={ref} {...props} />
  );
});

RadioCardExtra.displayName = 'RadioCardExtra';

export const RadioCardMedia = styled(Media)`
  width: 80px;
  height: 40px;
`;

export const RadioCardBase: RadioCardComponent = forwardRef(({
  as = 'input',
  children,
  className,
  ...props
}, ref) => {

  const [mediaChildren, withoutMediaChildren] = getChildsByType(children, RadioCardMedia);
  const hasMedia = mediaChildren && React.Children.count(mediaChildren) > 0;

  const [extraChildren, otherChildren] = getChildsByType(withoutMediaChildren, RadioCardExtra);
  const hasExtra = extraChildren && React.Children.count(extraChildren) > 0;

  const classNames = getClassNames('radio-option', className);

  return (
    <StyledRadioCard className={classNames} {...props}>
      <StyledRadioCardInput ref={ref} as={as} type="radio" {...props} />
      <StyledRadioCardButton as="button">
        <Flex.Row gap="1rem" alignItems="center" width="100%">
          <Flex.Col className="radio-option__icon" flexBasis="24px">
            <StyledRadioIcon as={RadioIcon} className="radio-icon" aria-hidden="true" />
          </Flex.Col>
          <Flex.Col className="radio-option__description" flexGrow="1">
            {otherChildren}
          </Flex.Col>
          {(hasExtra || hasMedia) &&
            <Flex className="radio-option__extra" flexBasis="50px">
              {mediaChildren}
              {extraChildren}
            </Flex>
          }
        </Flex.Row>
      </StyledRadioCardButton>
      <RadioCardDisabled className="line" />
    </StyledRadioCard>
  );
});

RadioCardBase.displayName = 'RadioCard';
