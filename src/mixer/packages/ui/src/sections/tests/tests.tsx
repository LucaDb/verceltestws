import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Box, Button, Grid, SvgAnimation, SvgAnimationRef, Text } from '@websolutespa/bom-mixer-ui';
import { useRef } from 'react';
import styled from 'styled-components';

export type TestsProps = {
};

const TestsWrapper = styled.div`
  margin-top: -101px;
  background: var(--color-neutral-900);
  color: var(--color-neutral-100);
`;

export const Tests = ({ item, index = 0, ...props }: ILazyableProps<TestsProps>) => {
  const animationRef = useRef<SvgAnimationRef>(null);
  const classNames = getClassNames('tests');
  return (
    <TestsWrapper className={classNames}>
      <Grid.Row>
        <Grid md={4} gridColumnEndMd={9} padding="3em 0">
          <Text variant="heading40">Href</Text>
          <Box margin="2em 0" border="1px solid var(--color-neutral-800)">
            <SvgAnimation aspectRatio={750 / 420} href="/assets/svg-animation.json" />
          </Box>
          <Text variant="heading40">Default</Text>
          <Box margin="2em 0" border="1px solid var(--color-neutral-800)">
            <SvgAnimation mode="default" aspectRatio={750 / 420} animation={() => import('./svg-animation.json')} />
          </Box>
          <Text variant="heading40">Once</Text>
          <Box margin="2em 0" border="1px solid var(--color-neutral-800)">
            <SvgAnimation mode="once" aspectRatio={750 / 420} animation={() => import('./svg-animation.json')} />
          </Box>
          <Text variant="heading40">Over</Text>
          <Box margin="2em 0" border="1px solid var(--color-neutral-800)">
            <SvgAnimation mode="over" aspectRatio={750 / 420} href="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json" />
          </Box>
          <Text variant="heading40">OverOut</Text>
          <Box margin="2em 0" border="1px solid var(--color-neutral-800)">
            <SvgAnimation mode="overOut" aspectRatio={750 / 420} href="https://assets4.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json" />
          </Box>
          <Text variant="heading40">Scroll</Text>
          <Box margin="2em 0" border="1px solid var(--color-neutral-800)">
            <SvgAnimation mode="scroll" aspectRatio={750 / 420} animation={() => import('./svg-animation.json')} />
          </Box>
          <Text variant="heading40">Controlled</Text>
          <Box margin="2em 0" border="1px solid var(--color-neutral-800)">
            <Button aspectRatio={750 / 420} onMouseOver={() => animationRef.current?.play()}>
              <SvgAnimation ref={animationRef} mode="controlled" aspectRatio={750 / 420} animation={() => import('./svg-animation.json')} />
            </Button>
          </Box>
        </Grid>
      </Grid.Row>
    </TestsWrapper>
  );
};
