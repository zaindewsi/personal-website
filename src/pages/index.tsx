import React, { useEffect, useRef, useState } from "react"
import { graphql, PageProps } from "gatsby"

import { ArrowRight } from "react-feather"

import Layout from "../components/layout"
import { Button } from "../components/ui"
import SocialLinks from "../utils/sociallinks"

import Itemprojects from "../components/item-projects"
import { Form, Description as ContactDescription } from "../components/contact"
import { IndexPageQuery } from "./__generated__/IndexPageQuery"

export default ({ data, location }: PageProps<IndexPageQuery>) => {
    const siteData = data.site.siteMetadata

    const projectsList = data.projects.edges.map(item => (
        <Itemprojects data={item.node} key={`b-item-index-${item.node.id}`} />
    ))

    return (
        <Layout
            front={true}
            seo={{
                title: "Home",
                description: siteData.description,
            }}
            navPlaceholder={false}
            location={location}
        >
            <Wall data={siteData} />
            {siteData.about !== "" && <About data={siteData.about} />}
            <Projects>{projectsList}</Projects>
            <Contact data={siteData.contact} />
        </Layout>
    )
}

const Wall = ({ data }) => {
    const wall = useRef(null)

    const twoColumnWall = data.twoColumnWall

    const [state, changeState] = useState({
        loaded: false,
        supportsBlend: false,
    })

    useEffect(() => {
        if (window.CSS && !state.loaded) {
            if (CSS.supports("mix-blend-mode", "screen")) {
                wall.current.classList.add("supports-blend")
                changeState({
                    loaded: true,
                    supportsBlend: true,
                })
            }
        }
    }, [state.loaded])

    let spanAttrs: Partial<{ style: unknown }> = {}

    if (!twoColumnWall && data.titleImage) {
        spanAttrs.style = {
            backgroundImage: `url('${data.titleImage}')`,
        }
    }

    const innerComponents = (
        <React.Fragment>
            <div className="title bg-bg">
                <h1
                    className={`text-6xl relative lg:text-7xl ${
                        data.capitalizeTitleOnHome ? "uppercase" : ""
                    }`}
                >
                    <span {...spanAttrs}></span>
                    Hi, I'm Zain
                </h1>
            </div>
            <p className="text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">
                {data.introTag}
            </p>
            <SocialLinks />
            <p className="text-base lg:text-lg mt-4">{data.description}</p>
            <a href="/projects">
                <Button
                    title="VIEW PROJECTS"
                    type="button"
                    iconRight={<ArrowRight />}
                />
            </a>
        </React.Fragment>
    )

    if (twoColumnWall) {
        return (
            <div
                className="wall h-screen flex relative justify-center items-center overflow-hidden"
                ref={wall}
            >
                <div className="flex-1 lg:block absolute lg:relative w-full h-full top-0 left-0">
                    <div
                        className="absolute left-0 top-0 w-full h-full lg:hidden"
                        style={{
                            background: "rgba(0,0,0,.75)",
                        }}
                    ></div>
                    <img
                        src={data.titleImage}
                        alt=""
                        className="h-full w-auto max-w-none lg:h-auto lg:w-full"
                    />
                </div>
                <div className="flex-1 text-center p-3 relative z-10 lg:text-left lg:pl-8 text-white lg:text-color-default">
                    {innerComponents}
                </div>
            </div>
        )
    }

    return (
        <div
            className="wall h-screen flex flex-col justify-center items-center text-center"
            ref={wall}
        >
            {innerComponents}
        </div>
    )
}

const About = ({ data }) => {
    return (
        <div className="boxed">
            <div className="px-4 py-20 text-center lg:py-40 lg:px-0">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    About
                </h2>
                <p className="mt-5 text-lg text-color-2">{data}</p>
            </div>
            <div>
                <p className="center text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">
                    My favourite tech stack
                </p>
            </div>
            <div className="center">
                <ul className="mt-12">
                    <li className="inline-block mx-6 my-8">
                        <img src="/images/react.png" width="100px" />
                    </li>
                    <li className="inline-block mx-6 my-8">
                        <img src="/images/node.png" width="100px" />
                    </li>
                    <li className="inline-block mx-6 my-8">
                        <img src="/images/ts.png" width="100px" />
                    </li>
                    <li className="inline-block mx-6 my-8">
                        <img src="/images/mongo.png" width="100px" />
                    </li>
                    <li className="inline-block mx-6 my-8">
                        <img src="/images/html5.png" width="100px" />
                    </li>
                    <li className="inline-block mx-6 my-8">
                        <img src="/images/css.png" width="100px" />
                    </li>
                </ul>
            </div>
        </div>
    )
}

const Projects = ({ children }) => {
    return (
        <div className="container mx-auto px-0" id="projects">
            <div className="pt-20 pb-10 text-center lg:pt-40 lg:pb-20">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    Projects
                </h2>
            </div>
            <div className="flex flex-wrap">{children}</div>
        </div>
    )
}

const Contact = ({ data }) => {
    const hasContactForm = data.api_url
    return (
        <div className="container mx-auto">
            <div className="pt-20 pb-10 lg:pt-40 lg:pb-20 text-center">
                <h2 className="text-color-1 font-black text-5xl lg:text-6xl">
                    Contact
                </h2>
                <p className="text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">
                    {" "}
                    Send me a message and I'll be in touch as soon as possible!
                </p>
            </div>

            <div className="flex flex-wrap pb-40">
                {hasContactForm && (
                    <div className="w-full lg:w-2/2 px-4 lg:pl-2 lg:pr-6">
                        <Form />
                    </div>
                )}
                <div
                    className={`w-full ${
                        hasContactForm ? "lg:w-2/2" : "lg:w-2/3 mx-auto"
                    } px-6 pt-8`}
                >
                    <ContactDescription data={data} />
                </div>
            </div>
        </div>
    )
}

export const query = graphql`
    query IndexPageQuery {
        site: site {
            siteMetadata {
                title
                description
                capitalizeTitleOnHome
                titleImage
                ogImage
                twoColumnWall
                introTag
                description
                about
                contact {
                    api_url
                    description
                    mail
                    phone
                    address
                }
                social {
                    name
                    url
                    icon
                }
            }
        }

        projects: allMdx(
            filter: { fields: { sourceName: { eq: "projects" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        date(formatString: "DD MMMM YYYY")
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
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
