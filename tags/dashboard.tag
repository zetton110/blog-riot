<dashboard>
    <div class="gridster">
        <ul>
            <li data-row="1" data-col="1" data-sizex="2" data-sizey="2" style="background-color:red"></li>
            <li data-row="2" data-col="2" data-sizex="2" data-sizey="2" style="background-color:pink"><chart style="height:100%;"></chart></li>
            <li data-row="3" data-col="1" data-sizex="2" data-sizey="1" style="background-color:green"></li>
            <li data-row="1" data-col="2" data-sizex="2" data-sizey="2" style="background-color:purple"></li>
            <li data-row="1" data-col="1" data-sizex="2" data-sizey="3" style="background-color:yellow"></li>
            <li data-row="2" data-col="4" data-sizex="2" data-sizey="2" style="background-color:orange"></li>
            <li data-row="2" data-col="6" data-sizex="2" data-sizey="2" style="background-color:skyblue"></li>
            <li data-row="3" data-col="1" data-sizex="2" data-sizey="1" style="background-color:blue"></li>
        </ul>
    </div>
    <style scoped>
        ul li{
            list-style:none;
        }
    </style>
    <script>
    this.on('mount',function(){
        $(function(){
            $(".gridster ul").gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [140, 140]
            });
        });
    });
    </script>
</dashboard>