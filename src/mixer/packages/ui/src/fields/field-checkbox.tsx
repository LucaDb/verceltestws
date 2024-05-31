
import { FormControl, useControl } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Checkbox, Field, FieldProps, Label, mediaUp } from '@websolutespa/bom-mixer-ui';
import { ChangeEvent, FocusEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import { FieldError } from './field-error';

type FieldCheckboxProps = {
  control: FormControl;
  uid?: number;
};

const StyledField = styled(Field)`
  label {
    font-size: var(--font-paragraph30-size);
    line-height: var(--font-paragraph30-line-height);

    ${props => mediaUp(props, 'md', css`
      font-size: var(--font-paragraph20-size);
      line-height: var(--font-paragraph20-line-height);
    `)}
  }
`;

export function FieldCheckbox({ control, uid = 0, ...props }: FieldCheckboxProps & FieldProps) {
  const label = useLabel();

  const uniqueName = `${control.name}-${uid}`;

  const [state, setValue, setTouched] = useControl<boolean>(control);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('onChange', event.target.checked);
    setValue(event.target.checked);
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
      <StyledField state={state} {...props}>

        {/* type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'} */}

        <Label htmlFor={uniqueName} margin="0">
          <Checkbox
            id={uniqueName}
            name={uniqueName}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={state.flags.disabled || state.flags.readonly}
            checked={state.value === true}
          />
          {control.label && label(control.label)}
        </Label>

        <FieldError state={state} />
      </StyledField>
    )
  );
}

// {JSON.stringify(props.control.errors[key])}
