import { IFolderHiveItem } from '@websolute/models';
import { UIStyledComponentProps, getCssResponsive } from '@websolutespa/bom-mixer-ui';
import styled from 'styled-components';
import { HiveSvg } from './hive-svg';

type Props = {
  items: IFolderHiveItem[];
};

export type HiveProps = UIStyledComponentProps<Props>;

const HiveContainer = styled.div<Omit<HiveProps, 'items'>>`
  ${props => getCssResponsive(props)}
`;

export const Hive: React.FC<HiveProps> = ({ items }: HiveProps) => {

  return (
    <HiveContainer position="relative">
      <HiveSvg items={items} />
    </HiveContainer>
  );
};
