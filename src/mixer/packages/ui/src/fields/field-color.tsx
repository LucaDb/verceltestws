import { IOption } from '@websolutespa/bom-core';
import { FormControl, useControl } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Field, FieldProps, Flex, Label, RadioColor, mediaUp } from '@websolutespa/bom-mixer-ui';
import { ChangeEvent, FocusEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import { FieldError } from './field-error';

type FieldColorProps = {
  control: FormControl;
  uid?: number;
};

const StyledField = styled(Field)`
  button {
    width: 40px;
    height: 40px;

    ${props => mediaUp(props, 'md', css`
      width: 60px;
      height: 60px;
    `)}
  }
`;

export function FieldColor({ control, uid = 0, ...props }: FieldColorProps & FieldProps) {
  const label = useLabel();

  const uniqueName = `${control.name}-${uid}`;

  const [state, setValue, setTouched] = useControl<IOption>(control);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('onChange', event.target.value);
    const option = control.options?.find(x => x.id.toString() === event.target.value);
    setValue(option || null);
  };

  const [focus, setFocus] = useState(false);

  const onBlur = (_: FocusEvent<HTMLInputElement>) => {
    setTouched();
    setFocus(false);
  };

  const onFocus = (_: FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  };

  return (
    state.flags.hidden ? (
      <input type="hidden" value={state.value ? state.value.toString() : ''} />
    ) : (
      <>
        <StyledField variant="natural" state={state} {...props}>
          <Flex.Col rowGap="30px" rowGapMd="60px">
            {control.label && (
              <Label variant="natural" htmlFor={uniqueName} dangerouslySetInnerHTML={{ __html: label(control.label) }} />
            )}
            <RadioColor.Group
              id={uniqueName}
              name={uniqueName}
              initialValue={state.value?.id.toString()}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              disabled={state.flags.disabled || state.flags.readonly}
              gap="15px" gapMd="30px"
            >
              {control.options?.map(option => (
                <RadioColor key={option.id} value={option.id} color={option.color}>
                  {option.name}
                </RadioColor>
              ))}
            </RadioColor.Group>
          </Flex.Col>
        </StyledField>
        <FieldError state={state} />
      </>
    )
  );
}
