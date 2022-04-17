<template>
  <div class="container" dark>
    <div class="sidebar">
      <h1 class="logo">
        <img src="/img/logo.png" alt="ロゴ" width="100">
      </h1>
      <nav>
        <ul>
          <li class="side-menu"><a class="menu-link"><img src="/img/home.png" alt="" width="25">ホーム</a></li>
          <li class="side-menu"><a class="menu-link"><img src="/img/logout.png" alt="" width="25">ログアウト</a></li>
        </ul>
      </nav>
      <form action="" class="form">
        <div class="form-label"><label for="">シェア</label></div>
        <textarea name="" id="" cols="37" rows="6"></textarea>
        <button>シェアする</button>
      </form>
    </div>
    <main class="article">
      <h2 class="article-title">ホーム</h2>
      <ul class="article-list">
        <li class="article-list-item">
          <div class="user-info">
            <div class="user-name">test</div>
            <span><img src="img/heart.png" alt="ハート" width="25" class="heart"></span>
            <span>0</span>
            <span><img src="img/cross.png" alt="削除" width="25" class="cross"></span>
            <span><img src="img/detail.png" alt="ページ遷移" width="25"></span>
          </div>
          <p class="content">テストです。</p>
        </li>
      </ul>
    </main>
  </div>
</template>