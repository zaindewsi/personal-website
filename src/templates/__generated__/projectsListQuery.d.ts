/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: projectsListQuery
// ====================================================

export interface projectsListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface projectsListQuery_allMdx_edges_node_frontmatter_image_childImageSharp {
  fluid: projectsListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface projectsListQuery_allMdx_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: projectsListQuery_allMdx_edges_node_frontmatter_image_childImageSharp | null;
}

export interface projectsListQuery_allMdx_edges_node_frontmatter {
  title: string;
  description: string | null;
  date: any | null;
  image: projectsListQuery_allMdx_edges_node_frontmatter_image | null;
}

export interface projectsListQuery_allMdx_edges_node_fields {
  slug: string | null;
}

export interface projectsListQuery_allMdx_edges_node {
  id: string;
  frontmatter: projectsListQuery_allMdx_edges_node_frontmatter | null;
  fields: projectsListQuery_allMdx_edges_node_fields | null;
}

export interface projectsListQuery_allMdx_edges {
  node: projectsListQuery_allMdx_edges_node;
}

export interface projectsListQuery_allMdx {
  edges: projectsListQuery_allMdx_edges[];
}

export interface projectsListQuery {
  allMdx: projectsListQuery_allMdx;
}

export interface projectsListQueryVariables {
  skip: number;
  limit: number;
}
