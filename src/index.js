/**
 * 从服务器获取Post文章的API
 * @param id
 * @param callback
 */
function getPost(id,callback){
    const err = null;
    const postDB = {
        '11':{
            title: "thank for you Mr.ShanDi1!",
            body:'you are great1!'
        },
        '12':{
            title: "thank for you Mr.ShanDi2!",
            body:'you are great2!'
        }
    }
    const post = {
        id:id,
        ...postDB["" + id]
    }
    setTimeout(()=>{
        callback(err,post)
    },1000)
}
const Home = {
    template: '<div>' +
                '<router-link to="/post/11">this is first</router-link>' +
                '<br/>' +
                '<router-link to="/post/12">this is Sconed</router-link>' +
             '</div>'
}

const Post = {
    data () {
        return {
            post: null,
            error: null
        }
    },
    beforeRouteEnter (to, from, next) {
        getPost(to.params.id, (err, post) => {
            next(vm => vm.setData(err, post))
        })
    },
    beforeRouteUpdate (to, from, next) {
        this.post = null
        getPost(to.params.id, (err, post) => {
            this.setData(err, post)
            next()
        })
    },
    methods:{
        setData (err, post) {
            if (err) {
                this.error = err.toString()
            } else {
                this.post = post
            }
        }
    },
    template:' <div class="post">\n' +
        '<router-link to="/">Home</router-link>' +
        '    <div v-if="loading" class="loading">\n' +
        '      Loading...\n' +
        '    </div>\n' +
        '\n' +
        '    <div v-if="error" class="error">\n' +
        '      {{ error }}\n' +
        '    </div>\n' +
        '\n' +
        '    <div v-if="post" class="content">\n' +
        '      <h2>id is {{post.id}}, main :{{ post.title }}</h2>\n' +
        '      <p>{{ post.body }}</p>\n' +
        '    </div>\n' +
        '  </div>'
}
const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Home,
        },
        {
            path:'/post/:id',
            component:Post,
        }
    ]
})

new Vue({
    el:'#app',
    router
})
