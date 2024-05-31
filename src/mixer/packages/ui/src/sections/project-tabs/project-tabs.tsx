import { DummyClient, IClient, IComponent } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useDrawer, useExtra, usePage, useSearchParamsQs } from '@websolutespa/bom-mixer-hooks';
import { ILazyComponent } from '@websolutespa/bom-mixer-models';
import { StoreStrategy, storeStrategy } from '@websolutespa/bom-mixer-store';
import { Container, LazyLoader, Section } from '@websolutespa/bom-mixer-ui';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Tab } from '../../components';
import { TabItemProps } from '../../components/tab/tab-item';
import { ProjectViews, useMenu, useProject } from '../../hooks';
import { MenuDropdownSummary } from '../menu-dropdown/menu-dropdown-summary';
import { ProjectClient } from '../project-client/project-client';

export type IProjectTabs = {
};

const StyledSection = styled(Section) <{ index: number }>`
  &>* {
    display: none;
  }
  ${props => css`
    &>:nth-child(${props.index + 1}) {
      display: block;
    }
  `}
`;

export const ProjectTabs = (props: IProjectTabs) => {

  const page = usePage();

  // deserialize queryString encoded params
  const { params, replaceParamsSilently } = useSearchParamsQs();

  const index = useProject(state => state.index);
  const { setIndex } = useProject(state => state.actions);

  const tabRef = useRef<{
    setIndex: React.Dispatch<React.SetStateAction<number>>
  }>();

  const { setDropdown } = useMenu(state => state.actions);

  useEffect(() => {
    setDropdown({
      title: 'filtra',
      children: (
        <MenuDropdownSummary onSelect={(anchor, index) => {
          if (tabRef.current) {
            tabRef.current.setIndex(index);
          }
          return false;
        }} />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (item: TabItemProps, index: number) => {
    setIndex(index);
  };

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.setIndex(index);
    }
    replaceParamsSilently({ ...params, view: ProjectViews[index] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const client = useProject(state => state.client);

  const [drawer, openDrawer, closeDrawer] = useDrawer();

  const { clients } = useExtra() as { clients?: IClient[] };

  const [selectedClient, setSelectedClient] = useState<IClient>();

  useEffect(() => {
    if (client) {
      const selectedClient = clients?.find(x => x.title === client);
      if (selectedClient) {
        if (storeStrategy === StoreStrategy.Mock) {
          // !!! mocking data
          selectedClient.projects.forEach((project, i) => {
            if (!project.features || project.features.length === 0) {
              project.features = DummyClient.projects[i].features;
            }
          });
        }
        setSelectedClient(selectedClient);
      }
      openDrawer('client-drawer');
    } else {
      closeDrawer();
    }
    replaceParamsSilently({ ...params, client });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const classNames = getClassNames('project-tabs');
  return (
    <>
      <Section
        className={classNames}
        padding="0"
        /*position="sticky" top="60px" zIndex="1" background="var(--color-neutral-100)"*/
        overflowY="hidden" overflowX="auto"
      >
        <Container>
          <Tab ref={tabRef} initialValue={index} onSelect={onSelect}>
            {page.components?.map((component: ILazyComponent & IComponent, index: number) => {
              if (!component.anchor) {
                return;
              }
              return (
                <Tab.Item
                  key={index}
                  id={component.anchor.hash}
                  title={(component.anchor.title as string) || 'Untitled'}
                ></Tab.Item>
              );
            })}
          </Tab>
        </Container>
      </Section>
      {page.components && page.components.length > 0 && (
        <StyledSection index={index} paddingTop="0" paddingBottom="90px" paddingBottomMd="140px">
          <LazyLoader components={page.components} />
        </StyledSection>
      )}
      {selectedClient && (
        <ProjectClient item={selectedClient} />
      )}
    </>
  );
};
