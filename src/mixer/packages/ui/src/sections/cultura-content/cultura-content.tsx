import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Flex, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import styled, { css } from 'styled-components';

export type ICulturaContent = {
  title?: string;
  description?: string;
};

export type CulturaContentProps = UIStyledComponentProps<ICulturaContent>;

const CulturaContentContainer = styled.section<CulturaContentProps>`

  padding: 0;
  margin-left: 0;

  ${props => mediaUp(props, 'sm', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-sm));
  `)}

  ${props => mediaUp(props, 'md', css`
    margin-left: calc(var(--aside-width) + var(--aside-gap-md));
  `)}

  ${props => (!props.title && props.description) && `
    p:first-child::first-letter{
      font-size: 4.2rem;
      float: left;
      line-height: 1.2;
      padding-right: 8px;
      margin-top: -4px;
    }
  `}

  ${props => getCssResponsive(props)}
`;

export const CulturaContent = ({ item }: ILazyableProps<ICulturaContent>) => {
  const classNames = getClassNames('cultura-content');
  return (
    <CulturaContentContainer className={`${classNames} wysiwyg`} {...item}>
      {(item.title || item.description) &&
        <Flex.Col gap="var(--margin-sm)">
          {item.title && <Text variant="heading10" dangerouslySetInnerHTML={{ __html: item.title }} />}
          {item.description && <Text variant="paragraph30" variantSm="paragraph20" dangerouslySetInnerHTML={{ __html: item.description }} />}
        </Flex.Col>
      }
    </CulturaContentContainer>
  );
};
