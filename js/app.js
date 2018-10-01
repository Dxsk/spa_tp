document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = "https://jsonplaceholder.typicode.com"

    const newEl = (balise, target, options = {}) => {
        const opts = options.attrs
        let el;
        if(options.attrs.link){
            el = document.createElement("a")
            // el.href = options.attrs.link
            // el.setAttribute("target", "_blank")
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
    let divComs = document.getElementById("coms")

    fetch(`${BASE_URL}/users/`)
                .then(Response => Response.json())
                .then(data => users(data))
                .catch(err => console.log(err))

    const users = (datas) => {
        for (let i of datas){

            newEl("div", divUsers, {attrs:
                {"id": i.id, "class": "column is-one-quarter is-size-6 has-text-centered"}, data: `[${i.id}]  `
            })

            linkOneUser = newEl("a", document.getElementById(i.id),
                {attrs:{ /*"link": `${BASE_URL}/users/${i.id}`,*/"id": i.username, "class": "more" }, data: `${i.name} ${i.username}`}
            )

            linkOneUser.addEventListener("click", () => {
                document.getElementById("posts").innerHTML = ""

                fetch(`${BASE_URL}/users/${i.id}/posts/`)
                    .then(Response => Response.json())
                    .then(data => posts(data, divPosts, i.id, i.name))
                    .catch(err => console.log(err))

            })
            
        }
    }

    // <article class="media">
        //   <figure class="media-left">
        //     <p class="image is-48x48">
        //     <img src="https://bulma.io/images/placeholders/128x128.png"></img>
        //     </p>
        //   </figure>
        //   <div class="media-content">
            //     <div class="content">
            //       <p>
            //         <strong>Barbara Middleton</strong>
            //         <br>
            //          body
            //       </p>
            //     </div>
        //     //////////// coms
        //     </div>
    //   </div>
    // </article>
    
    // posts
    const posts = (data, target, id, name) => {
            for (let i of data){
                const media = newEl("article", divPosts, {attrs:{"class":"media",} })

                const mediaFigure = newEl("figure", media, {attrs:{"class": "media-left"}})
                const pInFigure = newEl("p", mediaFigure, {attrs:{"class": "image is-48x48"}})
                    newEl("img", pInFigure, {attrs:{moreAttrs:{a:"src", b:"https://bulma.io/images/placeholders/128x128.png"}}})

                const mediaContent = newEl("div", media, { attrs:{"class": "media-content"}})
                const contentInMediaContent = newEl("div", mediaContent, {attrs:{"class":"content"}})
                const pInMedia = newEl("p", contentInMediaContent, {attrs:{}, data: `<strong>${name}</strong> </br> ${i.body} </br> `})
                
                const viewComments = newEl("a", pInMedia, {attrs:{"class": "more"}, data: "View comments  </br> </br>"})
                viewComments.addEventListener("click", (el) => {
                    fetch(`${BASE_URL}/users/${i.id}/comments/`)
                        .then(Response => Response.json())
                        .then(data => coms(data, pInMedia, i.id))
                        .catch(err => console.log(err))
                })
            }

    }

    // coms

    // <article class="media">
    //     <figure class="media-left">
    //         <p class="image is-48x48">
    //         </p>
    //     </figure>
    //     <div class="media-content">
    //         <div class="content">
    //         <p>
    //             <strong>Sean Brown</strong>
    //             <br>
    //             Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
    //         </p>
    //         </div>
    //     </div>
    // </article>

    // {url}/posts/{id_user}/comments
    const coms = (data, target, id) => {
        for (let i of data){
            if(i.postId === id){
                const comment = newEl('article', target, {attrs:{"class": "media"}})
                const commentMediaLeft = newEl("figure", comment, { attrs:{"class": "media-left"}})
                const pInMediaLeft = newEl("div", commentMediaLeft, { attrs:{"class": "image is-48x48"}})
                     newEl("img", pInMediaLeft, {attrs:{moreAttrs:{a:"src", b:"https://bulma.io/images/placeholders/128x128.png"}}})

                const commentMediaContent = newEl("div", comment, { attrs:{"class": "media-content"}})
                const contentInMediaContent = newEl("div", commentMediaContent, {attrs:{"class": "content"}})
                    newEl("p", contentInMediaContent, {attrs:{}, data: `
                    <strong>${i.name}</strong> <strong>${i.email}</strong> </br>
                    ${i.body}
                    `})

            }
        }
    }

})