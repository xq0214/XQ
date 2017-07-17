/*
*   JQuery 1.9.1
*   leiyu 2014-7-28
*   修改前请先备份
*/
$(function () {
    /*===================菜单 JS 动作=====================*/
    var menus = $(".t_c_bottom ul>li:first").siblings().andSelf();
    var thisMenu = $("#thisMenu");
    var mt = 161;//默认距离
    var mNow = 0;//获取当前的li
    for (var i = 0; i < menus.length; i++) {
        if (menus.eq(i).hasClass("thisli"))
            mNow = i;
    }
    //给定 thisli 默认位置
    thisMenu.css({ left: (mNow * 104 + mt) + "px" });
    menus.hover(function () {
        MenuMove($(this), ($(this).index() * 104 + mt), 1)
    }, function () {
        MenuMove($(this), (mNow * 104 + mt), 0)
    });
    var MenuAuto;
    function MenuMove(tn, lefts, move) {
        var ti = tn.index();
        var nodes = menus.eq(ti).children(".Nodes");
        nodes.stop();
        clearTimeout(MenuAuto);
        var _h = nodes.children("ul").height() + 23;//8个像素是上、下圆角图片高度 15个像素是 div 的 padding 值
        if (move === 1) {
            thisMenu.stop();
            thisMenu.animate({ left: lefts + "px" }, 165)
            nodes.css({ height: "0px" }).animate({ height: _h + "px" }, 300);
        }
        else if (move === 0) {
            nodes.css({ height: _h + "px" }).animate({ height: "0px" }, 300);
            MenuAuto = setTimeout(function () {
                thisMenu.animate({ left: lefts + "px" }, 300)
            }, 1250);
        }
    }
    /*===================产品介绍=========================*/
    //定义显示里的个数
    var show_li = 4;
    //定义显示里的个数
    var move_index = 1;
    //定义 li 总宽
    var cpzx_w = 235 + 17; //235为 li 的宽度 17 是 li 与 li 之间的间隙
    //获取产品介绍操作的 li 集合
    var cpzx_lis = $(".c_c_cpzx ul>li").siblings();
    //点击产品介绍左箭头
    $(".c_c_cpzx .img_left").click(function () {
        CP_LI_Move(cpzx_lis, cpzx_w, show_li, move_index, "left");
    })
    //点击产品介绍右箭头
    $(".c_c_cpzx .img_right").click(function () {
        CP_LI_Move(cpzx_lis, cpzx_w, show_li, move_index, "right");
    })
    /*===================店面形象=========================*/
    //定义店面形象 li 总宽
    var dmxx_w = 229 + 10; //229为 li 的宽度 10 是 li 与 li 之间的间隙
    //获取店面形象操作的 li 集合
    var dmxx_lis = $(".c_dmxx_imgs ul>li").siblings();
    //点击店面形象左箭头
    $(".c_c_dmxx .img_left").click(function () {
        CP_LI_Move(dmxx_lis, dmxx_w, show_li, move_index, "left");
    })
    //点击店面形象右箭头
    $(".c_c_dmxx .img_right").click(function () {
        CP_LI_Move(dmxx_lis, dmxx_w, show_li, move_index, "right");
    })
    //左右按钮 hover
    $(".img_hover").hover(function () { $(this).css({ opacity: 0.65 }) }, function () { $(this).css({ opacity: 1 }) })

    // LI 的移动动作
    //tn ThisNow 当前操作的 LI 集合
    //w  Width 当前操作的 LI 的总宽
    //sl ShowLI 当前显示的 LI 的个数
    //mi MoveIndex 每次移动的 LI 个数
    //move  判断移动的方向 "left"、"right"
    function CP_LI_Move(tn, w, sl, mi, move) {
        //判断当前li是否有动作
        if (tn.is(":animated"))
            return false;

        //如果 LI 个数不足显示个数则不能点击
        if (tn.length < sl)
            return false;

        var sl_index = 0;
        for (var i = 0; i < tn.length; i++) {
            if (tn.eq(i).position().left === 0) {
                sl_index = i;
                break;
            }
        }
        //重置需要操作的 LI 元素
        var newTn = Array();
        var ti = 0;
        if (move === "left") {
            var sindex = sl_index;
            for (var i = 0; i < mi; i++) {
                sindex--;
                sindex = sindex === -1 ? tn.length - 1 : sindex;
                tn.eq(sindex).css({ left: -(w * (i + 1)) });
                newTn[ti++] = tn.eq(sindex);
            }
        }
        for (var i = 0; i < sl; i++) {
            newTn[ti++] = tn.eq(sl_index);
            sl_index++;
            sl_index = sl_index === tn.length ? 0 : sl_index;
        }
        if (move === "right") {
            for (var i = 0; i < mi; i++) {
                tn.eq(sl_index).css({ left: w * (i + sl) });
                newTn[ti++] = tn.eq(sl_index);
                sl_index++;
                sl_index = sl_index === tn.length ? 0 : sl_index;
            }
        }
        //LI 移动效果
        for (var i = 0; i < newTn.length; i++) {
            var pl = newTn[i].position().left;
            if (move === "left") {
                pl += w * mi;
            } else if (move === "right") {
                pl -= w * mi;
            }
            newTn[i].animate({ left: pl }, 300);

        }
    }
    //初始化 li 的位子
    //tn ThisNow 当前操作的 LI 集合
    //w  Width 当前操作的 LI 的总宽
    //isCP  判断是否需要加入LI背景
    function CP_LI_Default(tn, w,isCP) {
        for (var i = 0; i < tn.length; i++) {
            tn.eq(i).css({ left: i * w });
            if (isCP)
                tn.eq(i).css({ "backgroundImage": "url(images/cpjj_li_bg_" + (i % 2 === 0 ? "1" : "2") + ".png)" });
        }
    }
    //初始化产品介绍 LI
    CP_LI_Default(cpzx_lis, cpzx_w, true);
    //初始化店面形象介绍 LI
    CP_LI_Default(dmxx_lis, dmxx_w, false);
})

//加入收藏代码
function AddFavorite(sURL, sTitle) { try { window.external.addFavorite(sURL, sTitle); } catch (e) { try { window.sidebar.addPanel(sTitle, sURL, ""); } catch (e) { alert("加入收藏失败，请使用Ctrl+D进行添加"); } } }