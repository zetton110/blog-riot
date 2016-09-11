riot.tag2('admin', '<table width="100%" class="u-full-width"> <thead> <tr> <th>Title</th> <th>URL</th> <th>Author</th> <th colspan="3">Category</th> </tr> </thead> <tbody> <tr each="{posts}"> <td>{title}</td> <td>{url}</td> <td>{author}</td> <td>{category}</td> <td><a href="/edit/{url}"><i class="fa fa-edit fa-lg"></i></a></td> <td><a href="/{url}"><i class="fa fa-eye fa-lg"></i></a></td> </tr> </tbody> </table> <a href="/new" class="button button-primary u-pull-right">Create New Post</a>', '', '', function(opts) {
});

riot.tag2('blog-roll', '<div if="{posts.length === 0}"> You don\'t have any posts.<br> <a href="/new" class="button button-primary">Create your first post now</a> </div> <post each="{posts}" post="{url}" excerpt="true"></post>', '', '', function(opts) {
});

riot.tag2('chart', '<div id="chartdiv"></div>', 'chart #chartdiv,[riot-tag="chart"] #chartdiv,[data-is="chart"] #chartdiv{ width: 100%; height: 100%; }', '', function(opts) {
    this.on('mount',function(){

    var chart = AmCharts.makeChart( "chartdiv", {
    "type": "serial",
    "addClassNames": true,
    "theme": "light",
    "autoMargins": false,
    "marginLeft": 30,
    "marginRight": 8,
    "marginTop": 10,
    "marginBottom": 26,
    "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
    },

    "dataProvider": [ {
        "year": 2009,
        "income": 23.5,
        "expenses": 21.1
    }, {
        "year": 2010,
        "income": 26.2,
        "expenses": 30.5
    }, {
        "year": 2011,
        "income": 30.1,
        "expenses": 34.9
    }, {
        "year": 2012,
        "income": 29.5,
        "expenses": 31.1
    }, {
        "year": 2013,
        "income": 30.6,
        "expenses": 28.2,
        "dashLengthLine": 5
    }, {
        "year": 2014,
        "income": 34.1,
        "expenses": 32.9,
        "dashLengthColumn": 5,
        "alpha": 0.2,
        "additional": "(projection)"
    } ],
    "valueAxes": [ {
        "axisAlpha": 0,
        "position": "left"
    } ],
    "startDuration": 1,
    "graphs": [ {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Income",
        "type": "column",
        "valueField": "income",
        "dashLengthField": "dashLengthColumn"
    }, {
        "id": "graph2",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "lineAlpha": 1,
        "title": "Expenses",
        "valueField": "expenses",
        "dashLengthField": "dashLengthLine"
    } ],
    "categoryField": "year",
    "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0
    }
} );

    });
});
riot.tag2('dashboard', '<div class="gridster"> <ul> <li data-row="1" data-col="1" data-sizex="2" data-sizey="2" style="background-color:red"></li> <li data-row="2" data-col="2" data-sizex="2" data-sizey="2" style="background-color:pink"><chart style="height:100%;"></chart></li> <li data-row="3" data-col="1" data-sizex="2" data-sizey="1" style="background-color:green"></li> <li data-row="1" data-col="2" data-sizex="2" data-sizey="2" style="background-color:purple"></li> <li data-row="1" data-col="1" data-sizex="2" data-sizey="3" style="background-color:yellow"></li> <li data-row="2" data-col="4" data-sizex="2" data-sizey="2" style="background-color:orange"></li> <li data-row="2" data-col="6" data-sizex="2" data-sizey="2" style="background-color:skyblue"></li> <li data-row="3" data-col="1" data-sizex="2" data-sizey="1" style="background-color:blue"></li> </ul> </div>', 'dashboard ul li,[riot-tag="dashboard"] ul li,[data-is="dashboard"] ul li{ list-style:none; }', '', function(opts) {
    this.on('mount',function(){
        $(function(){
            $(".gridster ul").gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [140, 140]
            });
        });
    });
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
