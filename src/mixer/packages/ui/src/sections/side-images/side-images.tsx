import { ISideImages, getTarget, isMenuHref } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Button, Container, Flex, Grid, Link, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';


const SideImagesContainer = styled(Wrapper) <UIStyledComponentProps>`

  ${props => getCssResponsive(props)}
`;

export const SideImages = ({ item }: ILazyableProps<ISideImages>) => {
  const classNames = getClassNames('side-images-1');
  const label = useLabel();
  const { colorScheme, anchor, title, description, navs, media, items } = item;
  const nav = navs && navs[0];

  return (
    <SideImagesContainer className={classNames} colorScheme={colorScheme} anchor={anchor} padding="var(--spacing-md) 0">
      <Container>
        <Grid.Row>
          <Grid sm={3} lg={2} order={2} orderSm={1} marginTop="var(--margin-sm)" marginTopSm="0">
            <Flex.Col position="sticky" top="var(--spacing-sm)" gap="var(--margin-sm)">
              {media && <Media item={item.media} aspectRatio={1 / 1} borderRadius={'var(--margin-xs)'} overflow="hidden" marginBottom="var(--margin-xs)" />}
              {title && <Text variant="label30">{title}</Text>}
              {description && <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: description }} />}
              {nav && isMenuHref(nav) && (
                <Link href={nav.href || '/'}>
                  <Button as="a" variant="line" target={getTarget(nav)}>
                    <Text variant="paragraph30">{label('showmore.more')}</Text>
                  </Button>
                </Link>
              )}
            </Flex.Col>
          </Grid>
          <Grid sm={9} gridColumnEndSm={13} order={1} orderSm={2}>
            <Flex.Col gap="var(--margin-sm)">
              {items && items.map((item, index) => <Media key={index} item={item} aspectRatio={9 / 16} borderRadius={'var(--margin-xs)'} overflow="hidden" />)}
            </Flex.Col>
          </Grid>
        </Grid.Row>
      </Container>
    </SideImagesContainer>
  );
};
