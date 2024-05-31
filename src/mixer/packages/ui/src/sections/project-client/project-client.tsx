import { IClient } from '@websolute/models';
import { useDateTimeFormat } from '@websolutespa/bom-mixer-hooks';
import { Box, Flex, Grid, Text } from '@websolutespa/bom-mixer-ui';
import { Fragment, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { CustomDrawer } from '../../components/custom-drawer/custom-drawer';
import { useProject } from '../../hooks/useProject/useProject';

export type ProjectClientProps = {
  item: IClient;
};

const StyledTitle = styled(Text)`
  text-transform: uppercase;
  opacity: 0.5;
  line-height: var(--font-paragraph30-line-height, 1);
`;

const Title = ({ className, children }: { className?: string, children?: ReactNode }) => {
  return <StyledTitle className={className} variant="label20">{children}</StyledTitle>;
};

const StyledAbstract = styled(Text)`
`;

const Abstract = ({ className, children }: { className?: string, children?: ReactNode }) => {
  return <StyledAbstract className={className} variant="paragraph30">{children}</StyledAbstract>;
};

const StyledRow = styled(Grid.Row)`
  &:not(.bordless) {
    padding: 30px 0;
    border-top: 1px solid rgba(255,255,255,0.3);
  }
`;

const Row = ({ className, children }: { className?: string, children?: ReactNode }) => {
  return <StyledRow className={className} columns="4">{children}</StyledRow>;
};

const SecondaryRow = ({ className, children }: { className?: string, children?: ReactNode }) => {
  return <StyledRow className={className} columns="3">{children}</StyledRow>;
};

export const ProjectClient = ({ item }: ProjectClientProps) => {

  const dateTimeFormat = useDateTimeFormat({
    year: 'numeric',
  });

  const { setClient } = useProject(state => state.actions);

  const onClose = () => {
    setClient();
  };

  const { tags, types } = useMemo(() => {
    const types: string[] = [];
    const tags: string[] = [];
    item.projects.forEach(x => {
      x.type.forEach(type => {
        if (!types.includes(type.title)) {
          types.push(type.title);
        }
      });
      x.tag.forEach(tag => {
        if (!tags.includes(tag.title)) {
          tags.push(tag.title);
        }
      });
    });
    types.sort();
    tags.sort();
    return { tags, types };
  }, [item]);

  return item && (
    <CustomDrawer name="client-drawer" onClose={onClose}>
      <Text variant="heading10" textAlign="left" marginBottom="45px">{item.title}</Text>
      <Box>
        {item.fromDate && (
          <Row>
            <Grid xs={1}><Title>Cliente</Title></Grid>
            <Grid xs={3}>
              <Abstract>
                Dal {dateTimeFormat(item.fromDate)}
                {item.toDate ? (
                  <> al {dateTimeFormat(item.toDate)}</>
                ) : (
                  <> ad oggi</>
                )}
              </Abstract>
            </Grid>
          </Row>
        )}
        {types.length > 0 && (
          <Row>
            <Grid xs={1}><Title>Settore</Title></Grid>
            <Grid xs={3}><Abstract>{types.join(', ')}</Abstract></Grid>
          </Row>
        )}
        {tags.length > 0 && (
          <Row>
            <Grid xs={1}><Title>Area</Title></Grid>
            <Grid xs={3}><Abstract>{tags.join(', ')}</Abstract></Grid>
          </Row>
        )}
        {item.projects?.map((project, p) => (
          <Fragment key={`project-${p}`}>
            <Row>
              <Grid xs={1}><Title>Project</Title></Grid>
              <Grid xs={3}>
                <Abstract>{project.title}</Abstract>
              </Grid>
            </Row>
            {project.features && project.features.length > 0 && (
              <Row className="bordless">
                <Grid xs={1}></Grid>
                <Grid xs={3}>
                  {project.features.map((feature, f) => (
                    <SecondaryRow key={`project-${p}-${f}`}>
                      <Grid xs={1}>
                        <Title>{feature.title}</Title>
                      </Grid>
                      <Grid xs={2}>
                        {feature.features && feature.features.length > 0 && (
                          <Flex.Col>
                            {feature.features.map((x, i) => (
                              <Abstract key={i}>{x.title}</Abstract>
                            ))}
                          </Flex.Col>
                        )}
                      </Grid>
                    </SecondaryRow>
                  ))}
                </Grid>
              </Row>
            )}
          </Fragment>
        ))}
      </Box>
    </CustomDrawer>
  );
};
