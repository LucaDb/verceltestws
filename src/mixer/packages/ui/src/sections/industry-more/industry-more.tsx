import { IIndustryMore, getProjectDetails } from '@websolute/models';
import { IEquatable, getClassNames } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { ILazyFuncProps, ILazyableProps, withLazyProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { useState } from 'react';
import styled from 'styled-components';
import { Cta, TextHover, TextHoverModal, Wrapper } from '../../components';

const IndustryMoreContainer = styled(Wrapper) <UIStyledComponentProps>`
  .swiper {
    overflow: initial;
  }

  ${props => getCssResponsive(props)}
`;

export const IndustryMore = ({ item }: ILazyableProps<IIndustryMore>) => {
  const classNames = getClassNames('Industry-more');

  const [modal, setModal] = useState({ active: false, index: 0 })
  const label = useLabel();

  const { colorScheme, anchor, topSpace, innerSpace, title, items, navs } = item;

  const setTopSpace = !topSpace ? 'calc(var(--spacing-lg) * -1)' : 0;
  const setTopSpaceSm = !topSpace ? 'calc(var(--spacing-md) * -1)' : 0;
  const setInnerPadding = innerSpace ? 'var(--spacing-sm)' : 0;
  const setInnerPaddingSm = innerSpace ? 'var(--spacing-md)' : 0;

  const nav = navs && navs[0];

  const textHoverItems = items && items.map(item => ({
    ...item,
    gallery: item.gallery || [],
  }));

  return (
    <IndustryMoreContainer className={classNames} colorScheme={colorScheme} anchor={anchor} marginTop={setTopSpace} marginTopSm={setTopSpaceSm}>
      <Box
        padding={`${setInnerPadding} 0 0 0`}
        paddingSm={`${setInnerPaddingSm} 0 0 0`} >
        <Container>
          <Flex.Col gap="var(--margin-md)" gapSm="var(--margin-lg)" alignItems="center">
            {title && (
              <Text variant="paragraph50">
                <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><rect x="0.5" y="0.435547" width="10" height="10" rx="13" fill="currentColor" /></svg>
                <Box display="inline" marginLeft="10px">{title}</Box>
              </Text>
            )}
            {items && (
              <Box textAlign='center'>
                {items.map((item, i) => (
                  <TextHover index={i} setModal={setModal} key={i}>
                    <Text variant="display40" opacity={i === modal.index ? 1 : 0.5} cursor="pointer" transition={'var(--transition-smooth)'}>{item.title}</Text>
                  </TextHover>
                ))}
              </Box>
            )}
            {nav && <Cta item={nav} title={label('discovermore.industries')} />}
          </Flex.Col>
        </Container>
      </Box>
      {items && <TextHoverModal modal={modal} items={textHoverItems || []} />}
    </IndustryMoreContainer>
  );
};

withLazyProps('industry-more', async function ({ page, component, layout }: ILazyFuncProps<IIndustryMore>) {
  if (component.items && component.items.length > 0) {
    return component;
  }
  const limit = component.quantity || 3;
  /*
  const items = await getIndustryDetails({
    limit,
    where: {
      category: {
        equals: 'industry_index',
      },
    },
    sort: '-date',
    market: layout.market,
    locale: layout.locale,
  });
  */
  const projects = await getProjectDetails({
    where: {
      media: {
        exists: true,
      },
    },
    market: layout.market,
    locale: layout.locale,
    sort: '-updatedAt',
  });
  const distinctIndustries: Record<IEquatable, any> = {};
  for (const project of projects) {
    const types = project.type.filter(x => x.title !== page.title);
    const type = types.length > 0 ? types[0] : undefined;
    if (type) {
      const industry = distinctIndustries[type.id] || {
        ...type,
        gallery: [],
      };
      if (industry.gallery.length < 5) {
        industry.gallery.push(project.media);
      }
      distinctIndustries[type.id] = industry;
    }
  }
  const industries = Object.entries(distinctIndustries).map(([k, v]) => v);
  industries.sort((a, b) => {
    return a.gallery.length - b.gallery.length;
  });
  component.items = industries.slice(0, Math.min(limit, industries.length));
  return component;
});
