import { IProductDetail } from '@websolute/models';
import { IMenuLink, isMediaJson } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { Box, Container, Flex, Grid, Media, SvgAnimation, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Cta } from '../../components';

type Props = {
  item: IProductDetail;
};

export type NextProps = UIStyledComponentProps<Props>;
export type NextContainerProps = Omit<NextProps, 'item'>;

const NextContainer = styled.section<NextContainerProps>`

  ${props => getCssResponsive(props)}
`;

export const Next: React.FC<NextProps> = ({ item }: NextProps) => {

  const label = useLabel();
  const { id, title, description, media, href } = item;
  const ctaItem: IMenuLink = {
    id,
    title,
    type: 'link',
    href: href as string,
    target: '_self',
  };

  return (
    <NextContainer position="relative" zIndex="1" padding="var(--spacing-lg) 0" paddingSm="0 0 var(--spacing-sm) 0" background="var(--color-neutral-200)">
      <Container>
        <Box background="var(--color-neutral-100)" borderRadius="15px" padding="var(--spacing-md)" paddingSm="var(--spacing-md) 0">
          <Grid.Row alignItems="center">
            <Grid gridColumnStartSm="2" gridColumnEndSm="7">
              <Flex.Col gap="var(--margin-sm)" gapSm="var(--margin-md)">
                {title && <Text textTransform="uppercase">{title}</Text>}
                {description && <Text variant="heading30" dangerouslySetInnerHTML={{ __html: description }} />}
                <Cta item={ctaItem} title={label('showmore.more')} />
              </Flex.Col>
            </Grid>
            <Grid gridColumnStartSm="8" gridColumnEndSm="12">
              {media && (
                isMediaJson(media) ? (
                  <SvgAnimation href={media.url || media.src} width="100%" maxWidth="100%" />
                ) : (
                  <Media item={media} width="100%" maxWidth="100%" />
                )
              )}
            </Grid>
          </Grid.Row>
        </Box>
      </Container>
    </NextContainer>
  );
};


