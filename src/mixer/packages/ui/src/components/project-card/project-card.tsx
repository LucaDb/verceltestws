import { IProjectDetail } from '@websolute/models';
import { Box, Button, Link, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type Props = {
  item: IProjectDetail;
  aspectRatio?: number;
  aspectRatioSm?: number;
};

const durationIn = 1.2;
const durationOut = 1;
const easing = [0.73, 0.01, 0.24, 1];

export type ProjectCardProps = UIStyledComponentProps<Props>;

const ProjectCardContainer = styled.article<Omit<ProjectCardProps, 'item'>>`
  cursor: pointer;

  &:hover,
  &:focus {
    .text {
      background-size: 0 0.1em, 100% 0.1em;
    }
  }

  .media {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  ${props => getCssResponsive(props)}
`;

const cardMotion = {
  rest: {
    overflow: 'hidden',
    borderRadius: '0',
    ease: easing,
    duration: durationOut,
    type: 'tween',
  },
  hover: {
    borderRadius: '20px',
    transition: {
      duration: durationIn,
      type: 'tween',
      ease: easing,
    },
  },
};

const imageMotion = {
  rest: {
    scale: 1,
    borderRadius: '0',
    ease: easing,
    duration: durationOut,
    type: 'tween',
  },
  hover: {
    scale: 1.1,
    borderRadius: '20px',
    transition: {
      duration: durationIn,
      type: 'tween',
      ease: easing,
    },
  },
};

const MotionMedia = motion(Media);

export const ProjectCard: React.FC<ProjectCardProps> = ({ item, aspectRatio, aspectRatioSm, ...props }: ProjectCardProps) => {

  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
      <Link href={item.href || '/' as string}>
        <ProjectCardContainer as="a">
          <motion.div variants={cardMotion}>
            <MotionMedia variants={imageMotion} aspectRatio={16 / 10} item={item.media} />
          </motion.div>
          {(item.title || item.abstract) && (
            <Box marginTop={item.media && 'var(--margin-xs)'}>
              {item.title && <Button display="block">
                <Text variant="paragraph20">{item.title}</Text>
              </Button>}
              {item.abstract && <Button display="block" variant="line" className="_light">
                <Text variant="paragraph30">{item.abstract}</Text>
              </Button>}
            </Box>
          )}
        </ProjectCardContainer>
      </Link>
    </motion.div>
  );
};
