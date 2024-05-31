import { IEquatable, IOption } from '@websolutespa/bom-core';
import { FormControl, stringToValue, useControl, valueToString } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { CustomSelect, Field, Label } from '@websolutespa/bom-mixer-ui';
import { FocusEvent, useState } from 'react';
import { FieldError } from './field-error';

type FieldSelectProps = {
  control: FormControl;
  uid?: number;
};

export function FieldSelect({ control, uid = 0 }: FieldSelectProps) {
  const label = useLabel();

  const uniqueName = `${control.name}-${uid}`;

  const [state, setValue, setTouched] = useControl<IOption | IOption[] | IEquatable | IEquatable[]>(control);

  const onChange = (value: string | string[]) => {
    const valueOrValues = stringToValue(value, control.options, control.optionsExtra);
    setValue(valueOrValues);
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
      <input type="hidden" value={valueToString(state.value)} />
    ) : (
      <Field state={state}>
        <Label htmlFor={uniqueName}>
          {control.label && label(control.label)}
        </Label>

        {/* type={(state.flags.invalid && state.flags.touched) ? 'error' : 'default'} */}
        <CustomSelect
          id={uniqueName}
          name={uniqueName}
          placeholder={label(control.placeholder || control.label || '')}
          value={valueToString(state.value)}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={state.flags.disabled || state.flags.readonly}
          width="100%"
        >
          {control.options && control.options.map((option, i) => (
            <CustomSelect.Option key={i} value={option.id.toString()}>{option.name as string}</CustomSelect.Option>
          ))}
        </CustomSelect>

        <FieldError state={state} />
      </Field>
    )
  );
}
