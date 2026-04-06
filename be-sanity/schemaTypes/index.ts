import blockContent from './blockContent'

import person from './person'

import article from './article'
import kalturaVideo from './kalturaVideo'
import pageBuilderType from './pageBuilderType'
import page from './page'
import Landingpage from './Landingpage'
import services from './services'

// Import blocks
import hero from './blocks/hero'
import ctaCardPanel from './blocks/ctaCardPanel'
import features from './blocks/features'
import textSection from './blocks/textSection'
import splitImage from './blocks/splitImage'
import contactCallout from './blocks/contactCallout'
// Import objects
import Anchor_links from './objects/Anchor_links'
import Heroimage from './objects/heroimage'
import link from './objects/link'
import FullwidthImage from './objects/FullwidthImage'
import SpotlightContentService from './objects/SpotlightContentService'
import HTMLBlock from './objects/HTMLBlock'
import TwoColumn from './objects/TwoColumn'
import CustomImage from './objects/CustomImage'
import megaMenu from './navigation/megaMenu'
import megaMenuColumn from './navigation/megaMenuColumn'
import megaMenuItem from './navigation/megaMenuItem'
import topicsSection from './objects/topicsSection'
import topicItem from './objects/topicItem'
import accordionItem from './objects/accordionItem'
import accordionGroup from './objects/accordionGroup'
import searchBlock from './objects/searchBlock'
import sidebar from './sidebar/sidebar'
import sidebarsection from './sidebar/sidebarSection'
import linkWithIcon from './objects/linkWithIcon'

export const schemaTypes = [
  // Document types
  person,
  article,
  page,
  services,
  megaMenu,          // add
  megaMenuColumn,    // add
  megaMenuItem,
  // Page builder types
  pageBuilderType,

  // Block types
  hero,
  features,
  textSection,
  splitImage,
  ctaCardPanel,
  contactCallout,

  // Objects
  Anchor_links,
  Landingpage,
  Heroimage,
  link,
  FullwidthImage,
  SpotlightContentService,
  HTMLBlock,
  TwoColumn,
  CustomImage,
  topicItem,
  topicsSection,
  accordionItem,
  accordionGroup,
  searchBlock,
  linkWithIcon,

  //sidebar
  sidebar,
  sidebarsection,
  // Other types
  blockContent,
  kalturaVideo,
]
