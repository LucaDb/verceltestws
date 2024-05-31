
import { FormAbstract, FormArray, FormGroup } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Grid, Text } from '@websolutespa/bom-mixer-ui';
import { useMemo } from 'react';
import styled from 'styled-components';
import { FIELDS, FieldType, IFields } from './fields';

type FieldCollectionProps = {
  collection: FormGroup | FormArray;
  fields?: IFields;
  uid?: number;
};

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export function FieldCollection({ collection, fields, uid }: FieldCollectionProps) {
  const label = useLabel();

  const controls = useMemo(() => {
    return (collection instanceof FormGroup) ?
      Object.keys(collection.controls).map(key => {
        return { key, control: (collection as FormGroup).controls[key] };
      }) :
      collection.controls.map((control, i) => {
        return { key: i, control };
      });
  }, [collection]);

  const customFields = useMemo(() => {
    return { ...FIELDS, ...fields };
  }, [fields]);

  let uniqueId = uid || 0;

  function resolveField(item: { control: FormAbstract, key: string | number }) {
    const { control, key } = item;
    ++uniqueId;
    if (control instanceof FormGroup || control instanceof FormArray) {
      return <FieldCollection collection={control} fields={fields} uid={uniqueId} key={getFieldUID(uniqueId, control.name)} />;
    } else {
      if (control.schema in customFields) {
        return customFields[control.schema as FieldType](control, uniqueId);
      } else {
        return customFields.text(control, uniqueId);
      }
    }
  }

  return (
    <>
      {collection.label &&
        <Grid
          key={getFieldUID(++uniqueId, collection.name)}
          xs={12}
          display="flex"
        >
          <Text variant="paragraph30" opacity="0.3" dangerouslySetInnerHTML={{ __html: label(collection.label) }}></Text>
        </Grid>
      }
      {controls.length > 0 && controls.map(item => {
        const control = item.control;
        if (!control) {
          return;
        }
        if (control.state.hidden) {
          return;
        } else if (control instanceof FormGroup || control instanceof FormArray) {
          return resolveField(item);
        } else {
          return <StyledGrid
            key={getFieldUID(++uniqueId, item.key)}
            xs={12}
            sm={['checkbox', 'accept'].includes(control.schema) ? 12 : 12}
          >
            {resolveField(item)}
          </StyledGrid>;
        }
      })}
    </>
  );
}

function getFieldUID(uid: number, key: string | number = 'none') {
  const fieldUID = `${++uid}-${key}`;
  return fieldUID;
}
