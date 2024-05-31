import { getClassNames } from '@websolutespa/bom-core';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Flex, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { Wrapper } from '../../components';


export type INumberItem = {
  number?: string;
  unit?: string;
  description?: string;
};

export type INumbers = {
  updated_at?: string;
  items?: INumberItem[];
};


const CardListContainer = styled(Wrapper) <UIStyledComponentProps>`
  ${props => getCssResponsive(props)}
`;

export const Numbers = ({ item, index = 0 }: ILazyableProps<INumbers>) => {
  const classNames = getClassNames('card-list');
  const { updated_at, items, colorScheme } = item;

  return (
    <CardListContainer className={classNames} colorScheme={colorScheme}>
      {updated_at && <Text variant="display30" variantMd="display60" >{updated_at}</Text>}
      <Flex.Row gap="var(--margin-sm)" flexWrap="wrap" justifyContent='space-between'>
        {items && items.map((item, j) => (
          <Flex.Col gap="4px" gapMd="var(--margin-xs)" flex='calc(50% - var(--margin-sm) / 2)' key={j} className='number-item' justifyContent='center' borderRadius={'30px'} background="var(--color-neutral-200)" paddingTop="var(--margin-md)" paddingBottom="var(--margin-sm)">
            <Flex.Row alignItems='flex-end' justifyContent='center' gap="var(--margin-xs)">
              {item.number && <Text variant="display20" variantMd="display50" >{item.number}</Text>}
              {item.unit && <Text variant="display30" variantMd="display60" >{item.unit}</Text>}
            </Flex.Row>
            {item.description && <Text textAlign="center" variant="paragraph20" >{item.description}</Text>}
          </Flex.Col>
        ))}
      </Flex.Row>
    </CardListContainer>
  );
};
