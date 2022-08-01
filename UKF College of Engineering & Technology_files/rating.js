function rateAction(parameterString) {
	var dataString =  parameterString;
	$.ajax({
         type: "POST",
         url: "rpc.php",
         data: dataString,
         success: function(res){
                 $('#unit_long').html(res);
         }
      });
      return false;
}
