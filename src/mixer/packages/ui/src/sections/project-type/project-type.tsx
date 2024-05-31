import { IClient, IComponent, IProjectDetail } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useExtra } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Container, Flex } from '@websolutespa/bom-mixer-ui';
import { useMemo } from 'react';
import styled from 'styled-components';
import { CardSmallSlider } from '../../components/card-small-slider/card-small-slider';
import { CardSmallItem } from '../../components/card-small/card-small';
import { useProject } from '../../hooks/useProject/useProject';

export type IProjectType = IComponent & {
};

const StyledWrapper = styled.section`
  overflow: hidden;

  .swiper {
    overflow: visible;
  }
`;

type ProjectOrClientItem = CardSmallItem & {
  tag: {
    id: string;
    title: string;
  }[];
  client: {
    title: string
  }
};

export const ProjectType = ({ item, index = 0 }: ILazyableProps<IProjectType>) => {

  const { clients, projects } = useExtra() as { clients?: IClient[], projects?: IProjectDetail[] };

  const { setClient } = useProject(state => state.actions);

  const groups = useMemo(() => {
    const groups: {
      id: string;
      title: string;
      items: ProjectOrClientItem[]
    }[] = [];
    projects?.forEach(item => {
      item.type.forEach(type => {
        let group = groups.find(x => x.id === type.id);
        if (!group) {
          group = Object.assign({ items: [] }, type);
          groups.push(group);
        }
        group.items.push(item);
      });
    });
    const clientsWithoutProjects = clients?.filter(client => projects?.find(p => p.client.title == client.title) === undefined);
    clientsWithoutProjects?.forEach(client => {
      client.projects?.forEach(item => {
        item.type.forEach(type => {
          let group = groups.find(x => x.id === type.id);
          if (!group) {
            group = Object.assign({ items: [] }, type);
            groups.push(group);
          }
          group.items.push({ ...item, client });
        });
      });
    });
    groups.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    groups.forEach(group => {
      group.items.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    });
    return groups;
  }, [clients, projects]);

  const onSelect = (item: ProjectOrClientItem): boolean | void => {
    if (!item.href) {
      setClient(item.client.title);
      return false;
    }
  };

  const classNames = getClassNames('project-type');

  return (
    <>
      <StyledWrapper className={classNames}>
        <Container marginTop="45px" marginTopSm="90px" marginTopMd="150px">
          <Flex.Col rowGap="60px" rowGapMd="150px">
            {groups.map((group, g) => (
              <CardSmallSlider key={g} title={group.title} items={group.items} counter onSelect={onSelect} />
            ))}
          </Flex.Col>
        </Container>
      </StyledWrapper>
    </>
  );
};
