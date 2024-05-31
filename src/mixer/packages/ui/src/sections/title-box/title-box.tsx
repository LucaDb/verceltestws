import { ITitleBox } from '@websolute/models';
import { getClassNames, isMediaJson } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Media, SvgAnimation, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';


const TitleBoxContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const TitleBox = ({ item, index = 0 }: ILazyableProps<ITitleBox>) => {
  const classNames = getClassNames('title-box-1');
  const { colorScheme, anchor, topSpace, innerSpace, eyelet, title, description, abstract, media } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <TitleBoxContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container>
          <Grid.Row>
            <Grid sm={6} gridColumnEndSm="10">
              <Flex.Col gap="var(--margin-sm)" textAlign="center" alignItems="center">
                {media && (
                  isMediaJson(media) ? (
                    <SvgAnimation href={media.url || media.src} aspectRatio={1 / 1} flex="0 0 336px" maxWidth="336px" mode="once" />
                  ) : (
                    <Media item={media} aspectRatio={1 / 1} flex="0 0 336px" maxWidth="336px" />
                  )
                )}
                {eyelet && <Text variant="label10">{eyelet}</Text>}
                {title && <Text as={seoWeight()} variant="display50">{title}</Text>}
                {abstract && <Text variant="heading40" className="wysiwyg" dangerouslySetInnerHTML={{ __html: abstract }} />}
                {description && <Text variant="paragraph30" className="wysiwyg" dangerouslySetInnerHTML={{ __html: description }} />}
              </Flex.Col>
            </Grid>
          </Grid.Row>
        </Container>
      </Box>
    </TitleBoxContainer>
  );
};
