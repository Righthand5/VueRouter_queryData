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
    data(){
        return{
            loading:false,
            error:null,
            post:null
        }
    },
    created(){
        this.fetchData() //与服务器进行通讯
    },
    methods:{
        fetchData(){
            this.error = this.post = null;
            this.loading = true; //打开loading显示
            getPost(this.$route.params.id, (err, post) => {
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.post = post
                }
            })
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
