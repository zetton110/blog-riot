
// Configure Router
riot.route.base('/');
riot.route.start(true);

// Mount a tag as a main view
function blog_set_view(view, opts) {
  riot.mount('#view', view, opts);
}

// Home
riot.route('/', function(){
  blog_set_view('dashboard');
});

// Admin
riot.route('/admin', function(){
  blog_set_view('admin');
});

// Dashboard
riot.route('/blog', function(){
  blog_set_view('blog-roll');
});

// Chart
riot.route('/chart', function(){
  blog_set_view('chart');
});

// New Post
riot.route('/new', function(){
  blog_set_view('editor');
});

// Edit Post
riot.route('/edit/*', function(url){
  blog_set_view('editor', {post:url});
});

// Single Blog Post
riot.route('/*', function(url){
  blog_set_view('post', {post:url});
});
