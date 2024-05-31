import { IProjectDetail } from '@websolute/models';
import { Box, Button, Container, Flex, Link, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';

type Props = {
  item: IProjectDetail;
};

export type NextProjectProps = UIStyledComponentProps<Props>;
export type NextProjectContainerProps = Omit<NextProjectProps, 'item'>;

const NextProjectContainer = styled.section<NextProjectContainerProps>`

  .content {
    position: relative;
    z-index: 1;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    border-radius: 15px;

    &:after {
      content: '';
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--color-neutral-900);
      opacity: 0.4;
    }
  }

  ${props => getCssResponsive(props)}
`;

export const NextProject: React.FC<NextProjectProps> = ({ item }: NextProjectProps) => {

  const { id, title, abstract, media, href } = item;

  return (
    <NextProjectContainer position="relative" zIndex="1" padding="var(--grid-column-gap) 0" paddingSm="calc(var(--grid-column-gap) * 2) 0" background="var(--color-neutral-100)">
      <Container>
        <Link href={href || '/'}>
          <Button as="a" width="100%">
            <Flex.Col className="content" >
              <Box position="absolute" zIndex="2" textAlign="center" color="var(--color-neutral-100)" maxWidth="600px" padding="var(--margin-xs)">
                {title && <Text variant="heading30">{title}</Text>}
                {abstract && <Text variant="heading30" dangerouslySetInnerHTML={{ __html: abstract }} />}
              </Box>
              {media && <Media position="relative" zIndex="0" item={media} aspectRatio={9 / 16} aspectRatioSm={16 / 9} width="100%" />}
            </Flex.Col>
          </Button>
        </Link>
      </Container>
    </NextProjectContainer >
  );
};


