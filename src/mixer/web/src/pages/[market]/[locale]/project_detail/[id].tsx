import { IHero, IProjectDetail, getProjectDetails } from '@websolute/models';
import { Hero, NextProject, useSummary } from '@websolute/ui';
import { IStaticContext, PageProps, asEquatable } from '@websolutespa/bom-core';
import { ILazyComponent, getLayout, getPage, getPageProps, getStaticPathsForSchema } from '@websolutespa/bom-mixer-models';
import { Flex, LazyLoader, Main } from '@websolutespa/bom-mixer-ui';

export default function ProjectDetail({ layout, page, params, nextProject }: PageProps<IProjectDetail> & {
  nextProject: IProjectDetail
}) {
  useSummary(page);

  const components = page.components as ILazyComponent[];
  const introItems = components && components.filter((x) => x.schema === 'intro-1');
  if (introItems && introItems.length > 0) introItems.forEach(item => {
    item.abstract = item.abstract ? item.abstract : page.title;
  });
  const nextItem: IProjectDetail | undefined = nextProject;

  return (
    <Main background="var(--color-neutral-100)">
      {page.hero && page.hero[0] && <Hero item={page.hero[0] as IHero} />}
      <Flex.Col gap="var(--spacing-lg)" gapSm="var(--spacing-md)" padding="var(--spacing-sm) 0 0 0" paddingSm="var(--spacing-md) 0 0 0">
        <LazyLoader components={page.components} />
      </Flex.Col>
      {nextItem && <NextProject item={nextItem} />}
    </Main>
  );
}

export async function getStaticProps(context: IStaticContext) {
  const id = asEquatable(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage<IProjectDetail>('project_detail', id, market, locale);
  if (!page) {
    return {
      notFound: true,
      revalidate: true,
    };
  }

  const projects = await getProjectDetails({
    where: {
      selection: {
        equals: true,
      },
    }, market, locale,
  });

  const currentIndex = projects.findIndex((project) => project.slug === page?.slug);
  const nextIndex = (currentIndex + 1) % projects.length;
  const nextProject = projects[nextIndex];

  const props = await getPageProps({ ...context, layout, page, nextProject });
  return {
    props,
    revalidate: 60, // will re-generate the page when a request comes in at most once every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('project_detail');
  return {
    paths,
    fallback: 'blocking', // runs before initial render
    // fallback: true, // runs in the background
  };
}
