<template>
  <main class="container" dark>
    <div class="sidebar">
      <h1 class="logo">
        <img src="/img/logo.png" alt="ロゴ" width="100">
      </h1>
      <nav>
        <ul>
          <li class="side-menu">
            <NuxtLink to="/" class="sidebar-menu-item">
              <img src="/img/home.png" alt="" width="25">
              <span class="sidemenu-text">ホーム</span>
            </NuxtLink>
          </li>
          <li class="side-menu" @click="logout">
            <img src="/img/logout.png" alt="" width="25">
            <span class="sidemenu-text">ログアウト</span>
          </li>
        </ul>
      </nav>
      <form method="post" class="post-form" @submit.prevent="insertPost()">
        <div class="post-form-label"><label for="">シェア</label></div>
        <textarea name="text" id="text" cols="37" rows="6" v-model="text"></textarea>
        <p v-if="postError" class="errors">{{ postError }}</p>
        <button class="button" type="submit">シェアする</button>
      </form>
    </div>
    <section class="section">
      <div class="comment-area">
        <h2 class="comment-title">コメント</h2>
          <div class="post-list-item">
            <div class="user-info" v-if="user">
              <p class="user-name" v-if="post.users">{{ post.users.name }}</p>
              <div v-if="likes.find((item) => item.uid === user.uid)">
                <font-awesome-layers class="fa">
                  <font-awesome-icon icon="heart" class="heart red-text" @click="unlike(post.id)"/>
                </font-awesome-layers>
                <span class="number">{{ likes.length }}</span>
              </div>
              <div v-if="!likes.find((item) => item.uid === user.uid)">
                <font-awesome-layers class="fa">
                  <font-awesome-icon icon="heart" class="heart" @click="like(post.id)"/>
                </font-awesome-layers>
                <span class="number">{{ likes.length }}</span>
              </div>
              <span @click="deletePost(post.id)">
                <img src="/img/cross.png" alt="削除" width="25" class="cross" v-if="user.uid === post.users.uid">
              </span>
            </div>
            <p class="content">{{ post.text }}</p>
          </div>
        <h3 class="comment-list-title">コメント</h3>
          <ul class="comment-list-item" v-for="comment in comments" :key="comment.id">
            <li>
              <p class="comment-name">{{ comment.users.name }}</p>
              <p class="comment-text">{{ comment.comment }}</p>
            </li>
          </ul>
      </div>
      <form method="post" class="comment-form" @submit.prevent="insertComment()">
        <textarea name="text" id="text" rows="2" v-model="comment"></textarea>
        <p v-if="commentError" class="errors">{{ commentError }}</p>
        <button class="button btn-padding" type="submit">コメント</button>
      </form>
    </section>  
  </main>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      post: {},
      postList: [],
      likes: [],
      comments: [],
      comment: "",
      text: "",
      number: 0,
      postError: "",
      commentError: "",
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.currentUser;
    },
  },
  methods: {
    async logout() {
      await firebase
        .auth()
        .signOut()
        .then((data) => {
          this.$router.push('/login');  
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getPostList() {
      const resData = await this.$axios.get("/api/posts");
      this.postLists = resData.data.data;
    },
    async deletePost(id) {
      await this.$axios.delete("/api/posts/" + id)
      .then((data) => {
        this.getPostList();
        this.$router.push('/posts');
      })
      .catch((error) => {
        console.log(error);
      })
    },
    async insertPost() {
      const sendData = {
        text: this.text,
        uid: this.user.uid,
      };
      await this.$axios.post("/api/posts", sendData)
      .then((data) => {
        this.getPostList();
        this.text = "";
        this.postError = '';
      })
      .catch((error) => {
        this.postError = error.response.data.data.errors['text'][0];
      })
    },
    async like(id) {
      const sendData = {
        uid: this.user.uid,
      };
      await this.$axios.post("/api/posts/" + id + "/like", sendData);
      this.getPost();
    },
    async unlike(id) {
      const sendData = {
        uid: this.user.uid,
      };
      await this.$axios.post("/api/posts/" + id + "/unlike", sendData);
      this.getPost();
    },
    async getPost() {
      const url = `/api/posts/${this.$route.params.id}`
      await this.$axios.get(url)
        .then((response) => {
          console.log(response.data.post[0])
          this.post = response.data.post[0]
          this.likes = response.data.post[0]['likes']
        })
        .catch((error) => {
          this.$router.push('/posts')
        })
    },
    async getComments() {
      const url = `/api/posts/${this.$route.params.id}/comments`
      await this.$axios.get(url)
        .then((response) => {
          this.comments = response.data.comments
        })
        .catch((error) => {
          this.$router.push('/posts')
        })
    },
    async insertComment() {
      const url = `/api/posts/${this.$route.params.id}/comments`
      const sendData = {
        comment: this.comment,
        uid: this.user.uid,
      };
      await this.$axios.post(url, sendData)
      .then((data) => {
        this.getComments();
        this.comment = "";
        this.commentError = '';
      })
      .catch((error) => {
        this.commentError = error.response.data.data.errors[''][0];
      })
    },
  },
  created() {
    this.getPostList();
    this.getPost();
    this.getComments();
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const uid = user.uid
        this.$store.dispatch("auth/setUser", { uid })
      } else {
        this.$store.dispatch("auth/setUser", null)
        this.$router.push('/login')
      }
    })
  },
}
</script>
