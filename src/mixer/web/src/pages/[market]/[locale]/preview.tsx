import { getPreviewProps } from '@websolutespa/bom-mixer-models';
import { GetServerSideProps } from 'next';

export default function Preview() {
  // getPreviewProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = getPreviewProps;
