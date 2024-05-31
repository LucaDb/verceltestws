import { IFolderPieItem } from '@websolute/models';
import { UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PieChartItem } from '../pie-chart/pie-chart-item';
import { PieChartSvg } from './pie-chart-svg';

type Props = {
  items: IFolderPieItem[];
};

export type PieChartProps = UIStyledComponentProps<Props>;

const PieChartContainer = styled.div<Omit<PieChartProps, 'items'>>`

  ${props => getCssResponsive(props)}
`;

export const PieChart: React.FC<PieChartProps> = ({ items }: PieChartProps) => {

  const [activeLabel, setActiveLabel] = useState<number | null>(null);

  const setLabel = (id: number | null) => {
    setActiveLabel(id);
  };

  useEffect(() => {
    setLabel(7);
  }, []);

  return (
    <PieChartContainer position="relative">
      <PieChartSvg />
      {items && items.map((item, i) => (
        <PieChartItem key={i} isVisible={true} top={item.top} left={item.left}>{item.title}</PieChartItem>
      ))}
    </PieChartContainer>
  );
};
