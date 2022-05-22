<template>
  <main class="container" dark>
    <div class="sidebar">
      <SideMenu />
      <PostForm @submit="insertPost" v-bind:postError="postError"></PostForm>
    </div>
    <section class="post-list">
      <h2 class="post-title">ホーム</h2>
      <ul>
        <li class="" v-for="post in postLists" :key="post.id">
          <Message
              v-if="post"
              :post="post"
              :uid="uid"
              @like="like(post)"
              @unlike="unlike(post)"
              @deletePost="deletePost"
            />
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
      postError: "",
      text: null,
      uid: "",
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
      await this.$axios.delete("/api/posts/" + id);
      this.getPostList();
    },
    async insertPost(text) {
      const sendData = {
        text: text,
        uid: this.uid,
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
    async like(post) {
      const body = {
        post_id: post.id,
        uid: this.uid,
        user_id: post.users.id
      };
      const { data } = await this.$axios.post("/api/likes", body);
      post.likes.push(data.like);
    },
    async unlike(post) {
      const findLike = post.likes.find((like) => like.uid === this.uid);
      console.log(findLike);
      await this.$axios.delete(`/api/likes/${findLike.id}`);

      const findLikeIdx = post.likes.findIndex(
        (like) => like.id === findLike.id
      );
      post.likes.splice(findLikeIdx, 1);
    },
    fetchData() {
      firebase.auth().onAuthStateChanged(async (user) => {
        this.uid = user.uid;
        await this.getPostList();
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>