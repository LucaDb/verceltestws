import { IComponent } from '@websolute/models';
import { ICategorized, IPage } from '@websolutespa/bom-core';
import { useEffect } from 'react';
import { MenuDropdownSummary } from '../../sections/menu-dropdown/menu-dropdown-summary';
import { useMenu } from '../useMenu/useMenu';

export function useSummary<T extends ICategorized = ICategorized>(page: IPage<T>): void {
  const { setDropdown } = useMenu(state => state.actions);
  useEffect(() => {
    const components = page.components as IComponent[] || [];
    const dropdown =
      components.find(x => x.anchor) !== undefined ?
        {
          title: 'sommario',
          children: <MenuDropdownSummary />,
        } :
        undefined;
    setDropdown(dropdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
}
