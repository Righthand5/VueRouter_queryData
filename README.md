# VueRouter_queryData 关于路由完成之前获取数据还是路由完成之后完成数据
## 本文有两个分支
``` git
  git checkout main //切换导航完成后获取数据
  git checkout beforeRouterQueryData //切换导航完成前获取数据
```
1. main：导航完成后获取数据（有loading的效果）  
2. beforeRouterQuery：导航完成前获取数据（没有loading的效果）  
## 核心代码解析（导航完成后获取数据）
模拟后台传来的数据
``` javascript
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
```
前端代码
```javascript
const Home = {
    template: '<div>' +
                '<router-link to="/post/11">this is first</router-link>' + //跳转的连接id：11
                '<br/>' +
                '<router-link to="/post/12">this is Sconed</router-link>' + //跳转的连接id：12
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
            getPost(this.$route.params.id, (err, post) => { //第一个参数获取路由的id，第二个参数是一个回调函数
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
```
