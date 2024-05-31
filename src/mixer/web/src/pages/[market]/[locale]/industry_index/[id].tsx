import { IconArrowRight } from '@websolute/icons';
import { IIndustryDetail, IIndustryIndex, getIndustryDetails } from '@websolute/models';
import { easeOutExpo, useSummary } from '@websolute/ui';
import { IServerSideContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { getLayout, getPage, getPageProps } from '@websolutespa/bom-mixer-models';
import { Box, Container, Flex, Grid, Link, Main, Media, Section, Text } from '@websolutespa/bom-mixer-ui';
import { Variants, motion } from 'framer-motion';
import styled from 'styled-components';

const variantsText: Variants = {
  over: { x: 50, color: 'var(--color-neutral-100)' },
  out: { x: 0, color: 'var(--color-neutral-800)' },
};

const variantsMedia: Variants = {
  over: { opacity: 1 },
  out: { opacity: 0 },
};

const variantsWrap: Variants = {
  over: { borderColor: '#ffffff' },
  out: { borderColor: '#BABABA' },
};

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionMedia = motion(Media);
const transition = { duration: 0.8, ease: easeOutExpo };

const StyledCard = styled.article`

  .card-button {
    display: flex;
    transition: var(--transition-smooth);
    width: 100%;
    position: relative;
    cursor: pointer;

    .text {
      background:
      linear-gradient(to right, transparent, transparent),
      linear-gradient(to right, var(--color-neutral-100), var(--color-neutral-100));
      background-size: 100% 0.05em, 0 0.05em;
      background-position: 100% 100%, 0 100%;
      background-repeat: no-repeat;
      transition: background-size 0.4s cubic-bezier(0.73, 0.01, 0.24, 1);
      display: inline;
    }
  }

  &:hover,
  &:focus {
    .card-button {
      .text {
        background-size: 0 0.05em, 100% 0.05em;
      }
    }
  }

  .media {
    width: 100%;

    &:after {
      content: '';
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: var(--color-neutral-800);
      opacity: 0.5;
    }
  }
`;

export default function IndustryIndex({ layout, page, items }: PageProps<IIndustryIndex> & {
  items: IIndustryDetail[];
}) {
  useSummary(page);

  return (
    <Main background="var(--color-neutral-100)">
      <Section>
        <Container>
          <Grid.Row margin="var(--spacing-lg) 0" marginSm="var(--spacing-md) 0">
            <Grid md={10}>
              <Flex.Col rowGap="var(--margin-xs)" rowGapSm="var(--margin-sm)">
                {page.title && <Text variant="display30" as="h1" dangerouslySetInnerHTML={{ __html: page.title }}></Text>}
                {page.abstract && <Text variant="heading40" dangerouslySetInnerHTML={{ __html: page.abstract }} />}
              </Flex.Col>
            </Grid>
          </Grid.Row>
          <Grid.Row rowGap="0" marginBottom="var(--spacing-md)">
            {page.description &&
              <Grid sm={8} marginBottom="var(--margin-sm)" marginBottomSm="var(--margin-md)">
                <Text variant="label30" dangerouslySetInnerHTML={{ __html: page.description }} />
              </Grid>
            }
            {items && items.map((item, index) => (
              <Grid md={12} key={index}>
                <StyledCard>
                  <MotionBox whileHover="over" animate="out" variants={variantsWrap} transition={transition} borderBottom="1px solid var(--color-neutral-400)" borderTop={index === 0 && '1px solid var(--color-neutral-400)'} overflow="hidden">
                    <Link href={item.href || '#'} title={item.title}>
                      <MotionBox as="a" className="card-button" padding="var(--margin-xs) 0" paddingSm="var(--margin-sm) 0">
                        <MotionText variants={variantsText} transition={transition} position="relative" zIndex="1" variant="heading20" variantSm="display60" dangerouslySetInnerHTML={{ __html: item.title || 'untitled' }} />

                        <MotionMedia variants={variantsMedia} transition={transition} item={item.media} position="absolute" zIndex="0" top="0" left="0" right="o" bottom="0" overflow="hidden" width="100%" />
                        <Box display="block" displaySm="none" width="20px" height="20px" position="absolute" zIndex="2" top="50%" right="0" transform="translateY(-50%)"><IconArrowRight /></Box>
                      </MotionBox>
                    </Link>
                  </MotionBox>
                </StyledCard>
              </Grid>
            ))}
          </Grid.Row>
        </Container>
      </Section>
    </Main>
  );
}

export async function getServerSideProps(context: IServerSideContext) {
  const params = context.params;
  const query = context.query;

  const id = asEquatable(params.id);
  const market = params.market;
  const locale = params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<IIndustryIndex>('industry_index', id, market, locale);
  if (!page) {
    return {
      notFound: true,
      revalidate: true,
    };
  }

  const items = await getIndustryDetails({ market, locale });

  const props = await getPageProps({ params, query, layout, page, items });
  return {
    props,
  };
}
