<template>
  <form method="post" class="post-form" @submit.prevent="handleSubmit()">
    <div class="post-form-label"><label for="">シェア</label></div>
    <textarea name="text" id="text" cols="37" rows="6" v-model="text"></textarea>
    <p v-if="postError" class="errors">{{ postError }}</p>
    <button class="button" type="submit">シェアする</button>
  </form>
</template>

<script>
export default {
  props: {
    postError: {
      type:String
    }
  },
  data() {
    return {
      text: null,
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.text); 
      if (this.text !== null && this.text.length <= 120) {
        this.text = "";
      }
    },
  },
};
</script>