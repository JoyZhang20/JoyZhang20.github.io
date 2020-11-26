jQuery(function($){
	var qjOptions = {
		url: _path + '/qj/xsqj/getPagedList.zf',
		uniqueId: "id",
		toolbar: '#but_ancd',
		columns: [
			{checkbox: true },
			{field: 'qjlxmc', title: '请假类型', sortable:true},
			{field: 'sc', title: '请假时长（小时）'},
			{field: 'nr', title: '请假事由', formatter:function(value, row, index){
				if(value.length > 20){
					return value.substr(0, 20) + "...";
				}else{
					return value;
				}
			}},
			{field: 'kssj', title: '开始时间', sortable:true},
			{field: 'jssj', title: '结束时间', sortable:true},
			{field: 'fqsj', title: '发起时间', sortable:true},
			{field: 'shztmc', title: '处理进度', sortable:true, formatter:function(value, row, index){
				if(row['sfch'] == '1'){
					return "<span style='color:red;'>已撤回</span>";
				}else if(row['shzt'] == '1'){
					if(row['flag'] == '0'){
						return value + "&ensp;|&ensp;<a href='javascript:void(0);' class='sqxj' data-id='" + row['id'] + "'><u>申请销假</u></a>";
					}else{
						return value + "&ensp;（&ensp;已申请销假&ensp;）";
					}
				}else{
					return value;
				}
			}}
		],
		sortName: 'kssj',
		sortOrder: "desc",
	};
	var xjOptions = {
		url: _path + '/qj/xsxj/getPagedList.zf',
		uniqueId: "id",
		toolbar: '#but_ancd',
		columns: [
			{checkbox: true },
			{field: 'sc', title: '销假时长（小时）'},
			{field: 'nr', title: '销假原因', formatter:function(value, row, index){
				if(value.length > 20){
					return value.substr(0, 20) + "...";
				}else{
					return value;
				}
			}},
			{field: 'kssj', title: '开始时间', sortable:true},
			{field: 'jssj', title: '结束时间', sortable:true},
			{field: 'fqsj', title: '发起时间', sortable:true},
			{field: 'shztmc', title: '处理进度', sortable:true, formatter:function(value, row, index){
				if(row['sfch'] == '1'){
					return "<span style='color:red;'>已撤回</span>";
				}else{
					return value;
				}
			}}
		],
		sortName: 'kssj',
		sortOrder: "desc",
	};
	
	$(document).off("click", "#myTab a").on("click", "#myTab a", function(e){
		if($(this).attr("aria-expanded")){
			if($(this).attr("link") == "qjTab"){
				$("#but_ancd").find("button.qj").show();
				$("#but_ancd").find("button.xj").hide();
				
				$('#tabGrid').rebuildGrid(qjOptions);
			}else if($(this).attr("link") == "xjTab"){
				$("#but_ancd").find("button.qj").hide();
				$("#but_ancd").find("button.xj").show();
				
				$('#tabGrid').rebuildGrid(xjOptions);
			}
		}
	});
	
	$('#tabGrid').loadGrid(qjOptions);
	$("#but_ancd").find("button.qj").show();
	$("#but_ancd").find("button.xj").hide();
});