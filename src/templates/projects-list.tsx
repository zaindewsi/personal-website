import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import ProjectsItem from "../components/item-projects"
import Pagination from "../components/pagination"
import { projectsListQuery } from "./__generated__/projectsListQuery"

export default function projectsList({ data, pageContext, location }: PageProps<projectsListQuery, {}>) {
    const projectsItems = data.allMdx.edges.map(item => (
        <ProjectsItem data={item.node} key={item.node.id} />
    ))

    return (
        <Layout
            seo={{
                title: "Projects",
            }}
            location={location}
        >
            <div className="container mx-auto py-12">
                <div className="title py-12 text-center">
                    <h2 className="font-black text-5xl text-color-1">
                        Projects
                    </h2>
                </div>
                <div className="flex flex-wrap">{projectsItems}</div>
                <Pagination pageContext={pageContext} type="projects" />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query projectsListQuery($skip: Int!, $limit: Int!) {
        allMdx(
            filter: { fields: { sourceName: { eq: "projects" } } }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        date(formatString: "DD MMMM YYYY")
                        image {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 1920) {
                                    srcSet
                                    ...GatsbyImageSharpFluid
                                }
                                id
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
