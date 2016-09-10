<blog-roll>

  <div if={posts.length === 0}>
    You don't have any posts.<br>
    <a href="/new" class="button button-primary">Create your first post now</a>
  </div>

  <post each={posts} post={url} excerpt="true"></post>

</blog-roll>
