
import { FormControl, useControl } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Field, Label, Radio, Text } from '@websolutespa/bom-mixer-ui';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { FieldError } from './field-error';

type FieldAcceptProps = {
  control: FormControl;
  uid?: number;
};

export function FieldAccept({ control, uid = 0 }: FieldAcceptProps) {
  const label = useLabel();

  const uniqueName = `${control.name}-${uid}`;
  const uniqueNameTrue = `${uniqueName}-true`;
  const uniqueNameFalse = `${uniqueName}-false`;

  const [state, setValue, setTouched] = useControl<boolean>(control);

  const onSelect = (value: boolean) => {
    // console.log('value', value);
    setValue(value);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSelect(event.target.value === 'true');
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
      <input type="hidden" value={state.value ? 'true' : 'false'} />
    ) : (
      <Field state={state} padding="1em 0" borderBottom="1px solid var(--color-neutral-200)">

        <Radio.Group initialValue={state.value ? 'true' : 'false'}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={state.flags.disabled || state.flags.readonly}
        >
          <Label htmlFor={uniqueNameTrue} width="auto">
            <Radio value="true" name={uniqueNameTrue} id={uniqueNameTrue} />
            {label('form.accept.true')}
          </Label>
          <Label htmlFor={uniqueNameFalse} width="auto">
            <Radio value="false" name={uniqueNameFalse} id={uniqueNameFalse} />
            {label('form.accept.false')}
          </Label>
        </Radio.Group>

        {control.label &&
          <Text>
            {label(control.label)}
          </Text>
        }

        <FieldError state={state} />
      </Field>
    )
  );
}
