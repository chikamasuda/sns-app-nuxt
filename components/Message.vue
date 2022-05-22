<template>
  <div class="message">
    <div class="flex" v-if="post.users">
      <p class="name">{{ post.users.name }}</p>
      <font-awesome-layers class="fa icon" @click="handleToggleLike">
        <font-awesome-icon icon="heart" class="icon" :class="{'red-text': this.isLiked()}"></font-awesome-icon>
      </font-awesome-layers>
      <p class="number" v-if="post.likes">{{ post.likes.length }}</p>
      <img class="icon" v-if="uid === post.users.uid" src="/img/cross.png" @click="emitDeletePost" />
      <img
        class="icon detail"
        src="/img/detail.png"
        @click="goPostDetail"
        v-if="$route.name === 'index'"
      />
    </div>
    <p class="text">{{ post.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    uid: String,
  },
  methods: {
    async handleToggleLike() {
      if (this.isLiked()) {
        this.$emit("unlike");
      } else {
        this.$emit("like");
      }
    },
    isLiked() {
      const userIds = this.post.likes.map((like) => like.uid);
      return userIds.includes(this.uid);
    },
    emitDeletePost() {
      this.$emit("deletePost", this.post.id);
    },
    goPostDetail() {
      this.$router.push({
        path: `/posts/${this.post.id}`,
        params: { id: this.post.id },
      });
    },
  },
};
</script>

<style scoped>
.icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>