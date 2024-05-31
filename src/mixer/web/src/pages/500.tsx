import { IStaticContext, asServerProps } from '@websolutespa/bom-core';
import { Box, Container, Flex, Main, Section, Text } from '@websolutespa/bom-mixer-ui';

export default function Error500(props: unknown) {
  console.log('Error', props);
  return (
    <Main>
      <Section minHeight="calc(100vh - 135px)">
        <Container>
          <Flex.Col minHeight="60vh" justifyContent="center" alignItems="center">
            <Flex.Row alignItems="flex-start">
              <Box padding="0 1rem" borderRight="1px solid var(--color-neutral-300)">
                <Text variant="display50" variantMd="display40" fontWeight="700" marginBottom="0.5rem" color="var(--color-cyan-500)">500</Text>
              </Box>
              <Box padding="0 1rem">
                <Text variant="display50" variantMd="display40" fontWeight="700" marginBottom="0.5rem">Unhandled Runtime Error</Text>
                <Text color="var(--color-neutral-700)" marginBottom="2rem">Internal Server Error</Text>
              </Box>
            </Flex.Row>
          </Flex.Col>
        </Container>
      </Section>
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const props = await asServerProps({ ...context });
  return {
    props,
  };
}
