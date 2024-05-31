
import { IEquatable, IOption } from '@websolutespa/bom-core';
import { FormControl, stringToValue, useControl, valueToString } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Autocomplete, Field, IAutocompleteItem, Label } from '@websolutespa/bom-mixer-ui';
import { FocusEvent, useMemo, useState } from 'react';
import { FieldError } from './field-error';

type FieldAutocompleteProps = {
  control: FormControl;
  uid?: number;
};

// !!! todo

export function FieldAutocomplete({ control, uid = 0 }: FieldAutocompleteProps) {
  const label = useLabel();

  const uniqueName = `${control.name}-${uid}`;

  const [state, setValue, setTouched] = useControl<IOption | IOption[] | IEquatable | IEquatable[]>(control);

  const onChange = (value: string | string[]) => {
    const valueOrValues = stringToValue(value, control.options);
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

  // fires when user select a google autocomplete result
  async function onAutocomplete(item: IAutocompleteItem) {
    console.log('onAutocomplete', item);
    if (!item) {
      return;
    }
    const id = item.id.toString();
    if (id) {
      onChange(id);
    }
  }

  function source(query: string): Promise<IAutocompleteItem[]> {
    return new Promise((resolve, reject) => {
      const options = (control.options || []).filter(x => {
        const name = x.name.toString().toLowerCase();
        return name.indexOf(query.toLowerCase()) !== -1;
      }).map(x => {
        return {
          id: x.id,
          name: x.name.toString(),
        };
      });
      resolve(options);
    });
  }

  const initialValue = useMemo(() => {
    if (control.optionsExtra?.asEquatable) {
      const options = control.options || [];
      if (!state.value) {
        return undefined;
      }
      const option = options.find(x => x.id === state.value);
      if (option) {
        return {
          id: option.id,
          name: option.name.toString(),
        };
      } else {
        return undefined;
      }
    } else {
      return (state.value as IOption) || undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    state.flags.hidden ? (
      <input type="hidden" value={valueToString(state.value)} />
    ) : (
      <Field state={state}>
        <Label htmlFor={uniqueName}>
          {control.label && label(control.label)}
        </Label>

        <Autocomplete
          id={uniqueName}
          name={uniqueName}
          placeholder={label(control.placeholder || control.label || '')}
          initialValue={initialValue}
          source={source}
          onAutocomplete={onAutocomplete}
          onFocus={onFocus}
          onBlur={onBlur}
          background="var(--color-neutral-100)"
          overflow="hidden"
        />

        <FieldError state={state} />
      </Field>
    )
  );
}
