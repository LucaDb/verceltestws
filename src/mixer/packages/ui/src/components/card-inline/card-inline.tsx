import { ICardListItem } from '@websolute/models';
import { Flex, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Cta } from '../cta/cta';

type Props = {
  item: ICardListItem;
};

export type CardInlineProps = UIStyledComponentProps<Props>;

const CardInlineContainer = styled.article<Omit<CardInlineProps, 'item'>>`
 

  ${props => getCssResponsive(props)}
`;

export const CardInline: React.FC<CardInlineProps> = ({ item }: CardInlineProps) => {

  const { title, abstract, media } = item;
  const navItem = item.navs && item.navs[0];

  return (
    <CardInlineContainer background="var(--color-neutral-200)" borderRadius="var(--margin-xs)" height="auto" heightSm="100%">
      <Flex.Col padding="var(--margin-sm)" paddingMd="var(--margin-md)" gap="var(--margin-sm)">
        {title && <Text variant="label30">{title}</Text>}
        <Flex gap="var(--margin-sm)" gapMd="var(--margin-lg)" alignItems="center" alignItemsMd="flex-start" flexDirection="column" flexDirectionMd="row">
          {media && <Media item={media} aspectRatio={1 / 1} minWidth="100px" minWidthSm="142px" />}
          <Flex.Col gap="var(--margin-sm)" gapMd="var(--margin-lg)" textAlign="center" textAlignMd="left">
            {abstract && <Text variant="paragraph30" dangerouslySetInnerHTML={{ __html: abstract }} />}
            {navItem && (navItem.type === 'link' || navItem.type === 'page') && (
              <Cta item={navItem} />
            )}
          </Flex.Col>
        </Flex>
      </Flex.Col>
    </CardInlineContainer>
  );
};
