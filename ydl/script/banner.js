/*
*   JQuery 1.9.1
*   leiyu 2014-7-28
*   修改前请先备份
*/
$(function () {
    //banner 宽度
    var _w = 1174;
    //定义banner当前索引
    var _index = 0;
    //获取操作的 banner
    var ban_ul = $("#bannerIndex ul");
    var ban_lis = ban_ul.children("li");
    //定义 <ul> 宽度
    ban_ul.css({ width: ban_lis.length * _w + "px" });
    //创建banner切换的圆点
    var b_c_dian = $("#b_c_dian");
    var dian = "<ul>";
    for (var i = 0; i < ban_lis.length; i++) {
        dian += "<li><img src='images/ban_default.png'></li>";
    }
    dian += "</ul>";
    b_c_dian.append(dian);
    //获取banner切换的圆点和创建 ul 宽度
    var d_li_w = 10;
    var dian_ul = b_c_dian.children("ul");
    var dian_lis = dian_ul.children("li");
    dian_ul.css({ width: (ban_lis.length * (15 + 5)) + "px" });//(15 + 5) 15 代表LI的宽度 5 是LI之间的右边界
    dian_lis.eq(_index).children("img").attr({ src: "images/ban_this.png" });
    //点击按钮操作
    dian_lis.click(function () {
        _index = $(this).index();
        //banner图的动作
        BannerMove();
        //启动自动播放
        startBA();
    })
    ban_ul.hover(function () {
        //清除自动播放
        clearInterval(BannerAuto);
    }, function () {
        //启动自动播放
        startBA();
    })
    //banner图的动作
    function BannerMove() {
        _index = _index >= ban_lis.length ? 0 : _index;
        ban_ul.animate({ left: (-(_index * _w)) + "px" }, 500);
        //重置banner切换的圆点
        for (var dl = 0; dl < ban_lis.length; dl++) {
            if (dl === _index)
                dian_lis.eq(dl).children("img").attr({ src: "images/ban_this.png" });
            else
                dian_lis.eq(dl).children("img").attr({ src: "images/ban_default.png" });
        }
    }
    //自动播放
    var BannerAuto;
    function startBA() {
        clearInterval(BannerAuto);
        BannerAuto = setInterval(function () {
            _index++;
            BannerMove();
        }, 3000);
    }
    //启动自动播放
    startBA();
})