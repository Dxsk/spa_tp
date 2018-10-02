document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = "https://jsonplaceholder.typicode.com"

    // constructor new element html
    const newElement = (balise, target, options = {}) => {
        const opts = options.attrs
        let el;
        if(options.attrs.link){
            el = document.createElement("a")
            el.href = options.attrs.link
        } else {
            el = document.createElement(balise)
        }
        if(options.data){
            el.innerHTML = options.data
        } 
        if(options.attrs.id){
            el.setAttribute("id", opts.id)
        }
        if(options.attrs.class){
            el.setAttribute("class", opts.class)
        } 
        if(options.attrs.moreAttrs){
            el.setAttribute(options.attrs.moreAttrs.a, options.attrs.moreAttrs.b)
        }
        target.appendChild(el)
        return el
    }

    let divUsers = document.getElementById("users")
    let divPosts = document.getElementById("posts")

    // main
    const main = (divUsers, divPosts) => {
        fetch(`${BASE_URL}/users/`)
                .then(response => response.json())
                .then(data => users(data))
                .catch(err => console.log(err))

        const users = (datas) => {
            for (let user of datas){

                newElement("div", divUsers, {attrs:
                    {"id": user.id, "class": "column is-one-quarter is-size-6 has-text-centered"}, data: `[${user.id}]  `
                })

                linkOneUser = newElement("a", document.getElementById(user.id),
                    {attrs:{"link":"#" ,"id": user.username,"class": "more"}, data:`${user.name} ${user.username}`}
                )

                linkOneUser.addEventListener("click", () => {

                    // Reset post if other click
                    document.getElementById("posts").innerHTML = ""

                    // Listener
                    fetch(`${BASE_URL}/users/${user.id}/posts/`)
                        .then(response => response.json())
                        .then(data => posts(data, divPosts, user.id, user.name))
                        .catch(err => console.log(err))

                })
                
            }
        }

        // posts
        const posts = (datas, target, id, name) => {
            for (let post of datas){
                const media = newElement("article", divPosts, {attrs:{"class":"media",} })

                const mediaFigure = newElement("figure", media, {attrs:{"class": "media-left"}})
                const pInFigure = newElement("p", mediaFigure, {attrs:{"class": "image is-48x48"}})
                    newElement("img", pInFigure, {attrs:{moreAttrs:{a:"src", b:"https://bulma.io/images/placeholders/128x128.png"}}})

                const mediaContent = newElement("div", media, { attrs:{"class": "media-content"}})
                const contentInMediaContent = newElement("div", mediaContent, {attrs:{"class":"content"}})
                const pInMedia = newElement("p", contentInMediaContent, {attrs:{}, data: `<strong class="has-text-link">${name}</strong> </br> ${post.body} </br> `})
                
                const viewComments = newElement("a", pInMedia, {attrs:{"class": "more"}, data: "View comments  </br> </br>"})


                // Listener
                viewComments.addEventListener("click", (el) => {
                    fetch(`${BASE_URL}/users/${post.id}/comments/`)
                        .then(response => response.json())
                        .then(data => coms(data, pInMedia, post.id))
                        .catch(err => console.log(err))
                }, {once: true})
            }

        }

        // {url}/posts/{id_user}/comments
        const coms = (datas, target, id) => {
            for (let com of datas){
                if(com.postId === id){
                    const comment = newElement('article', target, {attrs:{"class": "media"}})
                    const commentMediaLeft = newElement("figure", comment, { attrs:{"class": "media-left"}})
                    const pInMediaLeft = newElement("div", commentMediaLeft, { attrs:{"class": "image is-48x48"}})
                        newElement("img", pInMediaLeft, {attrs:{moreAttrs:{a:"src", b:"https://bulma.io/images/placeholders/128x128.png"}}})

                    const commentMediaContent = newElement("div", comment, { attrs:{"class": "media-content"}})
                    const contentInMediaContent = newElement("div", commentMediaContent, {attrs:{"class": "content"}})
                        newElement("p", contentInMediaContent, {attrs:{}, data: `
                        <strong class="has-text-link">${com.name}</strong> <span class="has-text-link">${com.email}</span> </br>
                        ${com.body}
                        `})

                }
            }
        }


    } 
    

    // Run main
    main(divUsers, divPosts);


})