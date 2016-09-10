<editor>

  <form onsubmit={add_post}>
    <input class="u-full-width title" type="text" name="post_title" placeholder="Post Title" value={post.title}>
    <div class="row">
      <input class="six columns" type="text" name="post_author" placeholder="Author" value={post.author}>
      <input class="six columns" type="text" name="post_category" placeholder="Category" value={post.category}>
    </div>
    <textarea name="post_content" class="u-full-width" placeholder="Post Content">{post.content}</textarea>
    <div class="row">
      <button if={post} onclick={delete_post}>Delete Post</button>
      <input type="submit" class="button button-primary u-pull-right" value={opts.post ? 'Update' : 'Publish'}>
    </div>
  </form>

  <style scoped>
    .title {
      height: 75px;
      font-size: 36px;
    }
    textarea {
      height: 300px;
      max-width: 100%;
      min-width: 100%;
    }
  </style>

  <script>

    // Delete post
    this.delete_post = function() {
      if (confirm('Are you sure you want to permanently delete this post?')) {
        this.posts.splice(this.post.index, 1);
        this.save();
        riot.route('/');
      }
    }

    // Save new post
    this.add_post = function() {

      // Get post values
      var new_post = {
        title: this.post_title.value,
        author: this.post_author.value,
        category: this.post_category.value,
        content: this.post_content.value,
        url: this.post_title.value.toLowerCase().split(' ').join('-'),
        excerpt: this.post_content.value.split(/\s+/).slice(0,30).join(' ')
      };
      // Add new post object to posts array (posts mixin) or update the single post being edited
      if ( !this.post ) {
        this.posts.push(new_post);
      } else {
        this.posts[this.post.index] = new_post;
      }
      // Save updated posts array to localstorage (posts mixin)
      this.save();
      // Redirect back to homepage (blog-roll)
      riot.route('/');
    };

  </script>

</editor>
