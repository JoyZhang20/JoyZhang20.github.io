jQuery(function(){
		
		//初始加载第一个菜单
		var li=jQuery('#menuUi').find('li');
		var cdCount=li.size();
		if(cdCount>0){
			var url=jQuery(li[0]).find('a').attr('data-src');
			$('.shade').remove();
			jQuery("#content").load(_path+url);
		}
		if (!$.isMobile()){
			$(".mobxx").css("display","none");
			//pc端时，如果是蓝色皮肤，把head放出来
			$(".headerBox").show();
		}
		resetFooter();
		$(window).resize(function(){
			resetFooter();
		});
		$('#navbar_index').click(function(event) {
			$(this).removeClass('visible-xs');
		});
		$('#menu_btn_sj').outerClick(function(event) {
			$("#navbar_index").removeClass('visible-xs');
		});
		
		//判断【在线答题】环节是否要在首页显示
		var sfsyxz = $("#sfsyxz").val();
		var zxdtblzt = $("#zxdtblzt").val();
		if(sfsyxz=='1' && zxdtblzt!="1"){//在首页显示&未办理
			syZxdt();
		}
		$(document).off('touchend', '.shade').on('touchend', '.shade', function(event) {
			$(this).remove();
			$('div#navbar_index').removeClass('visible-xs in');
			$('#grmenu').removeClass('open');
			$('a').blur();
		}).off('touchend', 'a.navbar_img').on('touchend', 'a.navbar_img', function(event) {
			event.stopPropagation();
			$('.navbar_index').removeClass('visible-xs');
		}).off('touchend', '.navbar .mobxx .tzmeun').on('touchend', '.navbar .mobxx .tzmeun', function(e){
			toMenu(this,$(this).attr('data-cdlx'));
		});
});


setTimeout(function(){
	$('.process.container>h3').hide();
	$('.system-title').text("自助报到");
},200);

function resetFooter(){
	var header=$('.ky_header').outerHeight();
	var content=$('#content').outerHeight();
	var windowHeight=$(window).height();
	var footer=$('.footer').outerHeight();
	var area=windowHeight-header-content;
	if(area>footer){
		$('.footer').addClass('fixed-footer');
	}else{
		$('.footer').removeClass('fixed-footer');
	}
}
//菜单点击跳转
function toMenu(obj,lx){
	var uri=jQuery(obj).attr('data-src');
	//如果为在线咨询，使用iframe内嵌
	if(uri.endsWith("toZxzx.zf") || uri.endsWith("/qj/xsqj/cx.zf")){
		$("#myFrame").attr("src",_path+uri);
		$("#content").children().remove();
		$("#myFrame").css("display","");
		return;
	}else{
		$("#myFrame").css("display","none");
		$("#myFrame").children().remove();
	}
	if(lx=='1'||lx==1){
		var url=jQuery(obj).attr('data-src');
		$('.shade').remove();
		window.open(url);
	}else{
		var url=jQuery(obj).attr('data-src');
		$('.shade').remove();
		$(obj).disabled();
		jQuery("#content").load(_path+url, {}, function(response, status, xhr){
			$(obj).enable();
		});
	}
	
}

