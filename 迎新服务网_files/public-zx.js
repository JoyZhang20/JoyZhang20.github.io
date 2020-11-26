$(function() {
	$(document).off('click', '.service-page .ky_header .navbar-toggle').on('click', '.service-page .ky_header .navbar-toggle', function() {
		/*移动端菜单栏收缩的效果*/
		$(this).parents('.ky_header').next('#navbar_index').toggleClass('visible-xs');
	}).off('mouseover', '.life-items .goods-list ul li a').on('mouseover', '.life-items .goods-list ul li a', function() {
		$(this).addClass('active');
		if(!$("#gwcBtn").hasClass("hidden_cart")){//已生成订单后不允许添加购物车
		/*生活物品页面--鼠标移上生活物品里商品的效果*/
		$(this).parent("li").find(".join-shopping-cart").show();
		}

	}).off('mouseout', '.life-items .goods-list ul li a').on('mouseout', '.life-items .goods-list ul li a', function() {
		$(this).removeClass('active');
		$(this).parents("li").find(".join-shopping-cart").hide();

	}).off('mouseout', '.service-page .ky_header .navbar-toggle').on('mouseover', '.service-page .ky_header .navbar-toggle', function() {

		/*生活物品页面--鼠标移出生活物品里商品的效果*/
		$(this).removeClass('active');
		$(this).parent("li").find(".join-shopping-cart").hide();

	}).off('click','.navbar-nav li').on('click','.navbar-nav li',function(){
		$('.navbar-nav li').removeClass('open');
		$(this).addClass('open');
	}).off('click','.navbar-nav-zyy li').on('click','.navbar-nav-zyy li',function(){
		$('.navbar-nav-zyy li').removeClass('active');
		$(this).addClass('active');
	}).off('click', '.green-channel .difficult-type .type-name input[type="checkbox"]').on('click', '.green-channel .difficult-type .type-name input[type="checkbox"]', function() {
		/*绿色通道三个单选按钮勾选的不同效果*/
		if($("#optionsCheckbox1").is(":checked")) {
			$(this).parents('.difficult-type').next('.table-responsive').find(".credit-amount").removeAttr('disabled', true);

		} else {
			$(this).parents('.difficult-type').next('.table-responsive').find(".credit-amount").attr('disabled', true);
		}
		if($("#optionsCheckbox2").is(":checked")) {
			$(this).parents('.difficult-type').next('.table-responsive').find(".defer-amount").removeAttr('disabled', true);
		} else {
			$(this).parents('.difficult-type').next('.table-responsive').find(".defer-amount").attr('disabled', true);
		}
		if($("#optionsCheckbox3").is(":checked")) {
			$(this).parents('.type-name').next('.fill-cont').show();
		} else {
			$(this).parents('.type-name').next('.fill-cont').hide();
		}
	}).off('click', '.dress_dec li>button').on('click', '.dress_dec li>button', function() {
		/*军训服装页面js效果*/
		var _parent=$(this).closest('.dress_dec');
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{
			_parent.find('button.active').removeClass('active');
			$(this).addClass('active');
		}
	}).off('click', '.life-items-detail .package-intro .package-cont .edit').on('click', '.life-items-detail .package-intro .package-cont .edit', function() {
		/*自选手机套餐--个人信息--编辑*/
		$(this).addClass('grey');
		$(this).parents('.package-cont').find('.person-info').find('input,select,textarea').removeAttr('disabled', true);
		$(this).parents('.package-cont').find('.person-info').find('input,select,textarea').removeClass('border-hide');
		$(this).siblings('span').show();
	}).off('click', '.life-items-detail .package-intro .package-cont .cancel').on('click', '.life-items-detail .package-intro .package-cont .cancel', function() {
		$(this).parent('li').find('.edit').removeClass('grey');
		$(this).hide().parent('li').find('.save').hide();
		$(this).parents('.package-cont').find('.person-info').find('input,select,textarea').attr('disabled', true);
		$(this).parents('.package-cont').find('.person-info').find('input,select,textarea').addClass('border-hide');
		//$(this).parents('.package-cont').find('.person-info').find('input,select,textarea').val('');
	})
	if($(window).width() < 768) {
		$(document).off('click', '.green-channel .difficult-type .type-name input[type="checkbox"]').on('click', '.green-channel .difficult-type .type-name input[type="checkbox"]', function() {
			if($("#optionsCheckbox1").is(":checked")) {
				$(this).parents('.panel-body').find(".pay-cost .credit-amount").removeAttr('disabled', true);
			} else {
				$(this).parents('.panel-body').find(".pay-cost .credit-amount").attr('disabled', true);
			}
			if($("#optionsCheckbox2").is(":checked")) {
				$(this).parents('.difficult-type').find('.lstd-phone .defer-amount').removeAttr('disabled', true);
				//$(this).parents('.panel-body').find(".pay-cost .defer-amount").removeAttr('disabled', true);
			} else {
				$(this).parents('.difficult-type').find('.lstd-phone .defer-amount').attr('disabled', true);
				//$(this).parents('.panel-body').find(".pay-cost .defer-amount").attr('disabled', true);
			}
			if($("#optionsCheckbox3").is(":checked")) {
				$(this).parents('.type-name').next('.fill-cont').show();
			} else {
				$(this).parents('.type-name').next('.fill-cont').hide();
			}
		});
	}

	/*首页鼠标移上去出现顶部提示框*/
	$(".homepage .personal-info>.container>div>.dorm-member img").tooltip({
		html: true
	});
	/*生活物品页面--加入购物车提示框的效果*/
	$(".life-items .goods-list ul li a .join-shopping-cart").popover({
		html: true
	});
	/*绿色通道欠收金额为0的效果*/
	$('.green-channel .table tr td .harvest-amount').each(function() {
		var amount = $(this).text();
		if(amount == 0) {
			$(this).parents('tr').find("input[type='checkbox']").attr('disabled', true);
			$(this).parents('tr').find("input[type='checkbox']").removeAttr("checked");
		}
	});
	/*军训服装页面js效果*/
	$(".dress_detail").popover({
		html : true
	});

	/*财务缴费合计的总和*/
	var money = 0;

	var list = $('tbody>tr>td:nth-last-child(1)');
	for(var i = 0; i < list.length; i++) {
		money = Number(list[i].innerText) + money;
		$('#totalPrice').text(money);
	}

});