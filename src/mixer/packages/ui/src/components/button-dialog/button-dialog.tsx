import { ICategorized } from '@websolutespa/bom-core';
import { useLayout, usePage } from '@websolutespa/bom-mixer-hooks';
import { Button, ButtonProps } from '@websolutespa/bom-mixer-ui';
import { useRouter } from 'next/router';
import { ReactNode, forwardRef } from 'react';

export type ButtonDialogProps = {
  item: ICategorized & { href?: string };
  children?: ReactNode;
};

export const ButtonDialog = forwardRef<HTMLAnchorElement, ButtonDialogProps & ButtonProps>(({ item, children, ...buttonProps }: ButtonDialogProps, ref) => {
  const layout = useLayout();
  const page = usePage();
  const router = useRouter();
  const onClick = (event: React.MouseEvent) => {
    router.replace({ hash: `dialog=${item.href}` }, undefined, { scroll: false });
    event.preventDefault();
  };
  return (
    <Button ref={ref} {...buttonProps} as="a" href={item.href} onClick={onClick}>
      {children}
    </Button>
  );
});

ButtonDialog.displayName = 'ButtonDialog';
