import { NewsletterConfirm, NewsletterConfirmProps, renderEmail } from '@websolute/emails';
import { getOrigin, isDevelopment, isProduction } from '@websolutespa/bom-core';
import { LabelService } from '@websolutespa/bom-mixer-hooks';
import { getLayout } from '@websolutespa/bom-mixer-models';
import { apiHandler } from '@websolutespa/bom-mixer-store';
import { NextApiRequest, NextApiResponse } from 'next';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

type INewsletterSubscribe = {
  checkField: null | unknown,
  email: string,
  privacy: boolean,
};

function getUUID() {
  return `${new Date().getTime()}`;
}

export default apiHandler({
  options: async (request: NextApiRequest, response: NextApiResponse) => {
    response.status(200).end();
  },
  post: async (request: NextApiRequest, response: NextApiResponse) => {
    try {
      const locale = request.query.locale as (string | undefined);
      const market = request.query.market as (string | undefined);
      if (!market || !locale) {
        return response.status(400).json({ message: 'Missing market or locale' });
      }
      const action: INewsletterSubscribe = request.body;
      if (action.checkField !== null) {
        return response.status(401).json({ message: 'Unauthorized' });
      }
      const origin = isDevelopment ? '' : getOrigin(request.headers);
      const layout = await getLayout(market, locale);
      const labelService = new LabelService(layout.labels);
      const subject = labelService.getLabel('form.subscribe.success');
      const props = {
        email: action.email,
      };

      const html = renderEmail<NewsletterConfirmProps>({
        Component: NewsletterConfirm,
        origin,
        layout,
        subscriptionEmail: action.email,
        preview: subject,
        props,
      });
      response.status(200).json(html);

      /*
      const data = await resend.emails.send({
        from: 'Websolute <onboarding@resend.dev>',
        to: [isProduction ? props.email : 'lzampetti@gmail.com'],
        bcc: ['lzampetti@gmail.com'],
        subject,
        html: renderEmail<NewsletterConfirmProps>({
          Component: NewsletterConfirm,
          origin,
          layout,
          subscriptionEmail: action.email,
          preview: subject,
          props,
        }),
        headers: {
          'List-Unsubscribe': `<${origin}/api/newsletter/unsubscribe?market=${layout.market}&locale=${layout.locale}&email=${action.email}>`,
          'X-Entity-Ref-ID': getUUID(),
        },
      });
      response.status(200).json(data);
      */
    } catch (error) {
      response.status(400).json(error);
    }
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
