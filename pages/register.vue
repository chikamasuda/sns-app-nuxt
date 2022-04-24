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
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.push("/");
        })
        .catch(error => {
          switch (error.code) {
            case "auth/invalid-email":
              this.error =  "メールアドレスの形式が違います。";
              return
            case "auth/weak-password":
              this.error = "パスワードは最低6文字以上にしてください";
              return
            default:
              this.error = "登録情報をご確認ください。";
              return 
            ;
          }
        });
    }
  }
};
</script>

