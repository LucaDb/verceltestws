import { IOption } from '@websolutespa/bom-core';
import { FormControl, useControl } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Field, FieldProps, Flex, Label } from '@websolutespa/bom-mixer-ui';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { FieldError } from './field-error';
import { RadioCard } from './radio-card/radio-card';

type FieldCardProps = {
  control: FormControl;
  uid?: number;
};

export function FieldCard({ control, uid = 0, ...props }: FieldCardProps & FieldProps) {
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
        <Field variant="natural" state={state} {...props}>
          <Flex.Col rowGap="30px" rowGapMd="60px">
            {control.label && (
              <Label variant="natural" htmlFor={uniqueName} dangerouslySetInnerHTML={{ __html: label(control.label) }} />
            )}
            <RadioCard.Group
              id={uniqueName}
              name={uniqueName}
              initialValue={state.value?.id.toString()}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              disabled={state.flags.disabled || state.flags.readonly}
            >
              {control.options?.map(option => (
                <RadioCard key={option.id} value={option.id.toString()}>
                  <RadioCard.Title>{option.name}</RadioCard.Title>
                  {option.abstract && (
                    <RadioCard.Abstract dangerouslySetInnerHTML={{ __html: option.abstract }} />
                  )}
                </RadioCard>
              ))}
            </RadioCard.Group>
          </Flex.Col>
        </Field>
        <FieldError state={state} />
      </>
    )
  );
}
