function selectAllCheckbox ( id, className ) {
	isChecked = $('#'+id).is(':checked');
	if ( isChecked ) {
		$('.'+className).not(":disabled").attr('checked', true).change();
	} 
	else {
		$('.'+className).not(":disabled").removeAttr('checked').change();
	}
}

function openInNewTab (url) {
    try {
        var win = window.open(url, "_new");
        win.focus();
    }
    catch (error) {
        toastr.error("Please enable popups and try again.");
    }
}

/**
 * Add 'libcommon/plugins/tableToExcel/tableToExcel.js' on the file in which this function is called
 * @param {base64encodedcontent} content 
 * @param {String} filename 
 */
function ajaxWkhtmlToPdf ( content, filename ) {
    var byteCharacters = atob(content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: "application/pdf"});
    saveAs(blob, filename);
}

;(function ($) {
    $.getRandomString = function (length = 5) {
        return Math.random().toString(36).substr(2, length)
    }
    })(jQuery);
    
/**
 * Add serial number(sl.no) to table
 * @param {Sting} tableClassNameOrId 
 */
function addSerialNumberToTable(tableClassNameOrId){
    _.defer(function() { 
        $(tableClassNameOrId).each(function(){
            $('th:first-child, thead td:first-child', this).each(function(){
                var tag = $(this).prop('tagName');
                $(this).before('<'+tag+' class="remove-added-tags">Sl.no</'+tag+'>');
            });
            let i = 0;
            $('td:first-child', this).each(function(i){
                $(this).before('<td class="remove-added-tags" align="center" >'+(i+1)+'</td>');
                i=i+1;
            });
        });
    }); 
}

/**
 * Get table as an object 
 * Should have thead and tbody
 * @param {table id} id 
 * @returns Object table
 */
function getTableAsObject(id){
    let thead = [];
    $('#'+id).find("thead tr").each(function (inxTr,tr) {
        let trData = [];
        $(this).find("th").each(function (inxTh,th) {
            let attribute = [];
            $.each(th.attributes,function(i,att){
                attribute.push({name:att.nodeName,value:att.nodeValue});
            });
            let thData = {colSpan:th.colSpan,text:th.innerText.trim(),attribute:attribute};
            trData.push(thData);
        });
        $(this).find("td").each(function (inxTh,td) {
            let attribute = [];
            $.each(td.attributes,function(i,att){
                attribute.push({name:att.nodeName,value:att.nodeValue});
            });
            let tdData = {colSpan:td.colSpan,text:td.innerText.trim(),attribute:attribute};
            trData.push(tdData);
        });
        thead.push(trData);
    });
    let tbody = [];
    $('#'+id).find("tbody tr").each(function (inxTr,tr) {
        let trData = []
        $(this).find("th").each(function (inxTh,th) {
            let attribute = [];
            $.each(th.attributes,function(i,att){
                attribute.push({name:att.nodeName,value:att.nodeValue});
            });
            let thData = {colSpan:th.colSpan,text:th.innerText.trim(),attribute:attribute};
            trData.push(thData);
        });
        $(this).find("td").each(function (inxTh,td) {
            let attribute = [];
            $.each(td.attributes,function(i,att){
                attribute.push({name:att.nodeName,value:att.nodeValue});
            });
            let tdData = {colSpan:td.colSpan,text:td.innerText.trim(),attribute:attribute};
            trData.push(tdData);
        });
        tbody.push(trData);
    });
    let table = {
        thead:thead,
        tbody:tbody
    }
    let self = this;
    return table;
}

