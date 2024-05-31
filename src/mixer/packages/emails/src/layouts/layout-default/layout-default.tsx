import { Body, Column, Container, Font, Head, Hr, Html, Img, Link, Preview, Row, Section, Text } from '@react-email/components';
import { IMenuPage } from '@websolutespa/bom-core';
import { LabelProvider, LayoutProvider, useLabel } from '@websolutespa/bom-mixer-hooks';
import { css } from 'styled-components';
import { IEmailLayoutComponent, styles } from '../../core';

export const LayoutDefault: IEmailLayoutComponent = ({
  origin,
  layout,
  preview,
  subscriptionEmail,
  isNewsletter,
  children
}) => {
  const label = useLabel();
  const menu: IMenuPage[] = layout.menu.footerEnd ?
    layout.menu.footerEnd.items.filter(x => x.type === 'page') as IMenuPage[] :
    [];
  function getYear() {
    return new Date().getFullYear();
  }
  /*
  const privacy = useMemo(() => {
    const items = layout.menu.footerEnd?.items;
    if (items && items.length > 0) {
      return items[0] as (IMenuLink | IMenuPage);
    }
    return undefined;
  }, [layout.menu.footerEnd]);
  */
  return (
    <LayoutProvider layout={layout}>
      <LabelProvider>
        <Html lang={layout.locale}>
          <Head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>{css`
              @media (max-width: 599px) {
                .section {
                  padding: 25px!important; // 50px;
                }
                .row {
                  padding: 15px 0!important; // 15px 0;
                }
                .header {
                  padding: 25px 25px 0 25px!important; // 50px 50px 0 50px;
                }
                .footer {
                  padding: 50px 25px!important; // 100px 50px;
                  font-size: 11px!important; // 14px;
                }
                .footerTitle {
                  font-size: 25px!important; // 36px;
                }
                .title {
                  font-size: 37px!important; // 60px;
                  margin-bottom: 25px!important; // 50px;
                }
                .abstract {
                  font-size: 19px!important; // 30px;
                  margin-bottom: 25px!important; // 50px;
                }
                .button {
                  margin-top: 25px!important; // 50px;
                  padding: 15px 25px!important; // 20px 30px;
                  font-size: 16px!important; // 18px;
                }
                .paragraph {
                  font-size: 18px!important; // 18px;
                }
                .link {
                  font-size: 18px!important; // 18px;
                }
                .dimmed {
                }
                .textSm {
                  font-size: 13px!important; // 16px;
                }
                .textXs {
                  font-size: 10.5px!important; // 14px;
                }
                .linkSm {
                  font-size: 13px!important; // 16px;
                }
                .linkXs {
                  font-size: 10.5px!important; // 14px;
                }
                .linkSocial {
                  margin: 0 8px!important; // 0 15px;
                  font-size: 0!important; // 0;
                }
                .imgSocial {
                }
                .hr {
                  margin: 25px 0!important; // 25px 0;
                }
                .logo {
                  width: 84px; // 112px;
                  height: 14.25px; // 19px;
                }
                .colors {
                  width: 45px; // 60px;
                  height: 11.25px; // 15px;
                }
              }
            `.toString()}</style>
            <Font
              fontFamily="yellixregular"
              fallbackFontFamily="Arial"
              webFont={{
                url: `${origin}/assets/fonts/Yellix-Medium.woff2`,
                format: 'woff2',
              }}
              fontWeight="normal"
              fontStyle="normal"
            />
          </Head>
          {preview && (
            <Preview>{preview}</Preview>
          )}
          <Body className="body" style={styles.body}>
            {/** container hack **/}
            <Container className="wrapper" style={styles.wrapper}>
              {/** header **/}
              <Section className="header" style={styles.header}>
                <Container className="container" style={styles.container}>
                  <Row>
                    <Column>
                      <Link href={origin}>
                        <Img
                          className="logo"
                          src={`${origin}/assets/email/logo.png`}
                          width="112"
                          height="19"
                          alt="Websolute"
                        />
                      </Link>
                    </Column>
                    <Column style={{ textAlign: 'right' }}>
                      <Text className="textSm" style={{ ...styles.textSm, ...styles.dimmed }}>
                        Vai al sito
                        <Link className="linkSm" href={origin} style={{ ...styles.linkSm, ...styles.dimmed }}>
                          websolute.com
                        </Link>
                      </Text>
                    </Column>
                  </Row>
                </Container>
              </Section>
              <Container className="container" style={styles.container}>
                {/** main **/}
                {children}
              </Container>
              {/** footer **/}
              <Section className="footer" style={styles.footer}>
                <Container className="container" style={styles.container}>
                  <Img
                    className="colors"
                    src={`${origin}/assets/email/colors@2x.png`}
                    width="60"
                    height="15"
                    alt="Websolute brands colors"
                    style={{ margin: '0 auto 25px auto' }}
                  />
                  <Text className="footerTitle" style={styles.footerTitle}>
                    Digital roadmaps <br />for ambitious brands.
                  </Text>
                  <Hr className="hr" style={styles.hr} />
                  <Row className="row" style={styles.row}>
                    <Link
                      href="https://www.facebook.com/Websolute/"
                      className="linkSocial" style={styles.linkSocial}>
                      <Img
                        src={`${origin}/assets/email/icon-facebook@2x.png`}
                        width="30"
                        height="30"
                        alt="Facebook"
                      />
                    </Link>
                    <Link
                      href="https://www.instagram.com/websolute/"
                      className="linkSocial" style={styles.linkSocial}>
                      <Img
                        src={`${origin}/assets/email/icon-instagram@2x.png`}
                        width="30"
                        height="30"
                        alt="Websolute Instagram"
                      />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/websolute/"
                      className="linkSocial" style={styles.linkSocial}>
                      <Img
                        src={`${origin}/assets/email/icon-linkedin@2x.png`}
                        width="30"
                        height="30"
                        alt="Websolute - Digital Company - LinkedIn"
                      />
                    </Link>
                    <Link
                      href="https://www.youtube.com/@WebsoluteIt"
                      className="linkSocial" style={styles.linkSocial}>
                      <Img
                        src={`${origin}/assets/email/icon-youtube@2x.png`}
                        width="30"
                        height="30"
                        alt="Websolute Youtube Channel"
                      />
                    </Link>
                    <Link
                      href="https://open.spotify.com/show/71oRBC74MUE9ukhkwP1j7O?si=5ecb9f91ca824e85"
                      className="linkSocial" style={styles.linkSocial}>
                      <Img
                        src={`${origin}/assets/email/icon-spotify@2x.png`}
                        width="30"
                        height="30"
                        alt="Websolute Podcast"
                      />
                    </Link>
                  </Row>
                  <Row className="row" style={styles.row}>
                    &copy;{getYear()} websolute spa<br />
                    P.I. 02063520411, Capitale sociale Eur 194.084,34 i.v., REA PU n.151254<br />
                    Strada della Campanara, 15 61122 Pesaro (PU)<br />
                    TEL: 0721.411112 • FAX: 0721.430007<br />
                    {menu && menu.map((x, i) => (
                      <Link key={i} href={`${origin}${x.href}`}
                        className="linkXs" style={styles.linkXs}>
                        {x.title as string}
                      </Link>
                    ))}
                  </Row>
                  {subscriptionEmail && (
                    <Row className="row" style={styles.row}>
                      <Link className="linkXs" href={`${origin}/api/newsletter/unsubscribe?market=${layout.market}&locale=${layout.locale}&email=${subscriptionEmail}`} style={{ ...styles.linkXs, ...styles.dimmed }}>
                        {label('email.unsubscribe')}
                      </Link>
                      {isNewsletter && (
                        <Link className="linkXs" href={`${origin}/api/newsletter/subscribe?market=${layout.market}&locale=${layout.locale}&email=${subscriptionEmail}`} style={{ ...styles.linkXs, ...styles.dimmed }}>
                          {label('email.viewOnWeb')}
                        </Link>
                      )}
                    </Row>
                  )}
                </Container>
              </Section>
            </Container>
          </Body>
        </Html>
      </LabelProvider>
    </LayoutProvider>
  );
};
