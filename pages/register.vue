<template>
  <div class="register">
    <h2 class="auth-title">新規登録</h2>
      <input v-model="name" type="name" placeholder="ユーザーネーム" class="auth-input" required /><br>
      <input v-model="email" type="email" placeholder="メールアドレス" class="auth-input" required /><br>
      <input v-model="password" type="password" placeholder="パスワード" class="auth-input last" required /><br>
      <p v-if="error" class="errors">{{ error }}</p>
    <button @click="register" class="button auth-button">新規登録</button>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  layout: "header",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      if(!this.name || !this.email  || !this.password ) {
        this.error =  "ユーザーネーム・メールアドレス・パスワードは入力必須です。";
        return
      }
      if(this.name.length > 20) {
        this.error =  "ユーザーネームは20文字以下にしてください";
        return
      }
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          const user = {
            email: data.user.email,
            name: this.name,
            uid: data.user.uid
          };

          //Laravelにユーザー情報を送信する。
          this.$axios.post('/api/register', user)
          .then((data) => {
            this.$router.push("/posts");
            console.log('新規登録成功');
          })
          .catch((error) => {
            console.log(error);
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.error = 'メールアドレスの形式が違います。';
              break
            case 'auth/email-already-in-use':
              this.error = 'このメールアドレスはすでに使われています。';
              break
            case 'auth/weak-password':
              this.error = 'パスワードは6文字以上で入力してください。';
              break
            default :
              this.error ="エラーが起きました。しばらくしてから再度お試しください。"
              break
          }
        })
    }
  }
};
</script>

