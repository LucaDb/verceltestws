import { IContactForm, IContactFormSubmit } from '@websolute/models';
import { IOption, getClassNames } from '@websolutespa/bom-core';
import {
  EmailValidator, FormAsyncValidator, FormGroup, RequiredTrueValidator, RequiredValidator,
  ValidationError, useFormBuilder
} from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Button, Flex, Form, FormTester, Grid } from '@websolutespa/bom-mixer-ui';
import { FieldCollection } from '../../fields/field-collection';

export function ContactForm({ options, onSubmit }: {
  options: IContactForm,
  onSubmit?: (value: IContactFormSubmit) => void
}) {
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
        companyName: { schema: 'text', label: 'Lavoro per', placeholder: 'il nome della tua azienda', validators: required },
        companyArea: { schema: 'text', label: 'che si occupa di', placeholder: 'il settore nel quale opera', validators: required },
        email: { schema: 'text', label: 'Per saperne di più potete contattarmi a', placeholder: 'il tuo indirizzo email', validators: [required, email, exhist] },
      },
    },
    project: {
      schema: 'group', label: 'Informazioni sul progetto:', children: {
        service: { schema: 'pill', label: 'Vi contatto perchè avrei bisogno dei seguenti servizi:', options: options.service },
        budget: { schema: 'card', label: 'Con indicativamente questo budget:', options: options.budget },
        request: { schema: 'card', label: 'Il progetto è sfidante per questo vorrei:', options: options.request },
        message: { schema: 'textarea', label: 'Lasciate che vi racconti più nel dettaglio:', placeholder: 'Scrivi il tuo messaggio' },
        color: { schema: 'color', label: 'Adesso che ci conosciamo meglio, posso dirvi che il mio colore preferito è:', options: options.color },
      },
    },
    privacy: { schema: 'checkbox', label: 'Accetto i termini di Privacy Policy.', validators: requiredTrue },
    checkField: { schema: 'text', hidden: true }, // check hidden field for antiforgery
  });

  const onTest = () => {
    setValue({
      info: {
        fullName: 'John Appleseed',
        companyName: 'Websolute',
        companyArea: 'Information Technology',
        email: 'jhon.appleseed@gmail.com',
      },
      project: {
        service: options.service.slice(0, 2),
        budget: options.budget[0],
        request: options.request[0],
        message: '',
        color: options.color[0],
      },
      privacy: true,
    });
  };

  const onReset = () => {
    console.log('ContactForm.onReset');
    reset();
  };

  const onValidate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.flags.valid) {
      console.log('ContactForm.onSubmit.valid', form.value);
      if (typeof onSubmit === 'function') {
        const value = form.value;
        onSubmit({
          // info
          fullName: value.info.fullName,
          companyName: value.info.companyName,
          companyArea: value.info.companyArea,
          email: value.info.email,
          // project
          service: value.project.service.map((x: IOption) => x.id),
          budget: value.project.budget.id,
          request: value.project.request.id,
          message: value.project.message,
          color: value.project.color.id,
          //
          privacy: value.privacy,
          checkField: value.checkField,
        });
      }
    } else {
      console.log('ContactForm.onSubmit.invalid');
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
