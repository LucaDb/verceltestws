import { FloatingPortal, Placement, autoUpdate, flip, offset, useDismiss, useFloating, useHover, useInteractions, useTransitionStyles } from '@floating-ui/react';
import React, { useState } from 'react';

type Props = {
  children: React.ReactElement;
  panel: React.ReactElement;
  placement?: Placement;
  color?: string;
  borderColor?: string;
};

export const FloatingTip: React.FC<Props> = ({ children, panel, placement, color, borderColor }: Props) => {

  const [active, setActive] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: active,
    onOpenChange(isOpen, event) {
      setActive(isOpen);
    },
    whileElementsMounted: autoUpdate,
    placement: placement ? placement : 'bottom',
    middleware: [offset(6), flip()],

  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useDismiss(context),
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
    duration: 400,
  });

  const childPanel = React.Children.only(panel);
  const stylePanel = { ...childPanel.props.style, ...styles, ...floatingStyles };
  const panelWithRefs = React.cloneElement(childPanel, { ref: refs.setFloating, ...getFloatingProps(), style: stylePanel });

  const child = React.Children.only(children);
  const childWithRefs = React.cloneElement(child, {
    ref: refs.setReference, ...getReferenceProps(),
    fill: active && color ? color : 'var(--color-neutral-800)',
    stroke: active && borderColor ? borderColor : 'var(--color-neutral-100)',
    strokeWidth: active ? 4 : 0,
  });

  return (
    <>
      {childWithRefs}
      {(active && isMounted) && (<FloatingPortal>{panelWithRefs}</FloatingPortal>)}
    </>
  );
};
