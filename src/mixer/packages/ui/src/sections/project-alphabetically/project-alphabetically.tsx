import { IClient, IComponent, IProjectDetail } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { useExtra } from '@websolutespa/bom-mixer-hooks';
import { ILazyableProps } from '@websolutespa/bom-mixer-models';
import { Button, Container, Flex, Grid, Link, Text } from '@websolutespa/bom-mixer-ui';
import { Fragment, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useProject } from '../../hooks/useProject/useProject';

export type IProjectAlphabetically = IComponent & {
};

const StyledWrapper = styled.section`
`;

const StyledPicture = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  .picture__container {
    position: sticky;
    top: calc(50vh - 300px);
  }
`;

type IClientFull = IClient & { lastProject?: IProjectDetail };

export const ProjectAlphabetically = ({ item, index = 0 }: ILazyableProps<IProjectAlphabetically>) => {

  const { clients, projects } = useExtra() as { clients?: IClient[], projects?: IProjectDetail[] };

  const groups = useMemo(() => {
    const groups: {
      id: string;
      title: string;
      items: IClientFull[];
    }[] = [];
    clients?.forEach(client => {
      const firstLetter = client.title.substring(0, 1).toUpperCase();
      let group = groups.find(x => x.id === firstLetter);
      if (!group) {
        group = {
          id: firstLetter,
          title: firstLetter,
          items: [],
        };
        groups.push(group);
      }
      const clientProjects: IProjectDetail[] | undefined = projects?.filter(x => x.client.title === client.title);
      const lastProject = clientProjects?.shift();
      const item = { ...client, lastProject };
      group.items.push(item);
    });
    groups.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    return groups;
  }, [clients, projects]);

  const imgRef = useRef<HTMLImageElement>(null);

  const onMouseOver = (item: IClientFull) => {
    const media = item.lastProject?.media || item.media;
    if (imgRef.current && media) {
      imgRef.current.src = media.src;
    }
  };

  const { setClient } = useProject(state => state.actions);

  const onSelect = (item: IClientFull, index: number) => {
    if (item.projects && item.projects.length > 0) {
      setClient(item.title);
    }
  };

  const classNames = getClassNames('project-alphabetically');

  return (
    <StyledWrapper className={classNames}>
      <Container position="relative" marginTop="45px" marginTopSm="90px" marginTopMd="150px">
        <StyledPicture>
          <Grid.Row className="picture__container">
            <Grid xs={6} gridColumnEnd={13}>
              <img ref={imgRef} src="" />
            </Grid>
          </Grid.Row>
        </StyledPicture>
        <Grid.Row position="relative" zIndex={1} rowGap="45px" rowGapMd="90px">
          {groups.map((group, g) => (
            <Fragment key={g}>
              <Grid xs={3}>
                <Text variant="heading40" position="sticky" top="100px">{group.title}</Text>
              </Grid>
              <Grid xs={9}>
                <Flex.Col gap="30px" alignItems="flex-start">
                  {group.items.map((item, i) => item.lastProject ? (
                    <Link key={`${g}-${i}`} href={item.lastProject.href}>
                      <Button as="a" variant="line" onMouseOver={() => onMouseOver(item)}>
                        <Text className="btn-text" variant="heading40">{item.title}</Text>
                      </Button>
                    </Link>
                  ) : (
                    <Button key={`${g}-${i}`} variant="line" onMouseOver={() => onMouseOver(item)} onClick={() => onSelect(item, i)}>
                      <Text className="btn-text" variant="heading40">{item.title}</Text>
                    </Button>
                  ))}
                </Flex.Col>
              </Grid>
            </Fragment>
          ))}
        </Grid.Row>
      </Container>
    </StyledWrapper>
  );
};
