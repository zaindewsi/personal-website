import React, { useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { Calendar } from "react-feather"
import { projectsListQuery_allMdx_edges_node } from "../templates/__generated__/projectsListQuery"
import { IndexPageQuery_projects_edges_node } from "../pages/__generated__/IndexPageQuery"

type ItemprojectsProps = projectsListQuery_allMdx_edges_node | IndexPageQuery_projects_edges_node
export const Itemprojects: React.FC<{ data: ItemprojectsProps}> = ({ data }) => {

    const [focused, changeFocused] = useState(true);

    return (
        <div className="projects-item w-full md:w-1/2 lg:w-1/3 p-4">
            <div className={`transition-all duration-300 shadow-2xl hover:shadow shadow ${focused && 'focused'}`}>
                <Link to={data.fields.slug} title={data.frontmatter.title} onFocus={() => changeFocused(false)} onBlur={() => changeFocused(false)}>
                    <div className="image">
                        <Img
                            fluid={data.frontmatter.image.childImageSharp.fluid}
                            alt={data.frontmatter.title}
                            className="w-full"
                        />
                    </div>
                    <div className="p-4 py-3">
                        <h4 className="text-color-2 font-black text-3xl pt-1">
                            {data.frontmatter.title}
                        </h4>
                        <div className="flex items-center text-secondary">
                            <Calendar className="stroke-current"/>
                            <p className="pl-2 text-color-default font-sans">{data.frontmatter.date}</p>
                        </div>
                        <p className="pt-3 text-color-2">
                            {data.frontmatter.description}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Itemprojects;