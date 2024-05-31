import { IStaticContext, PageProps } from '@websolutespa/bom-core';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { getErrorPageLayout, getPageProps } from '@websolutespa/bom-mixer-models';
import { Background, Button, Container, Flex, Grid, Link, Main, Section, Text } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';

const StyledPendulum = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  z-index: 0;
  padding-bottom: 10vh;

  .ball {
    position: relative;
    height: 9vw;
    width: 9vw;
    border-radius: 50%;
    transform-origin: 50% -300%;
    background-color: var(--color-cyan-500);

    &:nth-child(1) {
      background-color: var(--color-blue-violet-500);
    }
    &:nth-child(2) {
      background-color: var(--color-purple-500);
    }
    &:nth-child(3) {
      background-color: var(--color-red-500);
    }
    &:nth-child(4) {
      background-color: var(--color-orange-500);
    }
    &:nth-child(5) {
      background-color: var(--color-yellow-500);
    }
    &:nth-child(6) {
      background-color: var(--color-green-500);
    }
    &:nth-child(7) {
      background-color: var(--color-turquoise-500);
    }
    &:nth-child(8) {
      background-color: var(--color-cyan-500);
    }

    &:first-child {
      animation: first .9s alternate ease-in infinite;
    }

    &:last-child {
      animation: last .9s alternate ease-out infinite;
    }
  }

  @keyframes first {
    0%{
      transform: rotate(35deg);
    }
    50%{
      transform: rotate(0deg);
    }
  }

  @keyframes last {
    50%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(-35deg);
    }
  }

`;

export default function Error404({ layout, page, params }: PageProps) {
  const label = useLabel();
  return (
    <Main background="var(--color-neutral-100)" position="relative">
      <Background>
        <StyledPendulum>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
        </StyledPendulum>
      </Background>
      <Section padding="0" minHeight="100vh" alignItems="center">
        <Container zIndex="1" marginTop="-10vh">
          <Grid.Row>
            <Grid md={8} gridColumnEndMd="11">
              <Flex.Col rowGap="30px" alignItems="center" textAlign="center">
                <Text variant="display50" color="var(--color-neutral-400)">{page.title}</Text>
                <Text variant="display50">{page.abstract}</Text>
                <Link href={layout.topLevelHrefs.homepage || '/'}>
                  <Button as="a" variant="line">
                    <Text variant="paragraph30">{label('navigation.home')}</Text>
                  </Button>
                </Link>
              </Flex.Col>
            </Grid>
          </Grid.Row>
        </Container>
      </Section>
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const { layout, page } = await getErrorPageLayout();
  // console.log('404.getStaticProps', { layout, page });
  const props = await getPageProps({ ...context, layout, page });
  return {
    props,
  };
}
