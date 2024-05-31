import { IColor, ITextTab } from '@websolute/models';
import { getClassNames } from '@websolutespa/bom-core';
import { getSeoWeight } from '@websolutespa/bom-mixer-models';
import { Box, Flex, Text, UIStyledComponentProps, getCssResponsive, mediaUp } from '@websolutespa/bom-mixer-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { easeOutExpo } from '../../utils';

type Props = {
  item: ITextTab;
  index: number;
};
export type TextTabsProps = UIStyledComponentProps<Props>;

const ContainerTabPanel = styled(motion(Box)) <UIStyledComponentProps<{ colorData: IColor }>>`

  ${props => props.colorData.className === 'black' && css`
    color: var(--color-neutral-100);
  `}

  ${props => props.colorData.className !== 'black' && css`
    color: var(--color-neutral-800);
  `}

  .icon {
    svg {
      width: 30px;
      height: 30px;

      ${props => mediaUp(props, 'sm', css`
        width: 45px;
        height: 45px;
      `)}
    }
  }

  ${props => getCssResponsive(props)}
`;

export const TextTabsPanel: React.FC<TextTabsProps> = ({ item, index }: TextTabsProps) => {

  const { title, abstract, colorData } = item;

  const [isActive, setIsActive] = useState(false);

  const variants = {
    hover: { scale: 1.03 },
    pressed: { scale: 0.98 },
    checked: { scale: 1 },
    unchecked: { scale: 1 },
  };

  const plusVariants = {
    hover: { rotate: 180, scale: 0.9 },
    pressed: { scale: 0.8 },
    checked: { scale: 1, opacity: 0, rotate: 0 },
    unchecked: { scale: 1, opacity: 1, rotate: 0 },
  };

  const minusVariants = {
    hover: { rotate: 180, scale: 0.9 },
    pressed: { scale: 0.8 },
    checked: { scale: 1, opacity: 1, rotate: 0 },
    unchecked: { scale: 1, opacity: 0, rotate: 0 },
  };

  const transition = { duration: 0.9, ease: easeOutExpo };
  const bgColor = getClassNames(colorData?.className, 'background');

  const seoWeight = getSeoWeight(index, item.seoWeight);

  return (
    <ContainerTabPanel
      variants={variants}
      transition={transition}
      whileHover="hover"
      whileTap="pressed"
      animate={isActive ? 'checked' : 'unchecked'}
      onClick={() => setIsActive(!isActive)}
      position="relative"
      borderRadius="15px"
      overflow="hidden"
      cursor="pointer"
      padding="var(--margin-xs)"
      paddingMd="var(--margin-xs) var(--margin-sm)"
      className={bgColor}
      colorData={colorData}
    >
      <Flex>
        {title && <Text as={seoWeight()} variant="heading40" paddingRight="var(--margin-lg)">{title}</Text>}
        <Box className="icon" position="absolute" top="10px" topSm="var(--margin-xs)" right="var(--margin-xs)" rightMd="var(--margin-sm)">
          <motion.svg
            variants={plusVariants} viewBox="0 0 45 46" fill="none">
            <motion.path
              fill="currentColor" fillRule="evenodd" clipRule="evenodd"
              d="M39.375 23C39.375 13.7188 31.7812 6.125 22.5 6.125C13.2188 6.125 5.625 13.7188 5.625 23C5.625 32.2812 13.2188 39.875 22.5 39.875C31.7812 39.875 39.375 32.2812 39.375 23ZM2.8125 23C2.8125 12.1719 11.6719 3.3125 22.5 3.3125C33.3281 3.3125 42.1875 12.1719 42.1875 23C42.1875 33.8281 33.3281 42.6875 22.5 42.6875C11.6719 42.6875 2.8125 33.8281 2.8125 23ZM23.9062 21.5938H33.75V24.4062H23.9062V34H21.0938V24.4062H11.25V21.5938H21.0938V12H23.9062V21.5938Z"
            />
          </motion.svg>
        </Box>
        <Box className="icon" position="absolute" top="10px" topSm="var(--margin-xs)" right="var(--margin-xs)" rightMd="var(--margin-sm)">
          <motion.svg
            variants={minusVariants} viewBox="0 0 45 46" fill="none">
            <motion.path
              fill="currentColor" fillRule="evenodd" clipRule="evenodd"
              d="M39.375 23C39.375 13.7188 31.7812 6.125 22.5 6.125C13.2188 6.125 5.625 13.7188 5.625 23C5.625 32.2812 13.2188 39.875 22.5 39.875C31.7812 39.875 39.375 32.2812 39.375 23ZM2.8125 23C2.8125 12.1719 11.6719 3.3125 22.5 3.3125C33.3281 3.3125 42.1875 12.1719 42.1875 23C42.1875 33.8281 33.3281 42.6875 22.5 42.6875C11.6719 42.6875 2.8125 33.8281 2.8125 23ZM23.9062 21.5938H33.75V24.4062H23.9062H21.0938H11.25V21.5938H21.0938H23.9062Z"
            />
          </motion.svg>
        </Box>
      </Flex>
      <Box className="tab-text">
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto', marginTop: 'var(--margin-xs)' },
                collapsed: { opacity: 0, height: 0, marginTop: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {abstract && <Text variant="paragraph40" dangerouslySetInnerHTML={{ __html: abstract }} />}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ContainerTabPanel>
  );
};


