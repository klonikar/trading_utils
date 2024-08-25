$(document).ready(function(e) {  

    jQuery("#datetimepicker").datetimepicker({
        format:"Y-m-d H:i:00",
        mask:true,
        minDate:'+2',
        defaultDate:'+1970/01/02',
        defaultTime:'23:59',
        value:'+1'
    });

    $("#bl-calc-form").submit(function() {

    	$("#results").css("display","none");

    	var spot = parseFloat($("#input-spot").val()),
			strike = parseFloat($("#input-strike").val()),
			expiry = $("#datetimepicker").val(),
			volt = parseFloat($("#input-volt").val()),
			int_rate = parseFloat($("#input-intrate").val()),
			div_yld = parseFloat($("#input-divyld").val());

		//Validation
		var error=null;

		if(isNaN(spot) || isNaN(strike) || isNaN(volt) || isNaN(int_rate)) {
			error = "Invalid Values";	
			$("#errors").text(error);
			$("#errors").css("display", "inline");
		}
		else if(spot < 0 || strike < 0) {
			error = "Spot and Strike should be positive values";			
			$("#errors").text(error);
			$("#errors").css("display", "inline");
		}
		else if(volt <0) {
			error = "Voltality should be greater than 0";			
			$("#errors").text(error);
			$("#errors").css("display", "inline");
		}
		else if(int_rate <0 || int_rate >100) {
			error = "Interest rate should be between 0 - 100";			
			$("#errors").text(error);
			$("#errors").css("display", "inline");
		}
		else {			

			expiry = expiry.replace(" ", "T");

			var date_expiry = new Date(expiry),
				date_now = new Date();

			var seconds = Math.floor((date_expiry - (date_now))/1000),
				minutes = Math.floor(seconds/60),
				hours = Math.floor(minutes/60),
				delta_t = (Math.floor(hours/24))/365.0;

			var volt = volt/100,
				int_rate = int_rate/100;

			if(hours < 24) {
				error = "Please select a later date and time <br> Expiry should be minimum 24 hours from now";
				$("#errors").html(error);
				$("#errors").css("display", "inline");
			}
			else {

				$("#errors").css("display", "none");

				var d1 = (Math.log(spot/strike) + (int_rate + Math.pow(volt,2)/2) * delta_t) / (volt*Math.sqrt(delta_t)),
					d2 = (Math.log(spot/strike) + (int_rate - Math.pow(volt,2)/2) * delta_t) / (volt*Math.sqrt(delta_t));

				var fv_strike = (strike)*Math.exp(-1*int_rate*delta_t);

				//For calculating CDF and PDF using gaussian library
				var distribution = gaussian(0, 1);


				//Premium Price
				var call_premium = spot * distribution.cdf(d1) - fv_strike * distribution.cdf(d2),
					put_premium = fv_strike * distribution.cdf(-1*d2) - spot * distribution.cdf(-1*d1);

				//Option greeks
				var call_delta = distribution.cdf(d1),
					put_delta = call_delta-1;

				var call_gamma = distribution.pdf(d1)/(spot*volt*Math.sqrt(delta_t)),
					put_gamma = call_gamma; 

				var call_vega = spot*distribution.pdf(d1)*Math.sqrt(delta_t)/100,
					put_vega = call_vega;

				var call_theta = (-1*spot*distribution.pdf(d1)*volt/(2*Math.sqrt(delta_t)) - int_rate*fv_strike*distribution.cdf(d2))/365,
					put_theta = (-1*spot*distribution.pdf(d1)*volt/(2*Math.sqrt(delta_t)) + int_rate*fv_strike*distribution.cdf(-1*d2))/365;

				var call_rho = fv_strike*delta_t*distribution.cdf(d2)/100,
					put_rho = -1*fv_strike*delta_t*distribution.cdf(-1*d2)/100;
				
				$("#call-option-prem-value").text(call_premium.toFixed(2));
				$("#put-option-prem-value").text(put_premium.toFixed(2));
				$("#call-option-delta-value").text(call_delta.toFixed(3));
				$("#put-option-delta-value").text(put_delta.toFixed(3));
				$("#option-gamma-value").text(call_gamma.toFixed(4));
				$("#call-option-theta-value").text(call_theta.toFixed(3));
				$("#put-option-theta-value").text(put_theta.toFixed(3));
				$("#class-option-rho-value").text(call_rho.toFixed(3));
				$("#put-option-rho-value").text(put_rho.toFixed(3));
				$("#option-vega-value").text(call_vega.toFixed(3));
				
				// Colouring the numbers
				$("#results .results-value").removeClass('negative positive zero');

				$("#results .results-value").filter(function() {						
				        return ($(this).text() == 0);
				}).addClass('zero');
				
				$("#results .results-value").filter(function() {						
				        return ($(this).text() < 0);
				}).addClass('negative');

				$("#results .results-value").filter(function() {						
				        return ($(this).text() > 0);
				}).addClass('positive');

				$("#results").css("display","inline");
			}
		}

		return false;

 	});

})




