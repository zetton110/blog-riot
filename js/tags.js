riot.tag2('admin', '<table width="100%" class="u-full-width"> <thead> <tr> <th>Title</th> <th>URL</th> <th>Author</th> <th colspan="3">Category</th> </tr> </thead> <tbody> <tr each="{posts}"> <td>{title}</td> <td>{url}</td> <td>{author}</td> <td>{category}</td> <td><a href="/edit/{url}"><i class="fa fa-edit fa-lg"></i></a></td> <td><a href="/{url}"><i class="fa fa-eye fa-lg"></i></a></td> </tr> </tbody> </table> <a href="/new" class="button button-primary u-pull-right">Create New Post</a>', '', '', function(opts) {
});

riot.tag2('blog-roll', '<div if="{posts.length === 0}"> You don\'t have any posts.<br> <a href="/new" class="button button-primary">Create your first post now</a> </div> <post each="{posts}" post="{url}" excerpt="true"></post>', '', '', function(opts) {
});

riot.tag2('editor', '<form onsubmit="{add_post}"> <input class="u-full-width title" type="text" name="post_title" placeholder="Post Title" value="{post.title}"> <div class="row"> <input class="six columns" type="text" name="post_author" placeholder="Author" value="{post.author}"> <input class="six columns" type="text" name="post_category" placeholder="Category" value="{post.category}"> </div> <textarea name="post_content" class="u-full-width" placeholder="Post Content">{post.content}</textarea> <div class="row"> <button if="{post}" onclick="{delete_post}">Delete Post</button> <input type="submit" class="button button-primary u-pull-right" value="{opts.post ? \'Update\' : \'Publish\'}"> </div> </form>', 'editor .title,[riot-tag="editor"] .title,[data-is="editor"] .title{ height: 75px; font-size: 36px; } editor textarea,[riot-tag="editor"] textarea,[data-is="editor"] textarea{ height: 300px; max-width: 100%; min-width: 100%; }', '', function(opts) {


    this.delete_post = function() {
      if (confirm('Are you sure you want to permanently delete this post?')) {
        this.posts.splice(this.post.index, 1);
        this.save();
        riot.route('/');
      }
    }

    this.add_post = function() {

      var new_post = {
        title: this.post_title.value,
        author: this.post_author.value,
        category: this.post_category.value,
        content: this.post_content.value,
        url: this.post_title.value.toLowerCase().split(' ').join('-'),
        excerpt: this.post_content.value.split(/\s+/).slice(0,30).join(' ')
      };

      if ( !this.post ) {
        this.posts.push(new_post);
      } else {
        this.posts[this.post.index] = new_post;
      }

      this.save();

      riot.route('/');
    };

});

riot.tag2('post', '<div class="post"> <h3 class="post_title"><a href="/{post.url}">{post.title}</a></h3> <div class="meta"> <small>by</small> <span>{post.author}</span> <small>, posted in</small> <span>{post.category}</span> </div> <p>{opts.excerpt ? post.excerpt : post.content}</p> <hr> </div>', 'post .post_title,[riot-tag="post"] .post_title,[data-is="post"] .post_title{ margin: 0; } post .post,[riot-tag="post"] .post,[data-is="post"] .post{ margin-bottom: 15px; } post .post_title a,[riot-tag="post"] .post_title a,[data-is="post"] .post_title a{ color: #222; text-decoration: none; font-weight: 100; } post .meta,[riot-tag="post"] .meta,[data-is="post"] .meta{ margin-bottom: 15px; font-style: italic; color: #999; } post .meta span,[riot-tag="post"] .meta span,[data-is="post"] .meta span{ font-weight: 500; }', '', function(opts) {
});
