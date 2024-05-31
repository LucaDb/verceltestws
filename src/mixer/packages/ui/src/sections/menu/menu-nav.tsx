import { getClassNames } from '@websolutespa/bom-core';
import { useLayout } from '@websolutespa/bom-mixer-hooks';
import { Box, Button, Container, Flex, Grid, Link, Text } from '@websolutespa/bom-mixer-ui';
import { Variants, motion } from 'framer-motion';
import styled from 'styled-components';
import { useMenu } from '../../hooks';
import { easeOutExpo } from '../../utils';

export type MenuNavProps = {
};

const MotionSection = styled(motion.section)`
  position: fixed;
  background: var(--color-neutral-800);
  color: var(--color-neutral-100);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden;

  .button {
    display: inline-block;
    justify-content: flex-start;
  }
`;

const variants: Variants = {
  open: { top: 0 },
  closed: { top: '100vh' },
  initial: { top: '100vh' },
};

export const MenuNav: React.FC<MenuNavProps> = (props: MenuNavProps) => {
  const layout = useLayout();
  const view = useMenu(state => state.view);
  const { toggleView } = useMenu(state => state.actions);
  const active = view === 'nav';

  const className = getClassNames({ active });

  const primary = layout.menu.main?.items[0];
  const secondary = layout.menu.main?.items[1];
  const tertiary = layout.menu.main?.items[2];
  const fourthly = layout.menu.main?.items[3];

  const onClose = () => {
    toggleView('nav');
  };

  return (
    <MotionSection
      className={className}
      initial="initial"
      animate={active ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.9, ease: easeOutExpo }}
    >
      <Flex alignItems="center" height="100vh" display="block" displaySm="flex" overflowY="auto" overflowX="hidden" padding="var(--spacing-xl) 0" paddingSm="0">
        <Container.Fluid>
          <Grid.Row variant="full" rowGap="60px">
            {primary && (
              <Grid sm={7} gridColumnEndSm={9}>
                <Flex.Col alignItems="flex-start" rowGap="var(--margin-xs)">
                  {primary.title && (
                    <Text variant="label30" color="var(--color-neutral-400)" textTransform="uppercase">
                      {primary.title as string}
                    </Text>
                  )}
                  <Flex.Col alignItems="flex-start">
                    {primary.items && primary.items.map((item, index) => (
                      (item.type === 'link' || item.type === 'page') && (
                        <Link key={index} href={item.href || '/'}>
                          <Button as="a" variant="line" className="_light" onClick={onClose}>
                            <Text variant="heading10">{item.title as string}</Text>
                          </Button>
                        </Link>
                      )
                    ))}
                    {layout.topLevelRoutes.contact && (
                      <Link href={layout.topLevelRoutes.contact.href}>
                        <Button as="a" variant="primary" marginTop="45px" marginTopMd="90px" display="inline-block">
                          <Text variant="label10">
                            <Box data-btn-text={layout.topLevelRoutes.contact.title}>{layout.topLevelRoutes.contact.title}</Box>
                          </Text>
                        </Button>
                      </Link>
                    )}
                  </Flex.Col>
                </Flex.Col>
              </Grid>
            )}
            {(secondary || tertiary || fourthly) && (
              <Grid sm={2} gridColumnEndSm={12}>
                <Flex.Col rowGap="var(--margin-md)">
                  {secondary && (
                    <Flex.Col alignItems="flex-start" rowGap="var(--margin-xs)">
                      {secondary.title && (
                        <Text variant="label30" color="var(--color-neutral-400)" textTransform="uppercase">
                          {secondary.title as string}
                        </Text>
                      )}
                      <Flex.Col alignItems="flex-start">
                        {secondary.items && secondary.items.map((item, index) => (
                          (item.type === 'link' || item.type === 'page') && (
                            <Link key={index} href={item.href || '/'}>
                              <Button as="a" variant="line" className="_light" onClick={onClose}>
                                <Text variant="heading20">{item.title as string}</Text>
                              </Button>
                            </Link>
                          )
                        ))}
                      </Flex.Col>
                    </Flex.Col>
                  )}
                  {tertiary && (
                    <Flex.Col alignItems="flex-start" rowGap="var(--margin-xs)">
                      {tertiary.title && (
                        <Text variant="label30" color="var(--color-neutral-400)" textTransform="uppercase">
                          {tertiary.title as string}
                        </Text>
                      )}
                      <Flex.Col alignItems="flex-start">
                        {tertiary.items && tertiary.items.map((item, index) => (
                          (item.type === 'link' || item.type === 'page') && (
                            <Link key={index} href={item.href || '/'}>
                              <Button as="a" variant="line" className="_light" onClick={onClose}>
                                <Text variant="paragraph40" variantMd="paragraph30">{item.title as string}</Text>
                              </Button>
                            </Link>
                          )
                        ))}
                      </Flex.Col>
                    </Flex.Col>
                  )}
                  {fourthly && (
                    <Flex.Col alignItems="flex-start" rowGap="var(--margin-xs)">
                      {fourthly.title && (
                        <Text variant="label30" color="var(--color-neutral-400)" textTransform="uppercase">
                          {fourthly.title as string}
                        </Text>
                      )}
                      <Flex.Col alignItems="flex-start">
                        {fourthly.items && fourthly.items.map((item, index) => (
                          (item.type === 'link' || item.type === 'page') && (
                            <Link key={index} href={item.href || '/'}>
                              <Button as="a" variant="line" className="_light" onClick={onClose}>
                                <Text variant="paragraph40" variantMd="paragraph30">{item.title as string}</Text>
                              </Button>
                            </Link>
                          )
                        ))}
                      </Flex.Col>
                    </Flex.Col>
                  )}
                </Flex.Col>
              </Grid>
            )}
          </Grid.Row>
        </Container.Fluid>
      </Flex>
    </MotionSection>
  );
};
