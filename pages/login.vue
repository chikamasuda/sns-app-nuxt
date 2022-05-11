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
      uid: null,
    }
  },
  methods: {
    async login() {
      if(!this.email  || !this.password ) {
        this.error =  "メールアドレス・パスワードは入力必須です。";
        return
      }
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
            console.log('ログイン成功');
            this.$router.push('/');
        })
        .catch((error) => {
          switch (error.code) {
          case 'auth/invalid-email':
            this.error = 'メールアドレスの形式が違います。';
            break
          case 'auth/user-disabled':
            this.error = 'ユーザーが無効になっています。';
            break
          case 'auth/user-not-found':
            this.error = 'ユーザーが存在しません。';
            break
          case 'auth/wrong-password':
            this.error = 'パスワードが間違っております。';
            break
          default :
            this.error ="エラーが起きました。しばらくしてから再度お試しください。"
            break
          }
        })
    },
  },
}
</script>