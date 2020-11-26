var sj = {};
$(function($){
	initSj();
	$(document).off("click", "#btn_qj_zj").on("click", "#btn_qj_zj", function(e){
		$.showDialog(_path + '/qj/xsqj/zj.zf', '申请假条', $.extend({}, modifyConfig, {"width":"800px", buttons:{
			success:{
				label : "保存",
				callback : function(){
					if($("select[name=lx]").val() == ""){
						$.alert("请选择请假类型！");
						return false;
					}
					submitForm("ajaxForm", function(data){
						if(data.status == 'SUCCESS'|| data.status == 'success'){
							$.success(data.message, function(){
								$.closeModal("modifyModal");
								$('#tabGrid').refreshGrid();
							});
						}else if(data.status == 'FAIL'||data.status == 'fail'){
							$.error(data.message);
						}else{
							$.alert(data.message);
						}
					});
					return false;
				}
			},
			cancel : {
				label : "关 闭",
				className : "btn-default"
			}
		}}));
	}).off("click", "#btn_qj_ck").on("click", "#btn_qj_ck", function(e){
		var ids = $("#tabGrid").getKeys();
		if (ids.length != 1){
			$.alert('请选定一条记录!');
			return;
		}
		$.showDialog(_path + '/qj/xsqj/ck.zf?id=' + ids[0], '查看假条', $.extend({}, viewConfig, {"width":"800px"}));
	}).off("click", "#btn_qj_sc").on("click", "#btn_qj_sc", function(e){
		var ids = $("#tabGrid").getKeys();
		if (ids.length != 1){
			$.alert('请选定一条记录!');
			return;
		}else{
			var sfch = $("#tabGrid").bootstrapTable('getSelections')[0].sfch;
			if(sfch == 1){
				$.alert("已撤回的假条无法重复撤回！");
			}else{
				var shzt = $("#tabGrid").bootstrapTable('getSelections')[0].shzt;
				if(shzt != '0'){
					$.alert("已审核的假条无法撤回！");
					return false;
				}
				$.confirm("确认撤回假条吗？", function(res){
					if(res){
						$.post(_path + '/qj/xsqj/sc.zf?id=' + ids[0], function(data){
							if(data.status == "SUCCESS" || data.status == "success"){
								$.success("撤回成功！", function(e){
									$('#tabGrid').refreshGrid();
								});
							}else{
								$.alert("撤回失败！", function(e){
									$('#tabGrid').refreshGrid();
								});
							}
						});
					}
				});
			}
		}
	}).off("click", "#btn_xj_ck").on("click", "#btn_xj_ck", function(e){
		var ids = $("#tabGrid").getKeys();
		if (ids.length != 1){
			$.alert('请选定一条记录!');
			return;
		}
		$.showDialog(_path + '/qj/xsxj/ck.zf?id=' + ids[0], '查看销假申请', $.extend({}, viewConfig, {"width":"800px"}));
	}).off("click", "#btn_xj_sc").on("click", "#btn_xj_sc", function(e){
		var ids = $("#tabGrid").getKeys();
		if (ids.length != 1){
			$.alert('请选定一条记录!');
			return;
		}else{
			var sfch = $("#tabGrid").bootstrapTable('getSelections')[0].sfch;
			if(sfch == 1){
				$.alert("已撤回的销假无法重复撤回！");
			}else{
				var shzt = $("#tabGrid").bootstrapTable('getSelections')[0].shzt;
				if(shzt != '0'){
					$.alert("已审核的销假申请无法撤回！");
					return false;
				}
				$.confirm("确认撤回销假申请吗？", function(res){
					if(res){
						$.post(_path + '/qj/xsxj/sc.zf?id=' + ids[0], function(data){
							if(data.status == "SUCCESS" || data.status == "success"){
								$.success("撤回成功！", function(e){
									$('#tabGrid').refreshGrid();
								});
							}else{
								$.alert("撤回失败！", function(e){
									$('#tabGrid').refreshGrid();
								});
							}
						});
					}
				});
			}
		}
	}).off("focus", "input[name=kssj], input[name=jssj]").on("focus", "input[name=kssj], input[name=jssj]", function(e){
		//请假开始、结束时间
		//laydate(sj[$(this).attr("id")]);
	}).off("hidden.bs.modal", ".modal").on("hidden.bs.modal", ".modal", function(e){
		initSj();
	}).off("click", "a.sqxj").on("click", "a.sqxj", function(e){
		$.showDialog(_path + '/qj/xsxj/zj.zf?id=' + $(this).data("id"), '申请销假', $.extend({}, modifyConfig, {"width":"800px"}));
	});
	
	function initSj(){
		/*var kssj = laydate.render({
			elem: '#kssj' //指定元素
			, type: 'datetime'
			, done: function (value, dates) {
				if(value!=''){
					jssj.min = datas; //开始日选好后，重置结束日的最小日期
				}
			}
		});
		var jssj = laydate.render({
			elem: '#jssj' //指定元素
			, type: 'datetime'
			, done: function (value, dates) {
				if(value!=''){
					kssj.max = datas; //结束日选好后，重置开始日的最大日期
				}
			}
		});*/
			
		var kssj = {
			elem: '#kssj',
			format: 'YYYY-MM-DD hh:mm:ss',
			istime:true,
			choose: function(datas){
				jssj.min = datas; //开始日选好后，重置结束日的最小日期
				jssj.start = datas //将结束日的初始值设定为开始日
			}
		};
		var jssj = {
			elem: '#jssj',
			format: 'YYYY-MM-DD hh:mm:ss',
			istime:true,
			choose: function(datas){
				kssj.max = datas; //结束日选好后，重置开始日的最大日期
			}
		};
		
		sj['kssj'] = kssj;
		sj['jssj'] = jssj;
	}
});