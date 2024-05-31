import { getTarget } from '@websolute/models';
import { IMenuItem } from '@websolutespa/bom-core';
import { Box, Button, Link, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';

type CtaProps = UIStyledComponentProps & {
  item: IMenuItem;
  title?: string;
  variant?: 'button' | 'line-light' | 'line' | 'line-alt';
  variantText?: string;
};

const CtaContainer = styled.article<Omit<CtaProps, 'item'>>`
  ${props => getCssResponsive(props)}
`;

export const Cta: React.FC<CtaProps> = ({ item, title, variant = 'button', variantText = 'paragraph40', ...props }: CtaProps) => {

  const isTypeLink = item && item.type === 'link';
  const isTypePage = item && item.type === 'page';
  const text = title ? title : item.title as string;
  const target = getTarget(item);

  return (
    <CtaContainer {...props}>
      {(isTypeLink || isTypePage) && (
        <>
          {variant === 'button' && (
            <Link href={item.href || '/'}>
              <Button as="a" variant="primary" target={target}>
                <Text variant="label10">
                  <Box data-btn-text={text}>{text}</Box>
                </Text>
              </Button>
            </Link>
          )}
          {variant === 'line-light' && (
            <Link href={item.href || '/'}>
              <Button as="a" variant="line" className="_light _switch" target={target}>
                <Text variant={variantText} >
                  {text}
                </Text>
              </Button>
            </Link>
          )}
          {variant === 'line' && (
            <Link href={item.href || '/'}>
              <Button as="a" variant="line" className="_switch" target={target}>
                <Text variant={variantText} >
                  {text}
                </Text>
              </Button>
            </Link>
          )}
          {variant === 'line-alt' && (
            <Link href={item.href || '/'}>
              <Button as="a" variant="line" target={target}>
                <Text variant={variantText} >
                  {text}
                </Text>
              </Button>
            </Link>
          )}
        </>
      )}
    </CtaContainer>
  );
};
