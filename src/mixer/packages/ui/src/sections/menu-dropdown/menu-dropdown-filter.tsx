
import { getClassNames } from '@websolutespa/bom-core';
import { Filter, IFilterOption } from '@websolutespa/bom-mixer-hooks';
import { Button, Text } from '@websolutespa/bom-mixer-ui';
import { MenuDropdownGroup } from './menu-dropdown-group';
import { MenuDropdownItem } from './menu-dropdown-item';

export type MenuDropdownFilterProps<T> = {
  filters: Filter<T>[], onToggle: (filter: Filter<T>, option: IFilterOption) => void
};

export function MenuDropdownFilter<T>({ filters, onToggle }: MenuDropdownFilterProps<T>) {
  return (
    <>
      {filters.map(filter => (
        <MenuDropdownGroup key={filter.id}>
          <MenuDropdownItem>
            <Text variant="label30" textTransform="uppercase">{filter.title}</Text>
          </MenuDropdownItem>
          {filter.options.map((option, index) => (
            <MenuDropdownItem key={index}>
              <Button variant="filter" className={getClassNames({ active: filter.has(option), disabled: option.count === 0 })} onClick={() => onToggle(filter, option)}>
                <Text variant="paragraph30">{option.title as string}</Text>
              </Button>
            </MenuDropdownItem>
          ))}
        </MenuDropdownGroup>
      ))}
    </>
  );
}
