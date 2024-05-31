import { ITextBig } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps, getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Container, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';


const TextBigContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const TextBig = ({ item, index = 0 }: ILazyableProps<ITextBig>) => {
  const classNames = getClassNames('text-big');
  const { colorScheme, anchor, topSpace, innerSpace, description } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <TextBigContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        paddingTop={setInnerPadding}
        paddingTopSm={setInnerPaddingSm}>
        <Container>
          {description && <Text as={seoWeight()} variant="heading20" className="wysiwyg" dangerouslySetInnerHTML={{ __html: description }} />}
        </Container>
      </Box>
    </TextBigContainer>
  );
};
