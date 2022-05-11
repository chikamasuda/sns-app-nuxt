<template>
  <div class="container" dark>
    <div class="sidebar">
      <h1 class="logo">
        <img src="/img/logo.png" alt="ロゴ" width="100">
      </h1>
      <nav>
        <ul>
          <li class="side-menu"><a class="top-menu-item" href="/"><img src="/img/home.png" alt="" width="25">ホーム</a></li>
          <li class="side-menu" @click="logout"><a class="menu-link"><img src="/img/logout.png" alt="" width="25">ログアウト</a></li>
        </ul>
      </nav>
      <form method="post" class="form">
        <div class="form-label"><label for="">シェア</label></div>
        <textarea name="text" id="text" cols="37" rows="6" v-model="newText"></textarea>
        <button class="button" @click="insertPost">シェアする</button>
      </form>
    </div>
    <main class="article">
      <h2 class="article-title">ホーム</h2>
      <ul class="article-list">
        <li class="article-list-item" v-for="post in postLists" :key="post.id">
          <div class="user-info">
            <div class="user-name">{{ post.users.name }}</div>
            <span><img src="img/heart.png" alt="ハート" width="25" class="heart"></span>
            <span>0</span>
            <span @click="deletePost(post.id)" v-if="user">
              <img src="img/cross.png" alt="削除" width="25" class="cross" v-if="user.uid === post.users.uid">
            </span>
            <span><img src="img/detail.png" alt="ページ遷移" width="25" class="arrow"></span>
          </div>
          <p class="content">{{ post.text }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      postLists: [],
      newText: "",
      uid: "",
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
      const resData = await this.$axios.get("/api/post");
      this.postLists = resData.data.data;
    },
    async deletePost(id) {
      await this.$axios.delete("/api/post/" + id);
      this.getPostList();
    },
    async insertPost() {
      const sendData = {
        text: this.newText,
        uid: this.user.uid
      };
      await this.$axios.post("/api/post/", sendData);
      this.getPostList();
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      const uid = user.uid
      this.$store.dispatch("auth/setUser", { uid })
    } else {
      this.$store.dispatch("auth/setUser", null)
      this.$router.push('/admin')
    }
  }),
    this.getPostList();
  },
}
</script>