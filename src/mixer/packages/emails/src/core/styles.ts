import { theme } from '@websolute/ui';

export const styles = {
  body: {
    margin: '0',
    padding: '0',
    fontFamily: theme.fontBase.family,
    lineHeight: theme.fontBase.lineHeight,
    fontWeight: theme.fontBase.fontWeight,
    fontSize: theme.fontBase.fontSize,
    fontFeatureSettings: "'ss01'",
    backgroundColor: theme.color.neutral[100],
    color: theme.color.neutral[800],
    wordSpacing: 'normal',
  },
  wrapper: {
    margin: '0',
    padding: '0',
    width: '100%',
    maxWidth: '100%',
    minHeight: '100vh',
  },
  container: {
    margin: '0 auto',
    width: '100%',
  },
  section: {
    padding: '50px',
  },
  row: {
    padding: '15px 0',
  },
  header: {
    padding: '50px 50px 0 50px',
  },
  footer: {
    padding: '100px 50px',
    textAlign: 'center' as const,
    fontSize: '14px',
    lineHeight: '1.4',
    backgroundColor: '#F5F5F5',
    color: theme.color.neutral[800],
  },
  footerTitle: {
    fontSize: '36px',
    lineHeight: '1.3',
    marginBottom: '25px',
  },
  title: {
    fontSize: '60px',
    lineHeight: '1.2',
    marginBottom: '50px',
  },
  abstract: {
    fontSize: '30px',
    lineHeight: '1.2',
    marginBottom: '50px',
  },
  button: {
    display: 'inline-block',
    marginTop: '50px',
    padding: '20px 30px',
    minWidth: '140px',
    borderRadius: '30px',
    fontSize: '18px',
    lineHeight: '1',
    textDecoration: 'none',
    textAlign: 'center' as const,
    backgroundColor: theme.color.primary[500],
    color: theme.color.neutral[800],
  },
  text: {
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.4',
  },
  link: {
    fontSize: '18px',
    lineHeight: '1.4',
    display: 'block',
    color: theme.color.neutral[800],
  },
  dimmed: {
    color: theme.color.neutral[400],
  },
  textSm: {
    display: 'inline-block',
    fontSize: '16px',
    margin: 0,
  },
  textXs: {
    display: 'inline-block',
    fontSize: '14px',
  },
  linkSm: {
    display: 'inline-block',
    margin: '6px',
    fontSize: '16px',
    textDecoration: 'underline',
    color: theme.color.neutral[800],
  },
  linkXs: {
    display: 'inline-block',
    margin: '6px',
    fontSize: '14px',
    textDecoration: 'underline',
    color: theme.color.neutral[800],
  },
  linkSocial: {
    display: 'inline-block',
    margin: '0 15px',
    fontSize: '0',
    lineHeight: '1',
    color: theme.color.neutral[800],
  },
  imgSocial: {
    display: 'inline-block',
  },
  hr: {
    margin: '25px 0',
    border: '1px solid',
    borderColor: theme.color.neutral[200],
  },
};
