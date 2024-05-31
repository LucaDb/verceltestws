import { getTarget, isMenuHref } from '@websolute/models';
import { IMenuItem } from '@websolutespa/bom-core';
import { useLayout } from '@websolutespa/bom-mixer-hooks';
import { Box, Button, Container, Flex, Link, Text, UIComponentProps } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Logo } from '../../components';

type Props = {
  title: string,
  items: IMenuItem[],
};

export type FooterMidProps = UIComponentProps<Props>;

const FooterMidContainer = styled.div<FooterMidProps>``;

export const FooterMid: React.FC<FooterMidProps> = (props: FooterMidProps) => {
  const layout = useLayout();
  return (
    <FooterMidContainer {...props}>
      <Box padding="var(--spacing-md) 0" paddingSm="var(--spacing-xs) 0" borderTop="1px solid var(--color-neutral-700)" color="var(--color-neutral-100)">
        <Container.Fluid>
          <Flex.Row justifyContent="space-between">
            <Box display="none" displayMd="block">
              <Link href={layout.topLevelHrefs.homepage || '/'}>
                <Button as="a" title="Websolute">
                  <Logo color="var(--color-neutral-100)" />
                </Button>
              </Link>
            </Box>
            <Flex.Row flex="auto" flexMd="0 0 70%" justifyContent="center" justifyContentMd="flex-end" textAlign="center" textAlignSm="left">
              <Text variant="paragraph20">
                <Flex.Col gap="var(--spacing-xs)" flexDirectionMd="row">
                  <Box>{props.title}</Box>
                  <Flex.Row gap="var(--spacing-xs)" justifyContent="center" justifyContentMd="flex-end" color="var(--color-neutral-400)">
                    {props.items && props.items.map((item, index) => (
                      isMenuHref(item) && (
                        <Link key={index} href={item.href}>
                          <Button as="a" target={getTarget(item)} variant="nav" fontSizeSm="16px" lineHeightSm="16px">
                            {item.title as string}
                          </Button>
                        </Link>
                      )
                    ))}
                  </Flex.Row>
                </Flex.Col>
              </Text>
            </Flex.Row>
          </Flex.Row>
        </Container.Fluid>
      </Box>
    </FooterMidContainer>
  );
};
