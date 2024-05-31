import { FormControl, useControl } from '@websolutespa/bom-mixer-forms';
import { useLabel, useResize } from '@websolutespa/bom-mixer-hooks';
import { IconEye } from '@websolutespa/bom-mixer-icons';
import { Field, Input, Label } from '@websolutespa/bom-mixer-ui';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FieldError } from './field-error';

type FieldPasswordProps = {
  control: FormControl;
  uid?: number;
};

const StyledOffscreen = styled.span`
  display: inline-block;
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  left: 0;
  min-width: 200px;
`;

export function FieldPassword({ control, uid = 0 }: FieldPasswordProps) {
  const label = useLabel();

  const uniqueName = `${control.name}-${uid}`;

  const [state, setValue, setTouched] = useControl<string>(control);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.style.setProperty('width', `${(spanRef.current?.offsetWidth || 0)}px`);
  }, [state.value]);

  useResize(() => {
    inputRef.current?.style.setProperty('width', `${(spanRef.current?.offsetWidth || 0)}px`);
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('FieldPassword', event.target.value);
    setValue(event.target.value);
    // control.value = event.target.value;
  };

  const [focus, setFocus] = useState(false);

  const [type, setType] = useState('password');

  const onBlur = (_: FocusEvent<HTMLInputElement>) => {
    setTouched();
    setFocus(false);
  };

  const onFocus = (_: FocusEvent<HTMLInputElement>) => {
    setFocus(true);
  };

  const onToggle = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    state.flags.hidden ? (
      <input type="hidden" value={state.value || ''} />
    ) : (
      <>
        <Field variant="natural" state={state}>
          {control.label && (
            <Label variant="natural" htmlFor={uniqueName} dangerouslySetInnerHTML={{ __html: label(control.label) }} />
          )}
          <StyledOffscreen ref={spanRef}>{control.value || control.placeholder || control.label || ''}</StyledOffscreen>
          <Input variant="natural"
            ref={inputRef}
            id={uniqueName}
            name={uniqueName}
            type={type}
            placeholder={label(control.placeholder || control.label || '')}
            value={state.value || ''}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={state.flags.disabled}
            readOnly={state.flags.readonly}
            width="100%"
            after={<IconEye color={type === 'password' ? 'var(--color-neutral-400)' : 'var(--color-cyan-500)'} onClick={() => onToggle()} />}
          />

        </Field>
        <FieldError state={state} />
      </>
    )
  );
}

