/*
 * For more about jqGrid, ref:
 * https://github.com/tonytomov/jqGrid
 * http://www.trirand.com/blog/?p=1165&cpage=1
 * http://www.helloweba.com/view-blog-164.html
 * http://www.cnblogs.com/lipan/archive/2010/11/25/1887160.html
 * http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options
 * 
 * http://www.guriddo.net/demo/guriddojs/
 */
function searchGrid(){
	console.log('searching...');
	var searchFormData = $(".search-form").serializeJson();
	console.log(searchFormData);
	$("#jqGrid").jqGrid('setGridParam',{ 
        postData:searchFormData, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}

function reloadGrid(){
	$("#jqGrid").jqGrid().trigger("reloadGrid");
}

function closeModal(){
	$(".modal").modal('hide');
}

function openModal(){
	$(".modal").modal('show');
}

function edit(id){
	loadItem(id);	
}

function del(url){
	var s = jQuery("#jqGrid").jqGrid('getGridParam','selarrrow');
	if(s.length < 1){
		jbAlert('请选择要删除的记录');
		return;
	}
	if(s.length > 20){
		jbAlert('每次最多删除20条数据');
		return;
	}
	jbConfirm('确认要删除' + s.length + '条数据么？', function(result){
		if(!result)
			return;
		var ids = "ids=";
	    for (var i = 0; i < s.length; i++) {
	        ids += s[i] + ",";
	    }
		ajaxPost(url, ids, function(){
			jbAlert('删除成功！');
			reloadGrid();
		});
	});
	
}