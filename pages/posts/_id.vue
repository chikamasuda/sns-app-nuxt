<template>
  <main class="container" dark>
    <div class="sidebar">
      <SideMenu />
      <PostForm @submit="insertPost" v-bind:postError="postError"/>
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
              <span @click="deletePost(post.id)" v-if="post.users">
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
  middleware: 'authenticated',
  data() {
    return {
      post: {},
      postList: [],
      likes: [],
      uid: "",
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
    async getPostList() {
      const resData = await this.$axios.get("/api/posts");
      this.postLists = resData.data.data;
    },
    async deletePost(id) {
      await this.$axios.delete("/api/posts/" + id)
      .then((data) => {
        this.getPostList();
        this.$router.push('/');
      })
      .catch((error) => {
        console.log(error);
      })
    },
    async insertPost(text) {
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
      const url = `/api/posts/${this.$route.params.id}`;
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
      const url = `/api/posts/${this.$route.params.id}/comments`;
      await this.$axios.get(url)
        .then((response) => {
          this.comments = response.data.comments
        })
        .catch((error) => {
          this.$router.push('/posts')
        })
    },
    async insertComment() {
      const url = `/api/posts/${this.$route.params.id}/comments`;
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
        this.commentError = error.response.data.data.errors['comment'][0];
      })
    },
  },
  created() {
    this.getPost();
    this.getComments();
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
};
</script>
