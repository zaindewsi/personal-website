import React, { useState } from "react"
import { Send, Mail, Phone, MapPin, Loader } from "react-feather"
import axios from "axios";

import { TextInput, Button } from "./ui"

import { beforeContactFormSubmit, contactFormSubmit } from "../../config"

import SocialLinks from "../utils/sociallinks"
import { ContactQuery_site_siteMetadata_contact } from "../pages/__generated__/ContactQuery"

const Form = () => {
    
    const [serverState, setServerState] = useState({
      submitting: false,
      status: null
    });
    const handleServerResponse = (ok, msg, form) => {
      setServerState({
        submitting: false,
        status: { ok, msg }
      });
      if (ok) {
        form.reset();
      }
    };
    const handleOnSubmit = e => {
      e.preventDefault();
      const form = e.target;
      setServerState({ submitting: true, status });
      axios({
        method: "post",
        url: "https://getform.io/f/350fb589-5835-422c-9e74-fed2938f89dc",
        data: new FormData(form)
      })
        .then(r => {
          handleServerResponse(true, "Thanks!", form);
        })
        .catch(r => {
          handleServerResponse(false, r.response.data.error, form);
        });
    };
    return (
        
    
    <div>
         <div className="col-md-8 mt-5">
            <form onSubmit={handleOnSubmit}>
                <div className = "transition-all duration-300 py-3 lg:p-4 pb-6">
                    <div className="bg-gradient-primary p-2px">
                        <input className="block w-full outline-none px-4 py-2 focus:outline-none bg-bg text-color-default" type="email" name="email" placeholder="Your Email" />
                    </div>
                </div>
                <div className = "transition-all duration-300 py-3 lg:p-4 pb-6">
                    <div className="bg-gradient-primary p-2px">
                        <input className="block w-full outline-none px-4 py-2 bg-bg text-color-default block w-full outline-none resize-none px-4 py-2 focus:outline-none bg-bg text-color-default" type="text" name="name" placeholder="Your Name" />
                    </div>
                </div>
                <div className = "transition-all duration-300 py-3 lg:p-4 pb-6">
                    <div className="bg-gradient-primary p-2px">
                        <input className="block w-full outline-none resize-none px-4 py-2 focus:outline-none bg-bg text-color-default" type="text" name="message" placeholder="Your Message" />
                    </div>
                </div>
                <div className = "py-3 lg:p-4">
                            <Button
                    type="button,submit"
                    title="Send"
                    iconRight={<IconRight />}
                />
                </div>
          </form>
        </div>
      </div>  
    

     
    );
  };

const Description: React.FC<{ data: ContactQuery_site_siteMetadata_contact }> = ({ data }) => {
    return (
        <div>
            <p className="text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">Connect with me on social media</p>
            <ul className="my-4">
                <li>
                    <SocialLinks />
                </li>
            </ul>
        </div>
    )
}

const IconRight = ({ spin = false }) => {
    if(spin) {
        return (
            <span className="spin" style={{
                display: "inline-block",
                verticalAlign: "middle",
                animationDuration: "5s"
            }}>
                <Loader />
            </span>
        )
    }
    return <Send />
}

type FormMessageProps = { show: boolean, type: string, message: string }
const FormMessage: React.FC<FormMessageProps> = ({ show, type, message }) => {
    if (!show) return null
    return <p className={`text-${type} my-2`}>{message}</p>
}

export { Form, Description }
