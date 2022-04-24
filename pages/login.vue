<template>
  <div class="login">
    <h2 class="auth-title">ログイン</h2>
      <input v-model="email" type="email" required placeholder="メールアドレス" class="auth-input"><br>
      <input v-model="password" type="password" required placeholder="パスワード" class="auth-input last"><br>
      <p v-if="error" class="errors">{{ error }}</p>
    <button @click="login" class="button auth-button">ログイン</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  layout: "header",
  data() {
    return {
      email: null,
      password: null,
      error: null,
    }
  },
  methods: {
    async login() {
      if(!this.email  || !this.password ) {
        this.error =  "メールアドレス・パスワードは入力必須です。";
        return
      }
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.error = 'メールアドレスまたはパスワードが違います'
          return
        })
    },
  },
}
</script>