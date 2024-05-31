import { useLenis } from '@studio-freight/react-lenis';
import { Button } from '@websolutespa/bom-mixer-ui';

type ScrollToAnchorProps = {
  target: string;
  variant: string;
  className: string;
  children: React.ReactNode;
};

export const ScrollToAnchor: React.FC<ScrollToAnchorProps> = ({ target, variant, className, children }: ScrollToAnchorProps) => {

  const lenis = useLenis(() => { });

  const onAnchor = (target: string) => {
    if (target && lenis) {
      lenis?.scrollTo(target);
    }
  }

  return (
    <Button onClick={() => onAnchor(`#${target}`)} variant={variant} className={className}>
      {children}
    </Button>
  );
};
