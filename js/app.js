document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = "https://jsonplaceholder.typicode.com"

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
            el.setAttribute(options.attrs.moreAttrs.nameAttr, options.attrs.moreAttrs.valueAttr)
        }
        target.appendChild(el)
        return el
    }

    let divUsers = document.getElementById("users")
    let divPosts = document.getElementById("posts")

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

                    document.getElementById("posts").innerHTML = ""

                    fetch(`${BASE_URL}/users/${user.id}/posts/`)
                        .then(response => response.json())
                        .then(data => posts(data, divPosts, user.name))
                        .catch(err => console.log(err))

                })
                
            }
        }

        const posts = (datas,divPosts, name) => {
            console.log(name)
            for (let post of datas){
                const media = newElement("article", divPosts, {attrs:{"class":"media",} })

                const mediaFigure = newElement("figure", media, {attrs:{"class": "media-left"}})
                const pInFigure = newElement("p", mediaFigure, {attrs:{"class": "image is-48x48"}})
                    newElement("img", pInFigure, {attrs:{moreAttrs:{nameAttr:"src", valueAttr:"https://bulma.io/images/placeholders/128x128.png"}}})

                const mediaContent = newElement("div", media, { attrs:{"class": "media-content"}})
                const contentInMediaContent = newElement("div", mediaContent, {attrs:{"class":"content"}})
                const pInMedia = newElement("p", contentInMediaContent, {attrs:{}, data: `<strong class="has-text-link">${name}</strong> </br> ${post.body} </br> `})
                
                const viewComments = newElement("a", pInMedia, {attrs:{"class": "button is-text"}, data: "View comments  </br> </br>"})

                const more = viewComments

                viewComments.addEventListener("click", () => {
                    viewComments.setAttribute("class", 'button is-text is-loading')
                    fetch(`${BASE_URL}/users/${post.id}/comments/`)
                        .then(response => response.json())
                        .then(data => coms(data, pInMedia, post.id, viewComments))
                        .catch(err => console.log(err))
                }, {once: true})
            }

        }

        const coms = (datas, target, id, buttonMore) => {
            buttonMore.classList.remove('is-loading')
            for (let com of datas){
                if(com.postId === id){
                    const comment = newElement('article', target, {attrs:{"class": `media toggle_${com.postId}`}})
                    const commentMediaLeft = newElement("figure", comment, { attrs:{"class": "media-left"}})
                    const pInMediaLeft = newElement("div", commentMediaLeft, { attrs:{"class": "image is-48x48"}})
                        newElement("img", pInMediaLeft, {attrs:{moreAttrs:{a:"src", b:"https://bulma.io/images/placeholders/128x128.png"}}})

                    const commentMediaContent = newElement("div", comment, { attrs:{"class": "media-content"}})
                    const contentInMediaContent = newElement("div", commentMediaContent, {attrs:{"class": "content"}})
                        newElement("p", contentInMediaContent, {attrs:{}, data: `
                        <strong class="has-text-link">${com.name}</strong> <span class="has-text-link">${com.email}</span> </br>
                        ${com.body}
                        `})

                        buttonMore.addEventListener('click', () => {
                                let articles = document.getElementsByClassName(`toggle_${com.postId}`)
                                for (let article of articles){
                                    article.classList.toggle('is-hidden');
                                }
                        })

                }
            }


        }

    } 

    main(divUsers, divPosts);

})