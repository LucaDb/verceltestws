import { NewsletterConfirm, NewsletterConfirmProps, renderEmail } from '@websolute/emails';
import { isProduction } from '@websolutespa/bom-core';
import { LabelService } from '@websolutespa/bom-mixer-hooks';
import { getLayout } from '@websolutespa/bom-mixer-models';
import { apiHandler } from '@websolutespa/bom-mixer-store';
import { IncomingHttpHeaders } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

const ORIGIN = process.env.NEXT_PUBLIC_URL || '';

function getOrigin(headers?: IncomingHttpHeaders): string {
  if (headers) {
    const host: string = headers['x-forwarded-host'] as string || headers.host || '';
    if (host) {
      return host.indexOf('localhost') !== -1 ? 'http://' + host : 'https://' + host;
    } else {
      return ORIGIN;
    }
  } else {
    return ORIGIN;
  }
}

export default apiHandler({
  options: async (request: NextApiRequest, response: NextApiResponse) => {
    response.status(200).end();
  },
  get: async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      const locale = request.query.locale as (string | undefined);
      const market = request.query.market as (string | undefined);
      const email = request.query.email as (string | undefined);
      if (!market || !locale) {
        return response.status(400).json({ message: 'Missing market or locale' });
      }
      if (!email) {
        return response.status(400).json({ message: 'Missing email' });
      }
      const origin = isProduction ? getOrigin(request.headers) : '';
      const layout = await getLayout(market, locale);
      const labelService = new LabelService(layout.labels);
      const subject = labelService.getLabel('form.subscribe.success');
      const props = {
        email,
      };
      const html = renderEmail<NewsletterConfirmProps>({
        Component: NewsletterConfirm,
        origin,
        layout,
        subscriptionEmail: email,
        preview: subject,
        props,
      });
      response.status(200).send(html);
    } catch (error) {
      response.status(400).json(error);
    }
  },
});
