import { INewsletterFormSubmit } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import {
  EmailValidator, FormAsyncValidator, FormGroup, RequiredTrueValidator, RequiredValidator,
  useFormBuilder, ValidationError
} from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Button, Flex, Form, FormTester, Grid } from '@websolutespa/bom-mixer-ui';
import { FieldCollection } from '../../fields/field-collection';

export type NewsletterFormProps = {
  onSubmit?: (value: INewsletterFormSubmit) => void;
};

export function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const label = useLabel();

  const required = RequiredValidator();
  const requiredTrue = RequiredTrueValidator();
  const email = EmailValidator();

  const exhist: FormAsyncValidator = async (value: any, rootValue: any) => {
    return new Promise<ValidationError | null>((resolve, reject) => {
      setTimeout(() => {
        resolve(value === 'aa@aa.aa' ? { exhist: true } : null);
      }, 500);
    });
  };

  const [form, setValue, setTouched, reset, group] = useFormBuilder<any, FormGroup>({
    info: {
      schema: 'group', label: 'Riempi il form qui in basso:', children: {
        fullName: { schema: 'text', label: 'Piacere di conoscervi.<br>Mi chiamo', placeholder: 'il tuo nome e cognome', validators: required },
        email: { schema: 'text', label: 'Vorrei ricevere la vostra newsletter periodica a', placeholder: 'il tuo indirizzo email', validators: [required, email, exhist] },
      },
    },
    privacy: { schema: 'checkbox', label: 'Accetto i termini di Privacy Policy.', validators: requiredTrue },
    checkField: { schema: 'text', hidden: true }, // check hidden field for antiforgery
  });

  const onTest = () => {
    setValue({
      info: {
        fullName: 'John Appleseed',
        email: 'jhon.appleseed@gmail.com',
      },
      privacy: true,
    });
  };

  const onReset = () => {
    console.log('NewsletterForm.onReset');
    reset();
  };

  const onValidate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.flags.valid) {
      console.log('NewsletterForm.onSubmit.valid', form.value);
      if (typeof onSubmit === 'function') {
        const value = form.value;
        onSubmit({
          fullName: value.info.fullName,
          email: value.info.email,
          privacy: value.privacy,
          checkField: value.checkField,
        });
      }
    } else {
      console.log('NewsletterForm.onSubmit.invalid');
      setTouched();
    }
  };

  const classNames = getClassNames('form', form.flags);

  return (
    <Form className={classNames} onSubmit={onValidate}>
      <Grid.Row rowGap="30px" rowGapMd="60px">
        <FieldCollection collection={group} />
        <Grid>
          <Flex.Row justifyContent="space-between">
            <Button variant="primary" type="submit">{label('form.submit')}</Button>
            <Button variant="secondary" onClick={onReset}>{label('form.reset')}</Button>
          </Flex.Row>
        </Grid>
        <Grid>
          <FormTester form={form} onTest={onTest} onReset={onReset}></FormTester>
        </Grid>
      </Grid.Row>
    </Form>
  );
}
