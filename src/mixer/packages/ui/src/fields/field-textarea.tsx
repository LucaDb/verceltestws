import { FormControl, useControl } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Field, Flex, Label, TextArea } from '@websolutespa/bom-mixer-ui';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { FieldError } from './field-error';

type FieldTextAreaProps = {
  control: FormControl;
  uid?: number;
};

export function FieldTextArea({ control, uid = 0 }: FieldTextAreaProps) {
  const label = useLabel();

  const uniqueName = `${control.name}-${uid}`;

  const [state, setValue, setTouched] = useControl<string>(control);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // console.log('FieldTextArea', event.target.value);
    setValue(event.target.value);
    // control.value = event.target.value;
  };

  const [focus, setFocus] = useState(false);

  const onBlur = (_: FocusEvent<HTMLTextAreaElement>) => {
    setTouched();
    setFocus(false);
  };

  const onFocus = (_: FocusEvent<HTMLTextAreaElement>) => {
    setFocus(true);
  };

  return (
    state.flags.hidden ? (
      <input type="hidden" value={state.value || ''} />
    ) : (
      <>
        <Field variant="natural" state={state}>
          <Flex.Col rowGap="30px" rowGapMd="60px">
            {control.label && (
              <Label variant="natural" htmlFor={uniqueName} dangerouslySetInnerHTML={{ __html: label(control.label) }} />
            )}
            <TextArea
              id={uniqueName}
              name={uniqueName}
              placeholder={label(control.placeholder || control.label || '')}
              value={state.value || ''}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              disabled={state.flags.disabled}
              readOnly={state.flags.readonly}
              width="100%" />
          </Flex.Col>
        </Field>
        <FieldError state={state} />
      </>
    )
  );
}

