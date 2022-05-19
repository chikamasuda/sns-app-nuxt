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
      <form method="post" class="post-form" @submit.prevent="insertPost(text)">
        <div class="post-form-label"><label for="">シェア</label></div>
        <textarea name="text" id="text" cols="37" rows="6" v-model="text"></textarea>
        <p v-if="postError" class="errors">{{ postError }}</p>
        <button class="button" type="submit">シェアする</button>
      </form>
    </div>
    <section class="post-list">
      <h2 class="post-title">ホーム</h2>
      <ul>
        <li class="post-list-item" v-for="post in postLists" :key="post.id">
          <div class="user-info" v-if="user">
            <p class="user-name">{{ post.users.name }}</p>
            <div v-if="post['likes'].find((item) => item.uid === user.uid)">
              <font-awesome-layers class="fa">
                <font-awesome-icon icon="heart" class="heart red-text" @click="unlike(post.id)"/>
              </font-awesome-layers>
              <span class="number">{{ post['likes'].length }}</span>
            </div>
            <div v-if="!post['likes'].find((item) => item.uid === user.uid)">
              <font-awesome-layers class="fa">
                <font-awesome-icon icon="heart" class="heart" @click="like(post.id)"/>
              </font-awesome-layers>
              <span class="number">{{ post['likes'].length }}</span>
            </div>
            <span @click="deletePost(post.id)">
              <img src="img/cross.png" alt="削除" width="25" class="cross" v-if="user.uid === post.users.uid">
            </span>
            <span @click="toShow(post.id)">
              <img src="img/detail.png" alt="ページ遷移" width="25" class="arrow">
            </span>
          </div>
          <p class="content">{{ post.text }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      postLists: [],
      text: null,
      number: 0,
      postError: null,
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
      await this.$axios.delete("/api/posts/" + id);
      this.getPostList();
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
      this.getPostList();
    },
    async unlike(id) {
      const sendData = {
        uid: this.user.uid,
      };
      await this.$axios.post("/api/posts/" + id + "/unlike", sendData);
      this.getPostList();
    },
    toShow(id) {
      this.$router.push(`/posts/${id}`)
    }
  },
  created() {
    this.getPostList();
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