import { IMediaDrawer } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useDrawer, useLabel } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Button, Flex, Grid, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { CustomDrawer, Wrapper } from '../../components';

const MediaDrawerContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const MediaDrawer = ({ item }: ILazyableProps<IMediaDrawer>) => {
  const classNames = getClassNames('media-drawer-1');
  const { colorScheme, anchor, topSpace, eyelet, abstract, media, modal } = item;
  const label = useLabel();
  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;

  const [drawer, openDrawer, closeDrawer] = useDrawer();

  return (
    <MediaDrawerContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm} data-lenis-prevent>
      <Grid.Row variant="full">
        <Grid sm={8} md={9}>{media && <Media item={media} aspectRatio={4 / 3} />}</Grid>
        <Grid sm={4} md={3}>
          <Flex.Col gap="var(--margin-xs)" padding="var(--margin-sm)" paddingSm="var(--margin-md)" height="100%" justifyContent="flex-end">
            {eyelet && <Text variant="label2">{eyelet}</Text>}
            {abstract && <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: abstract }} />}
            {(modal && modal.length > 0) && <>
              <Button as="a" variant="line" onClick={() => openDrawer('my-drawer')}>
                <Text variant="paragraph30">{label('showmore.more')}</Text>
              </Button>
              <CustomDrawer name="my-drawer">
                {modal[0].title && <Text variant="heading10" textAlign="left">{modal[0].title}</Text>}
                <Flex.Col gap="var(--margin-xs)" gapSm="var(--margin-sm)" className="wysiwyg">
                  {modal[0].description && <Text variant="paragraph30" textAlign="left" dangerouslySetInnerHTML={{ __html: modal[0].description }} />}
                  {modal[0].abstract && <Text variant="paragraph40" textAlign="left" dangerouslySetInnerHTML={{ __html: modal[0].abstract }} />}
                </Flex.Col>
              </CustomDrawer>
            </>}
          </Flex.Col>
        </Grid>
      </Grid.Row>
    </MediaDrawerContainer>
  );
};

