import { imageHandler } from '@websolute/bom-mixer-image';

const IMAGE_DOMAINS = process.env.IMAGE_DOMAINS ? process.env.IMAGE_DOMAINS.split(',') : [];

export default imageHandler({
  domains: IMAGE_DOMAINS,
});
