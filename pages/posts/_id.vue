<template>
  <main class="container" dark>
    <div class="sidebar">
      <SideMenu />
      <PostForm @submit="insertPost" v-bind:postError="postError"/>
    </div>
    <section class="section" v-if="post">
      <div class="comment-area">
        <h2 class="comment-title">コメント</h2>
          <Message
              v-if="post"
              :post="post"
              :uid="uid"
              @like="like"
              @unlike="unlike"
              @deletePost="deletePost"
            />
        <h3 class="comment-list-title">コメント</h3>
          <ul class="comment-list-item" v-for="comment in post.comments" :key="comment.id">
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
      uid: "",
      comments: [],
      comment: "",
      text: "",
      postError: "",
      commentError: "",
    }
  },
  methods: {
    async deletePost(id) {
      await this.$axios.delete("/api/posts/" + id)
      .then((data) => {
        this.$router.push('/');
      })
      .catch((error) => {
        console.log(error);
      })
    },
    async insertPost(text) {
      const sendData = {
        text: text,
        uid: this.uid,
      };
      await this.$axios.post("/api/posts", sendData)
      .then((data) => {
        this.text = "";
        this.postError = '';
      })
      .catch((error) => {
        this.postError = error.response.data.data.errors['text'][0];
      })
    },
    async like() {
      const body = {
        post_id: this.post.id,
        uid: this.uid,
        user_id: this.post.users.id
      };
      const { data } = await this.$axios.post("/api/likes", body);
      this.post.likes.push(data.like);
    },
    async unlike() {
      const findLike = this.post.likes.find(
        (like) => like.uid === this.uid
      );
      await this.$axios.delete(`/api/likes/${findLike.id}`);
      const findLikeIdx = this.post.likes.findIndex(
        (like) => like.id === findLike.id
      );
      this.post.likes.splice(findLikeIdx, 1);
    },
  
    async getPost() {
      const url = `/api/posts/${this.$route.params.id}`;
      await this.$axios.get(url)
        .then((response) => {
          this.post = response.data.post;
          this.comments = response.data.post.comments;
        })
        .catch((error) => {
          this.$router.push('/');
        })
    },
    async insertComment() {
      const url = `/api/posts/${this.$route.params.id}/comments`;
      const sendData = {
        comment: this.comment,
        uid: this.uid,
      };
      await this.$axios.post(url, sendData)
      .then((data) => {
        this.getPost();
        this.comment = "";
        this.commentError = '';
      })
      .catch((error) => {
        this.commentError = error.response.data.data.errors['comment'][0];
      })
    },
    fetchData() {
      firebase.auth().onAuthStateChanged(async (user) => {
        this.uid = user.uid;
        await this.getPost();
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
