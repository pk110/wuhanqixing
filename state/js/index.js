        var city;
        var toggleBottom = true;
        var nub =0;
        var today;
        var a;
        $(function(){
            // 兼容手机浏览器自动播放音乐的问题
            document.addEventListener('DOMContentLoaded', function () {    
                function audioAutoPlay() {        
                    var audio = document.getElementById('bg-music'); 
                    audio.play();        
                    document.addEventListener("WeixinJSBridgeReady", function () {            
                        audio.play();        
                    }, false);    
                }    
                audioAutoPlay();
            });
            // 请求获得位置
            // $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
            //     if (remote_ip_info.ret == '1') {
            //         $('.header-right ul li').eq(2).text(remote_ip_info.city+'市');
            //         city = remote_ip_info.city;
            //     } else {
            //         $('.header-right ul li').eq(2).text('你是外星人！');
            //     }
            // });
        })
        
        // 移入显示天气
        function findWeather() {
                    $.ajax({
                        url:"./../../json/weather.json",
                        // url:"http://api.map.baidu.com/telematics/v3/weather?output=json&ak=0A5bc3c4fb543c8f9bc54b77bc155724",
                        type:"get",
                        // data:{location:city},
                        /*预期服务器端返回的数据类型，假设我现在跨域了，我就改成jsonp 就可以了 */
                    // dataType: 'jsonp',
                    success:function(data){
                        // //百度那边的 数据已经回来，我现在要解析这个数据.
                        $('.weatherBox_one span').text(data.weather.today);
                        $('.weatherBox_one p').text(data.weather.status+'   '+data.weather.temperature);
                        var weatherData = data.weather.statusArray.map(function(a,b){
                            if(b == 0){
                                today = '明天'; 
                            }else if(b == 1){
                                today = '后天';
                            }else{
                                today = '大后天';
                            }
                            return "<div class='weatherBox_ul'><div class='weatherBox_ul_left'><span>"+today+" :</span><span>"+a.status+"</span></div><div class='weatherBox_ul_right'>"+a.temperature+"</div></div>"
                        })
                        $('.weatherBox_two').empty().append(weatherData);
                        $('.weatherBox').fadeIn();
                    }
                })
            }
            // 移出隐藏天气
            function leaveWeather(){
                $('.weatherBox').fadeOut();
            }
            // 头部切换选项
            $('.header-left ul li').each(function(a,b){
                $(this).click(function(){
                    if(toggleBottom == false){
                        if(a == 5 || a == 3){

                        }else{
                            // 写判断当前点击的是哪个栏目
                            if($(this).text() == '首页'){
                                $('.home').fadeIn();
                                $('.status').empty();
                            }else if($(this).text() == '状态'){
                                $('.home').fadeOut();
                                $('.loading').css('display','block');
                                setTimeout(function(){
                                        $.ajax({
                                                url:"./../../json/status.json",
                                                // url:"http://api.map.baidu.com/telematics/v3/weather?output=json&ak=0A5bc3c4fb543c8f9bc54b77bc155724",
                                                type:"get",
                                                // data:{location:city},
                                                /*预期服务器端返回的数据类型，假设我现在跨域了，我就改成jsonp 就可以了 */
                                            // dataType: 'jsonp',
                                            success:function(data){
                                                // //百度那边的 数据已经回来，我现在要解析这个数据.
                                                var statusData = data.status.statusArray.map(function(a,b){
                                                    var imgs = a.images.split(',');
                                                    for(var i = 0;i<imgs.length;i++){
                                                        return '<li><h1>'+a.datatime+'</h1><div class="status_time"><span>'+a.time+'</span></div><p>'+a.text+'</p><div class="status_img"><img src="'+imgs[i]+'" alt=""></div></li>';
                                                    }
                                                })
                                                $('.status').empty().append(statusData);
                                                $('.status').css('overflow-y','auto');
                                                $('.status').fadeIn();
                                            }
                                        })
                                    $('.loading').css('display','none');
                                },1000)
                            }else if($(this).text() == '音乐'){   
                                $('.home').fadeOut();
                                $('.status').css('overflow-y','hidden');
                                $('.loading').css('display','block');
                                setTimeout(function(){
                                    $.ajax({
                                            url:"./../../json/music.json",
                                            type:"get",
                                            /*预期服务器端返回的数据类型，假设我现在跨域了，我就改成jsonp 就可以了 */
                                        success:function(data){
                                            // //百度那边的 数据已经回来，我现在要解析这个数据.
                                            var musicData = data.result.tracks.map(function(a,b){
                                                // var imgs = a.images.split(',');
                                                // for(var i = 0;i<imgs.length;i++){
                                                    var musicTime = '03:40';
                                                    var nub = parseInt(b)+1; 
                                                    return '<li><span>'+nub+'</span><span>'+a.name+'</span><span>'+a.artists[0].name+'</span><span>'+a.album.subType+'</span><span>'+musicTime+'</span></li>';
                                                // }
                                                    
                                            })
                                            $('.status').empty().append('<div class="musicTags"><ul><li>正在播放</li><li>我的收藏</li><li>排行榜/歌单</li><li>搜索音乐</li></ul></div><div class="musicList"><ul><li><span></span><span>歌曲</span><span>歌手</span><span>版本</span><span>时长</span></li></ul></div><div class="musicLists"><ul>'+ musicData +'</ul></div><div class="playing"><div class="playLeft"><img src="./state/images/last.png" alt=""><img src="./state/images/play.png" alt="" onclick="playing()"><img src="./state/images/next.png" alt=""></div><div class="playRight"><div class="playMessage"><span>你的名字</span><span>03:30 / 05:50</span></div><div class="playTime"><span></span></div></div></div>');
                                            
                                            $('.status').fadeIn();

                                            // 悬浮图片发亮
                                            $('.playLeft img').mouseenter(function(){
                                                $(this).css('opacity',1);
                                            })
                                            $('.playLeft img').mouseleave(function(){
                                                $(this).css('opacity',0.8);
                                            })
                                        }
                                    })
                                    $('.loading').css('display','none');
                                },1000)
                            }
                            $('.footer').animate({bottom:0,opacity:1},'slow');
                            $('.home').animate({bottom:0,opacity:1},'slow');
                            $('.setting').css('display','none');
                            $('.setting').animate({top:0,opacity:0},'slow');

                            $('.header-right ul li img').eq(0).removeClass('on');
                            $(this).addClass("on").siblings().removeClass("on");
                            toggleBottom = true
                        }
                    }else{
                        if(a == 5 || a == 3){

                        }else{
                             // 写判断当前点击的是哪个栏目
                            if($(this).text() == '首页'){
                                $('.home').fadeIn();
                                $('.status').empty();
                            }else if($(this).text() == '状态'){
                                $('.home').fadeOut();
                                $('.loading').css('display','block');
                                setTimeout(function(){
                                        $.ajax({
                                                url:"./../../json/status.json",
                                                // url:"http://api.map.baidu.com/telematics/v3/weather?output=json&ak=0A5bc3c4fb543c8f9bc54b77bc155724",
                                                type:"get",
                                                // data:{location:city},
                                                /*预期服务器端返回的数据类型，假设我现在跨域了，我就改成jsonp 就可以了 */
                                            // dataType: 'jsonp',
                                            success:function(data){
                                                // //百度那边的 数据已经回来，我现在要解析这个数据.
                                                var statusData = data.status.statusArray.map(function(a,b){
                                                    var imgs = a.images.split(',');
                                                    for(var i = 0;i<imgs.length;i++){
                                                        return '<li><h1>'+a.datatime+'</h1><div class="status_time"><span>'+a.time+'</span></div><p>'+a.text+'</p><div class="status_img"><img src="'+imgs[i]+'" alt=""></div></li>';
                                                    }
                                                })
                                                $('.status').empty().append(statusData);
                                                $('.status').css('overflow-y','auto');
                                                $('.status').fadeIn();
                                            }
                                        })
                                    $('.loading').css('display','none');
                                },1000)
                            }else if($(this).text() == '音乐'){   
                                $('.home').fadeOut();
                                $('.status').css('overflow-y','hidden');
                                $('.loading').css('display','block');
                                setTimeout(function(){
                                    $.ajax({
                                            url:"./../../json/music.json",
                                            type:"get",
                                            /*预期服务器端返回的数据类型，假设我现在跨域了，我就改成jsonp 就可以了 */
                                        success:function(data){
                                            // //百度那边的 数据已经回来，我现在要解析这个数据.
                                            var musicData = data.result.tracks.map(function(a,b){
                                                // var imgs = a.images.split(',');
                                                // for(var i = 0;i<imgs.length;i++){
                                                    var musicTime = '03:40';
                                                    var nub = parseInt(b)+1;     
                                                    return '<li><span>'+nub+'</span><span>'+a.name+'</span><span>'+a.artists[0].name+'</span><span>'+a.album.subType+'</span><span>'+musicTime+'</span></li>'
                                                // }
                                            })
                                            $('.status').empty().append('<div class="musicTags"><ul><li>正在播放</li><li>我的收藏</li><li>排行榜/歌单</li><li>搜索音乐</li></ul></div><div class="musicList"><ul><li><span></span><span>歌曲</span><span>歌手</span><span>版本</span><span>时长</span></li></ul></div><div class="musicLists"><ul>'+ musicData +'</ul></div><div class="playing"><div class="playLeft"><img src="./state/images/last.png" alt=""><img src="./state/images/play.png" alt="" onclick="playing()"><img src="./state/images/next.png" alt=""></div><div class="playRight"><div class="playMessage"><span>你的名字</span><span>03:30 / 05:50</span></div><div class="playTime"><span></span></div></div></div>');                 
                                            $('.status').fadeIn();

                                            // 悬浮图片发亮
                                            $('.playLeft img').mouseenter(function(){
                                                $(this).css('opacity',1);
                                            })
                                            $('.playLeft img').mouseleave(function(){
                                                $(this).css('opacity',0.8);
                                            })
                                        }
                                    })
                                    $('.loading').css('display','none');
                                },1000)
                            }
                            $(this).addClass("on").siblings().removeClass("on");
                        }
                    }
                })
            })
            // 点击播放歌曲
            function playing(){
                if(a == true){
                    $('.playLeft img').eq(1).attr('src','./state/images/play.png');
                    $('audio').attr('src','./state/pengkai.mp3');
                    a = false;
                }else{
                    $('.playLeft img').eq(1).attr('src','./state/images/stop.png');
                    $('audio').attr('src','./state/all.mp3');
                    a = true;
                }
            }
            // 点击设置
            function setting(){
                if(toggleBottom == true){
                    // 对应设置这块
                    $('.footer').animate({bottom:-30,opacity:0},'slow');
                    $('.home').animate({bottom:-30,opacity:0},'slow');
                    $('.setting').css({'display':'block','z-index':999});
                    $('.setting').animate({top:100,opacity:1},'slow');
                    $('.status').empty().fadeOut();
                    $('.header-left ul li').removeClass("on");
                    $('.header-right ul li img').eq(0).addClass('on');
                    toggleBottom = false;
                }
            }
            // 点击切换图片
            function leftImg(){
                nub++;
                var sky ='sky';
                $('.loading').css('display','block');
                $(".container-fluid").show(function(){
                    setTimeout(function(){
                        $('.loading').css('display','none');
                    },1000)
                    if(nub == 2){
                        $('.right').addClass('disabled');
                        $('.left').removeClass('disabled');
                        sky = 'url(./state/images/'+(sky + nub).toString()+'.jpg)';
                        $(this).css({'background':sky,'display':'block','background-position':'center center','background-size':'cover'});
                    }else{
                        sky = 'url(./state/images/'+(sky + nub).toString()+'.jpg)';
                        $('.right').removeClass('disabled');
                        $('.left').removeClass('disabled');
                        $(this).css({'background':sky,'display':'block','background-position':'center center','background-size':'cover'});
                    }
                });
            }
            function rightImg(){
                nub--;
                var sky ='sky';
                $('.loading').css('display','block');
                $(".container-fluid").show(function(){
                    setTimeout(function(){
                        $('.loading').css('display','none');
                    },1000);
                    if(nub == 0){
                        $('.left').addClass('disabled');
                        $('.right').removeClass('disabled');
                        sky = 'url(./state/images/'+(sky + nub).toString()+'.jpg)';
                        $(this).css({'background':sky,'display':'block','background-position':'center center','background-size':'cover'});
                    }else{
                        sky = 'url(./state/images/'+(sky + nub).toString()+'.jpg)';
                        $('.left').removeClass('disabled');
                        $('.right').removeClass('disabled');
                        $(this).css({'background':sky,'display':'block','background-position':'center center','background-size':'cover'});
                    }
                });
            }

            // 点击显示3d效果图
            var fragmentConfigPhone = {
                container : '.img-flex',//显示容器
                line : 10,//多少行
                column : 10,//多少列
                width : 1200,//显示容器的宽度
                animeTime : 10000,//最长动画时间,图片的取值将在 animeTime*0.33 + animeTime*0.66之前取值 
                img : './state/images/sky0.jpg'//图片路径
            };
            var fragmentConfigPc = {
                container : '.img-flex',//显示容器
                line : 10,//多少行
                column : 10,//多少列
                width : 1920,//显示容器的宽度
                animeTime : 10000,//最长动画时间,图片的取值将在 animeTime*0.33 + animeTime*0.66之前取值 
                img : './state/images/sky0.jpg'//图片路径
            };
            function show3d(){
                alert('开始3d动画！');
                var substrings = $('.container-fluid').css('background-image');
                var substringNub = substrings.indexOf('/state/images/');
                var img = '.'+substrings.slice(substringNub,-2);
                $('.img-flex').fadeIn();
                if(document.body.clientWidth <= 640){
                    fragmentConfigPhone.img = img;
                    fragmentImg(fragmentConfigPhone);
                    $('body').css('overflow','hidden');
                    $('.container-fluid').css({'background-position':'center center','background-size':'cover'});
                }else{
                    fragmentConfigPc.img = img;
                    fragmentImg(fragmentConfigPc);
                    $('body').css('overflow','hidden');
                    $('.container-fluid').css({'background-position':'center center','background-size':'cover'});
                }
            }

            // 点击任意的隐藏图片
            function fadeImg(){
                $('.img-flex').fadeOut();
            }

            // 设置里禁止输入大于1的值
            function upperCase(){
                if($('.setting input[name="number"]').val() > 1 || $('.setting input[name="number"]').val() <= 0){
                    $('.setting input[name="number"]').val(1);
                }else{
                    $('.container-fluid').css('opacity',$('.setting input[name="number"]').val());
                }
            }
            
            function againSetting(){
                $('.setting input[name="number"]').val(1);
                $('.container-fluid').css('opacity',1);
            }

            // 手机版下拉菜单
            function downMenu(){
                $('.header-left ul').slideToggle();
            }

