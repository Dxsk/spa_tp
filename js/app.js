document.addEventListener('DOMContentLoaded', () => {

    const newEl = (balise, target, options = {}) => {
        const opts = options.attrs
        const el = document.createElement(balise)
        if(options.data){
            el.innerHTML = options.data
        } 
        el.setAttribute("id", opts.id)
        el.setAttribute("class", opts.class)
        target.appendChild(el)
        return el
    }

    let divUsers = document.getElementById("users")
    let divPosts = document.getElementById("posts")
    let divComs = document.getElementById("coms")

    fetch("https://jsonplaceholder.typicode.com/users/")
                .then(Response => Response.json())
                .then(data => users(data))
                .catch(err => console.log(err))

    const users = (datas) => {
        console.log(datas)
        for (let i of datas){
            
            const divTargeted = newEl("div", divUsers, {attrs:
                {"id": i.id, "class": "hidden"}
            })

            const divOneUser = newEl("div", document.getElementById(i.id),
                {attrs:{ "id": i.username, "class": "hidden" }, data: `${i.name} ${i.username}`}
            )

            const btnUser = newEl("button", divOneUser, {
                attrs:{
                    "id": i.id,
                    "class": "btn"
                }, data: "Voir plus"
            })
            
        }
    }

    const btnMore = () => {
        const btn = 
        document.addEventListener('click', () => {

        })
    }

})