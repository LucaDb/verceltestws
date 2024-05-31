
import { Flex, UIComponentWithRef, UIStyledComponentProps } from '@websolutespa/bom-mixer-ui';
import React, { ComponentPropsWithRef, ReactElement, ReactNode, forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CheckboxCardBase, CheckboxCardProps } from './checkbox-card-base';

type Props = ComponentPropsWithRef<'input'> & {
  initialValue?: string[];
  children?: ReactNode;
};

export type CheckboxCardGroupProps = UIStyledComponentProps<Props, 'input'>;

export type CheckboxCardGroupComponent<C extends React.ElementType = 'input'> = UIComponentWithRef<C, Props>;

const StyledCheckboxCardGroup = styled(Flex.Row)`
  column-gap: 10px;
  row-gap: 15px;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const CheckboxCardGroup: CheckboxCardGroupComponent = forwardRef(({
  children,
  className,
  initialValue,
  onChange,
  ...props
}, ref) => {
  const [values, setValues] = useState(initialValue || null);

  useEffect(() => {
    setValues(initialValue || null);
  }, [initialValue]);

  const onChange_ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newValues = [...(values || [])];
    const index = newValues.indexOf(value);
    if (index !== -1) {
      newValues.splice(index, 1);
    } else {
      newValues.push(value);
    }
    // console.log('onChange_', value, newValues);
    setValues(newValues);
    if (onChange) {
      onChange(event);
    }
    if (event.defaultPrevented) {
      return;
    }
  };

  const mappedChildren = React.Children.map(children || [], (child) => {
    if (!React.isValidElement<CheckboxCardProps>(child)) {
      return child;
    }
    const item: ReactElement<CheckboxCardProps> = child;
    if (item.type === CheckboxCardBase) {
      return React.cloneElement(item, {
        ...child.props,
        checked: child.props.value ? (values?.includes(String(child.props.value)) || false) : false,
        onChange: onChange_,
      });
    }
    return child;
  });

  // !!! ref to group

  return (
    <StyledCheckboxCardGroup ref={ref} className={className} {...props}>
      {mappedChildren}
    </StyledCheckboxCardGroup>
  );
});

CheckboxCardGroup.displayName = 'CheckboxCardGroup';
