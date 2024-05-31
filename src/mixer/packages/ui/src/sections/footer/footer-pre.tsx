import { getTarget, isMenuHref } from '@websolute/models';
import { IMenuItem } from '@websolutespa/bom-core';
import { Button, Container, Flex, Link, Text, UIComponentProps, mediaOnly, mediaUp } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';

type Props = {
  items: IMenuItem[],
};

export type FooterPreProps = UIComponentProps<Props>;

const FooterPreContainer = styled.div<FooterPreProps>`
  .border {
    position: relative;

    ${props => mediaOnly(props, 'xs', css`
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: - var(--grid-column-gap);
          height: 1px;
          width: calc(100% + var(--grid-column-gap) * 2);
          background: var(--color-neutral-700);
        }
    `)}

    ${props => mediaUp(props, 'sm', css`
      border-right: 1px solid var(--color-neutral-700);
    `)}
  }

  .item {

    .abstract {
      position: relative;
      transition: var(--transition-smooth);
      transition-duration: 600ms;

        &:before {
          content: '';
          position: absolute;
          z-index: 0;
          top: 50%;
          left: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-cyan-500);
          transform: translateY(calc(-50% + 2px));
          transition: var(--transition-smooth);
          transition-duration: 600ms;
          opacity: 0;
        }
    }

    &:hover {
      .abstract {
        padding-left: 24px;

        &:before {
          left: 0;
          opacity: 1;
        }
      }
    }
  }
`;

export const FooterPre: React.FC<FooterPreProps> = (props: FooterPreProps) => {

  return (
    <FooterPreContainer {...props}>
      <Container.Fluid>
        <Flex.Col aspectRatio={16 / 9} aspectRatioSm={21 / 5} flexDirectionSm="row">
          {props.items && props.items.map((item, index) => (
            isMenuHref(item) && (
              <Flex key={index} className={index === 0 ? 'item border' : 'item'} justifyContent="center" flex="0 0 100%" flexSm="0 0 50%" width="100%" height="100%" border="0" color="var(--color-neutral-100)">
                <Link href={item.href || '/' as string}>
                  <Button as="a" target={getTarget(item)} flexDirection="column" justifyContent="center" color="var(--color-neutral-400)" width="100%" height="100%">
                    {item.title && (
                      <Text variant="display60">{item.title as string}</Text>
                    )}
                    {item.abstract && (
                      <Text className="abstract" variant="paragraph20" dangerouslySetInnerHTML={{ __html: item.abstract as string }} />
                    )}
                  </Button>
                </Link>
              </Flex>
            )
          ))}
        </Flex.Col>
      </Container.Fluid>
    </FooterPreContainer>
  );
};
