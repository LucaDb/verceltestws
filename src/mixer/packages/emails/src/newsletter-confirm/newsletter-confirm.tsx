import { Button, Row, Section, Text } from '@react-email/components';
import { useLabel } from '@websolutespa/bom-mixer-hooks';
import { IEmailComponent, styles } from '../core';

export type NewsletterConfirmProps = {
  email: string;
};

export const NewsletterConfirm: IEmailComponent<NewsletterConfirmProps> = ({
  origin,
  layout,
  subscriptionEmail,
  isNewsletter,
  preview,
  props,
}) => {
  const label = useLabel();
  return (
    <>
      <Section className="section" style={styles.section}>
        <Row className="row" style={styles.row}>
          <Text className="title" style={styles.title}>
            {label('email.optIn.title')}
          </Text>
          <Text className="abstract" style={styles.abstract}>
            {label('email.optIn.abstract')}
          </Text>
          <Button className="button" style={styles.button} href={origin}>
            {label('email.optIn.cta')}
          </Button>
        </Row>
      </Section>
    </>
  );
};

// NewsletterConfirm.Layout = LayoutDefault;
