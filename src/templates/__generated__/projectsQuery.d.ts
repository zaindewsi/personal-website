/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: projectsQuery
// ====================================================

export interface projectsQuery_mdx_frontmatter_banner_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface projectsQuery_mdx_frontmatter_banner_childImageSharp {
  fluid: projectsQuery_mdx_frontmatter_banner_childImageSharp_fluid | null;
  id: string;
}

export interface projectsQuery_mdx_frontmatter_banner {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: projectsQuery_mdx_frontmatter_banner_childImageSharp | null;
}

export interface projectsQuery_mdx_frontmatter {
  title: string;
  date: any | null;
  description: string | null;
  banner: projectsQuery_mdx_frontmatter_banner | null;
}

export interface projectsQuery_mdx {
  body: string;
  frontmatter: projectsQuery_mdx_frontmatter | null;
}

export interface projectsQuery {
  mdx: projectsQuery_mdx | null;
}

export interface projectsQueryVariables {
  slug: string;
}
