import { ReactNode, createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

export type MenuViewTypes = 'nav' | 'dropdown' | 'summary' | 'closeTop';

export type MenuDropdown = {
  title: string;
  children: ReactNode;
};

export type MenuProps = {
  hydrated: boolean;
  view?: MenuViewTypes;
  dropdown?: MenuDropdown;
  summary?: ReactNode;
  floating?: boolean;
};

export type MenuActions = {
  setView: (view?: MenuViewTypes) => void,
  toggleView: (view?: MenuViewTypes) => void,
  setDropdown: (dropdown?: MenuDropdown) => void,
  setSummary: (summary: ReactNode) => void,
  setFloating: (sticky: boolean) => void,
  toggleFloating: () => void,
  close: () => void,
};

export type MenuState = MenuProps & {
  actions: MenuActions;
};

export type MenuStore = ReturnType<typeof createMenuStore>;

export type MenuStoreOptions = {
  storage?: StateStorage;
};

const createMenuStore = (options: MenuStoreOptions) => {

  const props: MenuProps = {
    hydrated: false,
  };

  const useStore = createStore<MenuState>()(
    persist(
      (set, get) => ({
        ...props,
        actions: {
          setView: (view) => {
            set({ view });
          },
          toggleView: (view) => {
            if (get().view !== view) {
              set({ view });
            } else {
              set({ view: undefined });
            }
          },
          setDropdown: (dropdown) => {
            set({ dropdown });
          },
          setSummary: (summary) => {
            set({ summary });
          },
          setFloating: (floating) => {
            set({ floating });
          },
          toggleFloating: () => {
            set({ floating: !get().floating })
          },
          close: () => {
            set({ view: undefined });
          },
        },
      }),
      {
        name: 'menu',
        storage: createJSONStorage(() => options.storage || localStorage),
        onRehydrateStorage: () => () => {
          useStore.setState({ hydrated: true });
        },
        merge: (persistedState: any, currentState: MenuState) => {
          /*
          if (persistedState.view) {
            currentState.view = persistedState.view;
          }
          */
          currentState.hydrated = true;
          return currentState;
        },
        partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => ['view'].includes(key))),
      }
    )
  );
  return useStore;
};

export const MenuContext = createContext<MenuStore | null>(null);

type MenuProviderProps = React.PropsWithChildren<MenuStoreOptions>;

function MenuProvider({ children, ...props }: MenuProviderProps) {
  const storeRef = useRef<MenuStore>();
  if (!storeRef.current) {
    storeRef.current = createMenuStore({ ...props });
  }
  return storeRef.current && (
    <MenuContext.Provider value={storeRef.current}>
      {children}
    </MenuContext.Provider>
  );
}

function useMenu<T>(selector: (state: MenuState) => T): T {
  const store = useContext(MenuContext);
  if (!store) throw new Error('Missing MenuContext.Provider in the tree');
  return useStore(store, selector);
}

export { MenuProvider, useMenu };

