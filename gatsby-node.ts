import { createFilePath } from 'gatsby-source-filesystem';
import { GatsbyNode } from 'gatsby';
import path from 'path';


export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode })
        const sourceName = getNode(node.parent).sourceInstanceName
        const prefix = sourceName === "basepages" ? '' : '/'+sourceName;

        createNodeField({
            node,
            name: `slug`,
            value: `${prefix}${slug}`,
        })
        createNodeField({
            node,
            name: `sourceName`,
            value: sourceName,
        })
    }
}


export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions

    return graphql<any>(`
        query GatsbyNodeQuery {
            all: allMdx {
                edges {
                    node {
                        fields {
                            slug
                            sourceName
                        }
                    }
                }
            }
            projects: allMdx(filter: { fields: { sourceName: { eq: "projects" } } }) {
                edges {
                    node {
                        id
                    }
                }
            }
            limitPost: site {
                siteMetadata {
                    projectsItemsPerPage
                    portfolioItemsPerPage
                }
            }
        }
    `).then(result => {
        result.data.all.edges.forEach(({ node }) => {
            let template = node.fields.sourceName
            createPage({
                path: node.fields.slug,
                component: path.resolve("./src/templates/" + template + ".tsx"),
                context: {
                    slug: node.fields.slug,
                },
            })
        })

        const projectsPosts = result.data.projects.edges
        const projectsPostsPerPage =
            result.data.limitPost.siteMetadata.projectsItemsPerPage
        const numprojectsPages = Math.ceil(projectsPosts.length / projectsPostsPerPage)

        Array.from({ length: numprojectsPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/projects` : `/projects/${i + 1}`,
                component: path.resolve("./src/templates/projects-list.tsx"),
                context: {
                    limit: projectsPostsPerPage,
                    skip: i * projectsPostsPerPage,
                    numPages: numprojectsPages,
                    currentPage: i + 1,
                },
            })
        })
    })
}
