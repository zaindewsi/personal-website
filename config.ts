const siteMetadata = {
    title: `Zain Dewsi`,
    siteUrl: `http://localhost`,
    capitalizeTitleOnHome: false,
    logo: `/images/zain bitmoji.png`,
    icon: `/images/zain bitmoji.png`,
    titleImage: ``,
    ogImage: `/images/googleimage.png`,
    twoColumnWall: false,
    cookiePolicy: true,
    introTag: `Full-Stack Software Developer`,
    about:
        "I am a full-stack software developer based in Toronto with a background in digital marketing. I have always been a logical thinker that loves to solve problems in the most creative way possible. I will be keeping track of my development journey and sharing some of my favourite projects along the way so make sure to check out the projects and stay connected on social media!",
    author: `Zain Dewsi`,
    projectsItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "About",
            url: "/about",
        },
        {
            name: "Projects",
            url: "/projects",
        },
        {
            name: "Contact",
            url: "/contact",
        },
    ],
    footerLinks: [
        {
            name: "GitHub",
            url: "https://github.com/zaindewsi",
        },
    ],
    social: [
        {
            name: "LinkedIn",
            icon: "/images/linked.png",
            url: "https://linkedin.com/in/zaindewsi",
        },
        {
            name: "GitHub",
            icon: "/images/git.png",
            url: "https://github.com/zaindewsi",
        },
        {
            name: "Instagram",
            icon: "/images/insta.png",
            url: "https://instagram.com/zaindewsi",
        },
        {
            name: "Youtube",
            icon: "/images/yt.png",
            url: "https://youtube.com/user/zaindewsi",
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "https://getform.io/f/350fb589-5835-422c-9e74-fed2938f89dc",
        description: true,
        mail: true,
        phone: true,
        address: true,
    },
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Enter a name",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Enter a valid email address",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false,
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
