import { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

export const ProjectViews = ['project-selection', 'project-tag', 'project-type', 'project-alphabetically'] as const;

export type ProjectViewTypes = typeof ProjectViews[number];

export type ProjectProps = {
  hydrated: boolean;
  index: number;
  client?: string;
};

export type ProjectActions = {
  setIndex: (index?: number) => void,
  setClient: (client?: string) => void,
};

export type ProjectState = ProjectProps & {
  actions: ProjectActions;
};

export type ProjectStore = ReturnType<typeof createProjectStore>;

export type ProjectStoreOptions = {
  index?: number;
  client?: string;
  storage?: StateStorage;
};

const createProjectStore = ({ storage, client, index = 0 }: ProjectStoreOptions) => {

  const props: ProjectProps = {
    client,
    index,
    hydrated: false,
  };

  const useStore = createStore<ProjectState>()(
    persist(
      (set, get) => ({
        ...props,
        actions: {
          setIndex: (index) => {
            set({ index });
          },
          setClient: (client) => {
            set({ client });
          },
        },
      }),
      {
        name: 'project',
        storage: createJSONStorage(() => storage || localStorage),
        onRehydrateStorage: () => () => {
          useStore.setState({ hydrated: true });
        },
        merge: (persistedState: any, currentState: ProjectState) => {
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

export const ProjectContext = createContext<ProjectStore | null>(null);

type ProjectProviderProps = React.PropsWithChildren<ProjectStoreOptions>;

function ProjectProvider({ children, ...props }: ProjectProviderProps) {
  const storeRef = useRef<ProjectStore>();
  if (!storeRef.current) {
    storeRef.current = createProjectStore({ ...props });
  }
  return storeRef.current && (
    <ProjectContext.Provider value={storeRef.current}>
      {children}
    </ProjectContext.Provider>
  );
}

function useProject<T>(selector: (state: ProjectState) => T): T {
  const store = useContext(ProjectContext);
  if (!store) throw new Error('Missing ProjectContext.Provider in the tree');
  return useStore(store, selector);
}

export { ProjectProvider, useProject };

