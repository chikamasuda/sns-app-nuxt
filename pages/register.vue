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
      uid: "",
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
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          this.error = (code => {
            switch (code) {
              case 'auth/invalid-email':
                return "メールアドレスの形式が違います。"
              case "auth/email-already-in-use":
                return "既にそのメールアドレスは使われています";
              case "auth/wrong-password":
                return "※パスワードが正しくありません";
              case "auth/weak-password":
                return "※パスワードは最低6文字以上にしてください";
              default:
                return "※メールアドレスとパスワードをご確認ください";
            }
          })(error.code);
        });
        const user = {
              email: res.user.email,
              name: this.name,
              uid: res.user.uid
            };
            console.log(user);

            // CSRF保護の初期化とXSRF-TOKENクッキーの取得
            this.$axios.get('/sanctum/csrf-cookie');

            // Laravelにユーザー情報を送信する。
            this.$axios.post('/api/register', user)
            .catch(err => {
                console.log({
                  err
                });
            });
          this.$router.push("/");
    }
  }
};
</script>

