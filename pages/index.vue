<template>
  <main class="container" dark>
    <div class="sidebar">
      <SideMenu />
      <PostForm @submit="insertPost"/>
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
  middleware: 'authenticated',
  data() {
    return {
      postLists: [],
      text: null,
      number: 0,
    }
  },
  props: ["postError"], 
  computed: {
    user() {
      return this.$store.state.auth.currentUser;
    },
  },
  methods: {
    async getPostList() {
      const resData = await this.$axios.get("/api/posts");
      this.postLists = resData.data.data;
    },
    async deletePost(id) {
      await this.$axios.delete("/api/posts/" + id);
      this.getPostList();
    },
    async insertPost(text, postError) {
      const sendData = {
        text: text,
        uid: this.user.uid,
      };
      await this.$axios.post("/api/posts", sendData)
      .then((data) => {
        this.getPostList();
        this.text = "";
        this.postError = '';
      })
      .catch((error) => {
        postError = error.response.data.data.errors['text'][0];
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
    async toShow(id) {
      await this.$router.push(`/posts/${id}`)
    },
  },
  created() {
    this.getPostList();
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const uid = user.uid
        this.$store.dispatch("auth/setUser", { uid })
      } else {
        this.$store.dispatch("auth/setUser", null)
      }
    })
  },
}
</script>