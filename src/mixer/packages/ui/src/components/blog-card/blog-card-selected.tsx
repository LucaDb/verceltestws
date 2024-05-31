import { ICulturaDetail, IProjectDetail } from '@websolute/models';
import { Box, Button, Link, Media, Text, UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type Props = {
  item: ICulturaDetail | IProjectDetail;
  mediaRatio?: number;
};

export type BlogCardSelectedProps = UIStyledComponentProps<Props, 'a'>;

const BlogCardSelectedContainer = styled.article<BlogCardSelectedProps>`

cursor: pointer;

.media {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

&:hover {
  .text {
    background-size: 0 0.1em, 100% 0.1em;
  }
}

  ${props => getCssResponsive(props)}
`;

const durationIn = 1.2;
const durationOut = 1;
const easing = [0.73, 0.01, 0.24, 1];

const cardMotion = {
  rest: {
    overflow: 'hidden',
    borderRadius: '0',
    ease: easing,
    duration: durationOut,
    type: 'tween',
  },
  hover: {
    borderRadius: '30px',
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
    ease: easing,
    duration: durationOut,
    type: 'tween',
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: durationIn,
      type: 'tween',
      ease: easing,
    },
  },
};

const MotionContainer = motion(BlogCardSelectedContainer);
const MotionMedia = motion(Media);

export const BlogCardSelected = ({ item, ...props }: BlogCardSelectedProps) => {
  const type = Array.isArray(item.type) ? item.type[0] : item.type;
  const media = item.thumb || item.media;
  return (
    <Link href={item.href || '/' as string}>
      <MotionContainer as="a" initial="rest" whileHover="hover" animate="rest">
        <Box>
          <motion.div variants={cardMotion}>
            <MotionMedia variants={imageMotion} aspectRatio={props.mediaRatio ? props.mediaRatio : 16 / 9} item={media} />
          </motion.div>
          <Box marginTop={media && 'var(--margin-sm)'}>
            {type && (
              <Text variant="label20" textTransform="uppercase" color="var(--color-neutral-400)">{type.title}</Text>
            )}
            <Button variant="line" marginTop={item.type && 'var(--margin-xs)'} display="block">
              <Text variant="paragraph20" dangerouslySetInnerHTML={{ __html: `${item.title} • ${item.abstract}` }}></Text>
            </Button>
          </Box>
        </Box>
      </MotionContainer>
    </Link>
  );
};
