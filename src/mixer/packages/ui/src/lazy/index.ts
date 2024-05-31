import { IBlogMore, ICallout, ICardList, ICarousel, ICircularSlider, ICover, ICoverMain, IDetail, IFolder, IFolderAccordion, IFolderHive, IFolderMedia, IFolderPie, IGallery, IHero, IHighlights, IIndustryMore, IIntro, ILocationMore, IMediaBox, IMediaDouble, IMediaDrawer, IMediaLoop, IMediaSplit, IMediaTabs, IMediaVideo, IMediaYoutube, IMore, IOverview, IProjectMore, IQuote, ISideImages, ISpotlight, ISpotlightSlider, ITextBig, ITextColumns, ITextCombo, ITextComboSlider, ITextList, ITextTabs, ITitleBox } from '@websolute/models';
import { ILazyModules, ILazyProps } from '@websolutespa/bom-mixer-models';
import dynamic from 'next/dynamic';
import { IImageMask } from '../components/image-mask/image-mask';
import { ICulturaCallout } from '../sections/cultura-callout/cultura-callout';
import { ICulturaContent } from '../sections/cultura-content/cultura-content';
import { ICulturaImage } from '../sections/cultura-image/cultura-image';
import { ICulturaSlider } from '../sections/cultura-slider/cultura-slider';
import { ICulturaVideo } from '../sections/cultura-video/cultura-video';
import { ICulturaYoutube } from '../sections/cultura-youtube/cultura-youtube';
import { IMediaSliderGrid } from '../sections/media-slider-grid/media-slider-grid';
import { IMediaSlider } from '../sections/media-slider/media-slider';
import { INumbers } from '../sections/numbers/numbers';
import { IProjectAlphabetically } from '../sections/project-alphabetically/project-alphabetically';
import { IProjectSelection } from '../sections/project-selection/project-selection';
import { IProjectTag } from '../sections/project-tag/project-tag';
import { IProjectType } from '../sections/project-type/project-type';
import { TestsProps } from '../sections/tests/tests';

