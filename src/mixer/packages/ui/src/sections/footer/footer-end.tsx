import { getTarget, isMenuHref } from '@websolute/models';
import { IMenuItem } from '@websolutespa/bom-core';
import { Box, Button, Container, Flex, Link, Text, UIComponentProps } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';

type Props = {
  title: string
  date: number,
  items: IMenuItem[],
};

export type FooterEndProps = UIComponentProps<Props>;

const FooterEndContainer = styled.div<FooterEndProps>``;

export const FooterEnd: React.FC<FooterEndProps> = (props: FooterEndProps) => {

  return (
    <>
      <FooterEndContainer {...props}>
        <Box padding="var(--spacing-md) 0" paddingSm="var(--spacing-xs) 0" borderTop="1px solid var(--color-neutral-700)">
          <Container.Fluid>
            <Flex.Row gap={0} rowGap="var(--spacing-md)" justifyContent="space-between" flexDirection="column" flexDirectionSm="row">
              <Box flex="0 0 80%" order="2" orderSm="1" >
                <Text variant="paragraph50" textAlign="center" textAlignSm="left" fontSizeSm="16px" lineHeightSm="24px">©{props.date} {props.title}</Text>
              </Box>
              <Flex.Row gap="var(--spacing-xs)" flex="0 0 20%" justifyContent="flex-end" order="1" orderSm="2">
                {props.items && props.items.map((item, index) => (
                  isMenuHref(item) && (
                    <Link href={item.href} key={index}>
                      <Button as="a" target={getTarget(item)} justifyContent="flex-end">
                        <Text variant="paragraph50" textDecoration="underline" textDecorationSm="none">{item.title as string}</Text>
                      </Button>
                    </Link>
                  )
                ))}
              </Flex.Row>
            </Flex.Row>
          </Container.Fluid>
        </Box>
      </FooterEndContainer>
    </>
  );
};
