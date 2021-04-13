import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Logo } from "./utils"
import Navlinks from "./navigation-list"
import { FooterLinksQuery, FooterLinksQuery_site_siteMetadata_footerLinks } from "./__generated__/FooterLinksQuery"


export default function() {
    const query = useStaticQuery<FooterLinksQuery>(graphql`
        query FooterLinksQuery {
            site {
                siteMetadata {
                    title
                    footerLinks {
                        name
                        url
                    }
                }
            }
        }
    `)


    return (
        <footer className="footer bg-bgalt py-12">
            <div className="container mx-auto text-center">
                <div className="flex justify-center my-3 mb-6">
                    <Link to="/" title={query.site.siteMetadata.title}>
                        <Logo className="w-16"/>
                    </Link>
                </div>
                <div className="text-color-2 my-3 footer-links animated-link-parent">
                    <Navlinks className="flex items-center justify-center flex-wrap" withThemeSwitch={false}/>
                </div>
                <p className="text-color-default text-lg">
                    Copyright &copy; {query.site.siteMetadata.title}{" "}
                    {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
}
