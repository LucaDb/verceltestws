import { IOption } from '@websolutespa/bom-core';
import { FormControl, useControl } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Field, FieldProps, Flex, Label } from '@websolutespa/bom-mixer-ui';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { CheckboxCard } from './checkbox-card/checkbox-card';
import { FieldError } from './field-error';

type FieldPillProps = {
  control: FormControl;
  uid?: number;
};

export function FieldPill({ control, uid = 0, ...props }: FieldPillProps & FieldProps) {
  const label = useLabel();

  const uniqueName = `${control.name}-${uid}`;

  const [state, setValue, setTouched] = useControl<IOption[]>(control);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const option = control.options?.find(x => x.id.toString() === value);
    const newValues = [...(state.value || [])];
    const index = newValues.reduce((p, c, i) => {
      return c.id === value ? i : p;
    }, -1);
    if (index !== -1) {
      newValues.splice(index, 1);
    } else if (option) {
      newValues.push(option);
    }
    // console.log('onChange', value, option, newValues);
    setValue(newValues);
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
      <input type="hidden" value={state.value ? state.value.map(x => x.id).join(',') : ''} />
    ) : (
      <>
        <Field variant="natural" state={state} {...props}>
          <Flex.Col rowGap="30px" rowGapMd="60px">
            {control.label && (
              <Label variant="natural" htmlFor={uniqueName} dangerouslySetInnerHTML={{ __html: label(control.label) }} />
            )}
            <CheckboxCard.Group
              id={uniqueName}
              name={uniqueName}
              initialValue={(state.value || []).map(x => x.id.toString())}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              disabled={state.flags.disabled || state.flags.readonly}
            >
              {control.options?.map(option => (
                <CheckboxCard key={option.id} value={option.id.toString()}>
                  <CheckboxCard.Title>{option.name}</CheckboxCard.Title>
                  {option.abstract && (
                    <CheckboxCard.Abstract dangerouslySetInnerHTML={{ __html: option.abstract }} />
                  )}
                </CheckboxCard>
              ))}
            </CheckboxCard.Group>
          </Flex.Col>
        </Field>
        <FieldError state={state} />
      </>
    )
  );
}
