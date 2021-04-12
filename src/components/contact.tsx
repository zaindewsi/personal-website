import React, { useState } from "react"
import { Send, Loader } from "react-feather"
import { Button } from "./ui"

import SocialLinks from "../utils/sociallinks"
import { ContactQuery_site_siteMetadata_contact } from "../pages/__generated__/ContactQuery"

const Form = () => {
    return (       
    
    <div>
         <div className="col-md-8 mt-5">
            <form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact">
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
                <div className = "transition-all duration-300 py-3 lg:p-4 pb-6">
                    <div className="bg-gradient-primary p-2px">
                        <input className="block w-full outline-none px-4 py-2 focus:outline-none bg-bg text-color-default" type="email" name="email" placeholder="Your Email" />
                    </div>
                </div>
                <div className = "transition-all duration-300 py-3 lg:p-4 pb-6">
                    <div className="bg-gradient-primary p-2px">
                        <input className="block w-full outline-none resize-none px-4 py-2 focus:outline-none bg-bg text-color-default" type="text" name="name" placeholder="Your Name" />
                    </div>
                </div>
                <div className = "transition-all duration-300 py-3 lg:p-4 pb-6">
                    <div className="bg-gradient-primary p-2px">
                        <textarea className="block w-full outline-none resize-none px-4 py-2 focus:outline-none bg-bg text-color-default" name="message" placeholder="Your Message" />
                    </div>
                </div>
                <div className = "py-3 lg:p-4">
                          <Button
                    type="button,submit"
                    title="Send Message"
                    
                /> 
                </div>
          </form>
        </div>
      </div>  
    

     
    );
  };

const Description: React.FC<{ data: ContactQuery_site_siteMetadata_contact }> = ({ data }) => {
    return (
        <div className="center">
            <p className="text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">Connect with me on social media</p>
         <SocialLinks />
          
        </div>
    )
}


type FormMessageProps = { show: boolean, type: string, message: string }
const FormMessage: React.FC<FormMessageProps> = ({ show, type, message }) => {
    if (!show) return null
    return <p className={`text-${type} my-2`}>{message}</p>
}

export { Form, Description }
