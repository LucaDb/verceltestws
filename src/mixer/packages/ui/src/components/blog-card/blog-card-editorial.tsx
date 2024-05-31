import { ICulturaDetail, IProjectDetail, getAuthorText } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { Flex, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';


type Props = {
  item: ICulturaDetail | IProjectDetail;
};

export type BlogCardEditorialProps = UIStyledComponentProps<Props>;

const BlogCardEditorialContainer = styled.article<Omit<BlogCardEditorialProps, 'item'>>`

  p {
    margin: 0;
    &:not(:last-child) {
      margin: 0;
    }
  }

  ${props => getCssResponsive(props)}
`;

export const BlogCardEditorial: React.FC<BlogCardEditorialProps> = ({ item }: BlogCardEditorialProps) => {

  const { title, abstract, author, colorData } = item;
  const classNames = getClassNames(colorData?.className, 'background');

  return (
    <BlogCardEditorialContainer className={classNames} padding="var(--margin-md) var(--margin-sm)" borderRadius="15px" height="100%" color="var(--color-neutral-800)">
      <Flex.Col justifyContent="space-between" height="100%" gap="var(--margin-xs)">
        {title && <Text variant="heading30">{item.title}</Text>}
        {abstract && <Text variant="paragraph20">{item.abstract}</Text>}
        {author && <Text variant="paragraph20" dangerouslySetInnerHTML={{ __html: getAuthorText(author) }}></Text>}
      </Flex.Col>
    </BlogCardEditorialContainer>
  );
};
