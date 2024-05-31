import { getClassNames } from '@websolutespa/bom-core';
import { FormState } from '@websolutespa/bom-mixer-forms';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { UIStyledComponentProps, getCssResponsive, getVariant, useVariants } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { IFieldErrorVariants, fieldErrorVariants } from './field-error.variants';

type Props = {
  state: FormState<any>;
  className?: string;
  variant?: keyof typeof fieldErrorVariants | (string & {});
  variants?: IFieldErrorVariants;
};

export type FieldErrorProps = UIStyledComponentProps<Props>;

const StyledFieldError = styled.div<Omit<FieldErrorProps, 'state'>>`
  ${props => getVariant(props.variant, props.variants)}
  ${props => getCssResponsive(props)}
`;

export function FieldError({
  state,
  className,
  variant = 'default',
  variants,
  ...props
}: FieldErrorProps) {
  const label = useLabel();
  const classNames = getClassNames('field-error', className, variant);
  const globalVariants = useVariants('fieldError', fieldErrorVariants);
  variants = variants || globalVariants;
  return (
    <>
      {state.flags.touched && state.errors.map(error => (
        <StyledFieldError className={classNames} key={error.key} variant={variant} variants={variants} {...props}>{label(`error.${error.key}`)}</StyledFieldError>
      ))}
    </>
  );
}