//菜单点击跳转(蓝色皮肤的)
function toMenublue(obj){
	$(".nav").css("left","-50%");
	$(".navBox").removeClass("show");
	var uri=jQuery(obj).attr('data-src');
	var lx =jQuery(obj).attr('data-cdlx')
	//如果为在线咨询，使用iframe内嵌
	if(uri.endsWith("toZxzx.zf") || uri.endsWith("/qj/xsqj/cx.zf")){
		$("#myFrame").attr("src",_path+uri);
		$("#content").children().remove();
		$("#myFrame").css("display","");
		return;
	}else{
		//首页不隐藏头部，其他的菜单需要隐藏
		if(!uri.endsWith("/zzfw/grzx/homePage.zf")){
			if($.isMobile()){
				$(".headerBox").hide();
			}
		}
		$("#myFrame").css("display","none");
		$("#myFrame").children().remove();
	}
	if(lx=='1'||lx==1){
		var url=jQuery(obj).attr('data-src');
		window.open(url);
	}else{
		var url=jQuery(obj).attr('data-src');
		$(obj).disabled();
		jQuery("#content").load(_path+url, {}, function(response, status, xhr){
			$(obj).enable();
		});
	}
	
}
//环节点击跳转环节办理页面
function hjbl(obj){
	var o=jQuery(obj);
	var lchjid=o.attr("lchjid");
	var hjblzt=o.attr("hjblzt");
	var lj=o.attr('lj');
		jQuery.post(_path + '/zzfw/zxhjblMain/checkSfwcbthjxx.zf',{lchjid:lchjid},function(data){
			if (hjblzt==1){
				if(lj.indexOf('?')>-1){
					jQuery("#content").load(_path+lj+"&lchjid="+lchjid+"&hjdm="+o.attr('hjdm')+"&url="+lj);
				}else{
					jQuery("#content").load(_path+lj+"?lchjid="+lchjid+"&hjdm="+o.attr('hjdm')+"&url="+lj);
				}
			}else{

				if (data!=null&&data.length!=0){
					$.alert(data[0].msg);
					return false;
				}else{
					if(lj.indexOf('?')>-1){
						jQuery("#content").load(_path+lj+"&lchjid="+lchjid+"&hjdm="+o.attr('hjdm')+"&url="+lj);
					}else{
						jQuery("#content").load(_path+lj+"?lchjid="+lchjid+"&hjdm="+o.attr('hjdm')+"&url="+lj);
					}
				}
			}
		});
}
//查看经费信息
function ckJfxx(){
	var skinlx=jQuery("#skinlx").val();
	if($.isMobile()){
		if(skinlx=="skin2"){
			$(".nav").css("left","-50%");
			$(".navBox").removeClass("show");
			$(".headerBox").hide();
		}
	}
	var lqh=jQuery("#lqh").val();
	jQuery("#content").load(_path+"/zzfw/grzx/ckJfxx.zf",{lqh:lqh});
}

//查看宿舍信息
function ckSsxx(){
	var skinlx=jQuery("#skinlx").val();
	if($.isMobile()){
		if(skinlx=="skin2"){
			$(".nav").css("left","-50%");
			$(".navBox").removeClass("show");
			$(".headerBox").hide();
		}
	}
	var lqh=jQuery("#lqh").val();
	jQuery("#content").load(_path+"/zzfw/ssfpbl/ckSsfpblRz.zf",{lqh:lqh});
	
}
//查看志願者簡介
function ckZyz(){
	var lqh=jQuery("#lqh").val();
	$.showDialog("ckZyz.zf?lqh=" + lqh, '查看简介', $.extend(viewConfig, {"width":"700px"}));
	
}
//查看通知公告详情
function ckTzgg(obj){
	var skinlx=jQuery("#skinlx").val();
	if($.isMobile()){
		if(skinlx=="skin2"){
			$(".nav").css("left","-50%");
			$(".navBox").removeClass("show");
			$(".headerBox").hide();
		}
	}
	jQuery("#content").load(_path+"/zzfw/tzgg/ckTzgg.zf",{xwbh:obj.id});
	
}

//查看志愿者信息
function ckZyzxx(){
	var skinlx=jQuery("#skinlx").val();
	if($.isMobile()){
		if(skinlx=="skin2"){
			$(".nav").css("left","-50%");
			$(".navBox").removeClass("show");
			$(".headerBox").hide();
		}
	}
	var lqh=jQuery("#lqh").val();
	jQuery("#content").load(_path+"/zzfw/grzx/ckZyzxx.zf",{lqh:lqh});
}

//修改密码
function xgmm(){
	var skinlx=jQuery("#skinlx").val();
	if(skinlx=="skin2"){
		$(".nav").css("left","-50%");
		$(".navBox").removeClass("show");
	}
	jQuery("#content").load(_path+"/zzfw/grzx/xgmm.zf");
}
//个人信息
function grxx(){
	jQuery("#content").load(_path+"/zzfw/grzx/grxx.zf");
}
//退出登录
function logout(){
	document.location.href=_path+"/zzfw/grzx/zzfwLogout.zf";
}

//更换样式
function zzfwskin(lx){
	/*
	if(lx=="1"){
		document.location.href=_path+"/zzfw/grzx/main.zf?skinlx=skin1";
	}else{
		document.location.href=_path+"/zzfw/grzx/main.zf?skinlx=skin2";
	}
	*/
	jQuery.ajax({
		url : _path +"/zzfw/grzx/skinlxSave.zf",
		type : "post",
		dataType : "text",
		async : false,
		data : {"skinlx":lx},
		success : function(data) {
			document.location.href=_path+"/zzfw/grzx/main.zf";
		}
	});
}

//弹出在线答题
function syZxdt(){
	var lqh=jQuery("#lqh").val();
	$.showDialog("syZxdt.zf?lqh=" + lqh, '首页在线答题', {
		url:"",
		width		: "1000px",
		modalName	: "viewConfig",
		offAtOnce	: true,
		buttons		: {
		}
	});
	
}