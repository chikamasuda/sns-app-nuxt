<template>
  <div>
    <h1 class="logo">
      <img src="/img/logo.png" alt="ロゴ" width="100">
    </h1>
    <nav>
      <ul>
        <li class="side-menu">
          <NuxtLink to="/" class="sidebar-menu-item">
            <img src="/img/home.png" alt="" width="25">
            <span class="sidemenu-text">ホーム</span>
          </NuxtLink>
        </li>
        <li class="side-menu" @click="logout">
          <img src="/img/logout.png" alt="" width="25">
          <span class="sidemenu-text">ログアウト</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  methods: {
    async logout() {
      await firebase
        .auth()
        .signOut()
        .then((data) => {
          this.$router.push('/login');  
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