export const LAZY_MODULES: ILazyModules = {
  'cultura-content': dynamic<ILazyProps<ICulturaContent>>(() => import('../sections/cultura-content/cultura-content').then(
    module => module.CulturaContent
  )),
  'cultura-image': dynamic<ILazyProps<ICulturaImage>>(() => import('../sections/cultura-image/cultura-image').then(
    module => module.CulturaImage
  )),
  'cultura-callout': dynamic<ILazyProps<ICulturaCallout>>(() => import('../sections/cultura-callout/cultura-callout').then(
    module => module.CulturaCallout
  )),
  'cultura-video': dynamic<ILazyProps<ICulturaVideo>>(() => import('../sections/cultura-video/cultura-video').then(
    module => module.CulturaVideo
  )),
  'cultura-youtube': dynamic<ILazyProps<ICulturaYoutube>>(() => import('../sections/cultura-youtube/cultura-youtube').then(
    module => module.CulturaYoutube
  )),
  'cultura-slider': dynamic<ILazyProps<ICulturaSlider>>(() => import('../sections/cultura-slider/cultura-slider').then(
    module => module.CulturaSlider
  )),
  'image-mask-1': dynamic<ILazyProps<IImageMask>>(() => import('../components/image-mask/image-mask').then(
    module => module.ImageMask
  )),
  'quote-1': dynamic<ILazyProps<IQuote>>(() => import('../sections/quote/quote').then(
    module => module.Quote
  )),
  'intro-1': dynamic<ILazyProps<IIntro>>(() => import('../sections/intro/intro').then(
    module => module.Intro
  )),
  'overview-1': dynamic<ILazyProps<IOverview>>(() => import('../sections/overview/overview').then(
    module => module.Overview
  )),
  'side-images-1': dynamic<ILazyProps<ISideImages>>(() => import('../sections/side-images/side-images').then(
    module => module.SideImages
  )),
  'title-box-1': dynamic<ILazyProps<ITitleBox>>(() => import('../sections/title-box/title-box').then(
    module => module.TitleBox
  )),
  'media-box-1': dynamic<ILazyProps<IMediaBox>>(() => import('../sections/media-box/media-box').then(
    module => module.MediaBox
  )),
  'media-split-1': dynamic<ILazyProps<IMediaSplit>>(() => import('../sections/media-split/media-split').then(
    module => module.MediaSplit
  )),
  'media-double-1': dynamic<ILazyProps<IMediaDouble>>(() => import('../sections/media-double/media-double').then(
    module => module.MediaDouble
  )),
  'media-drawer-1': dynamic<ILazyProps<IMediaDrawer>>(() => import('../sections/media-drawer/media-drawer').then(
    module => module.MediaDrawer
  )),
  'detail-1': dynamic<ILazyProps<IDetail>>(() => import('../sections/detail/detail').then(
    module => module.Detail
  )),
  'highlights-1': dynamic<ILazyProps<IHighlights>>(() => import('../sections/highlights/highlights').then(
    module => module.Highlights
  )),
  'gallery-1': dynamic<ILazyProps<IGallery>>(() => import('../sections/gallery/gallery').then(
    module => module.Gallery
  )),
  'text-combo-1': dynamic<ILazyProps<ITextCombo>>(() => import('../sections/text-combo/text-combo').then(
    module => module.TextCombo
  )),
  'text-combo-slider-1': dynamic<ILazyProps<ITextComboSlider>>(() => import('../sections/text-combo-slider/text-combo-slider').then(
    module => module.TextComboSlider
  )),
  'text-columns-1': dynamic<ILazyProps<ITextColumns>>(() => import('../sections/text-columns/text-columns').then(
    module => module.TextColumns
  )),
  'text-tabs-1': dynamic<ILazyProps<ITextTabs>>(() => import('../sections/text-tabs/text-tabs').then(
    module => module.TextTabs
  )),
  'text-list': dynamic<ILazyProps<ITextList>>(() => import('../sections/text-list/text-list').then(
    module => module.TextList
  )),
  'text-big': dynamic<ILazyProps<ITextBig>>(() => import('../sections/text-big/text-big').then(
    module => module.TextBig
  )),
  'blog-more-1': dynamic<ILazyProps<IBlogMore>>(() => import('../sections/blog-more/blog-more').then(
    module => module.BlogMore
  )),
  'project-tag': dynamic<ILazyProps<IProjectTag>>(() => import('../sections/project-tag/project-tag').then(
    module => module.ProjectTag
  )),
  'project-type': dynamic<ILazyProps<IProjectType>>(() => import('../sections/project-type/project-type').then(
    module => module.ProjectType
  )),
  'project-selection': dynamic<ILazyProps<IProjectSelection>>(() => import('../sections/project-selection/project-selection').then(
    module => module.ProjectSelection
  )),
  'project-alphabetically': dynamic<ILazyProps<IProjectAlphabetically>>(() => import('../sections/project-alphabetically/project-alphabetically').then(
    module => module.ProjectAlphabetically
  )),
  'project-more': dynamic<ILazyProps<IProjectMore>>(() => import('../sections/project-more/project-more').then(
    module => module.ProjectMore
  )),
  'carousel-1': dynamic<ILazyProps<ICarousel>>(() => import('../sections/carousel/carousel').then(
    module => module.Carousel
  )),
  'media-tabs-1': dynamic<ILazyProps<IMediaTabs>>(() => import('../sections/media-tabs/media-tabs').then(
    module => module.MediaTabs
  )),
  'media-slider': dynamic<ILazyProps<IMediaSlider>>(() => import('../sections/media-slider/media-slider').then(
    module => module.MediaSlider
  )),
  'media-slider-grid': dynamic<ILazyProps<IMediaSliderGrid>>(() => import('../sections/media-slider-grid/media-slider-grid').then(
    module => module.MediaSliderGrid
  )),
  'media-youtube': dynamic<ILazyProps<IMediaYoutube>>(() => import('../sections/media-youtube/media-youtube').then(
    module => module.MediaYoutube
  )),
  'media-video': dynamic<ILazyProps<IMediaVideo>>(() => import('../sections/media-video/media-video').then(
    module => module.MediaVideo
  )),
  'media-loop': dynamic<ILazyProps<IMediaLoop>>(() => import('../sections/media-loop/media-loop').then(
    module => module.MediaLoop
  )),
  'more-1': dynamic<ILazyProps<IMore>>(() => import('../sections/more/more').then(
    module => module.More
  )),
  'hero-1': dynamic<ILazyProps<IHero>>(() => import('../sections/hero/hero').then(
    module => module.Hero
  )),
  'spotlight-1': dynamic<ILazyProps<ISpotlight>>(() => import('../sections/spotlight/spotlight').then(
    module => module.Spotlight
  )),
  'spotlight-slider': dynamic<ILazyProps<ISpotlightSlider>>(() => import('../sections/spotlight-slider/spotlight-slider').then(
    module => module.SpotlightSlider
  )),
  'folder-1': dynamic<ILazyProps<IFolder>>(() => import('../sections/folder/folder').then(
    module => module.Folder
  )),
  'cover-1': dynamic<ILazyProps<ICover>>(() => import('../sections/cover/cover').then(
    module => module.Cover
  )),
  'cover-main': dynamic<ILazyProps<ICoverMain>>(() => import('../sections/cover-main/cover-main').then(
    module => module.CoverMain
  )),
  'folder-accordion': dynamic<ILazyProps<IFolderAccordion>>(() => import('../sections/folder/folder-accordion').then(
    module => module.FolderAccordion
  )),
  'folder-hive': dynamic<ILazyProps<IFolderHive>>(() => import('../sections/folder/folder-hive').then(
    module => module.FolderHive
  )),
  'folder-media': dynamic<ILazyProps<IFolderMedia>>(() => import('../sections/folder/folder-media').then(
    module => module.FolderMedia
  )),
  'folder-pie': dynamic<ILazyProps<IFolderPie>>(() => import('../sections/folder/folder-pie').then(
    module => module.FolderPie
  )),
  'circular-slider': dynamic<ILazyProps<ICircularSlider>>(() => import('../sections/circular-slider/circular-slider').then(
    module => module.CircularSlider
  )),
  'location-more': dynamic<ILazyProps<ILocationMore>>(() => import('../sections/location-more/location-more').then(
    module => module.LocationMore
  )),
  'callout': dynamic<ILazyProps<ICallout>>(() => import('../sections/callout/callout').then(
    module => module.Callout
  )),
  'card-list': dynamic<ILazyProps<ICardList>>(() => import('../sections/card-list/card-list').then(
    module => module.CardList
  )),
  'industry-more': dynamic<ILazyProps<IIndustryMore>>(() => import('../sections/industry-more/industry-more').then(
    module => module.IndustryMore
  )),
  'numbers': dynamic<ILazyProps<INumbers>>(() => import('../sections/numbers/numbers').then(
    module => module.Numbers
  )),
  'tests': dynamic<ILazyProps<TestsProps>>(() => import('../sections/tests/tests').then(
    module => module.Tests
  )),
};
