$(document).ready(function(){
/*
	var opens = false;
	$("#open-table-link").click(function() {
		if (!opens) {
			if ($(this).hasClass("opened")) {
				$(this).text(btnShowText);
				opens = true;
				$(".commercial-table-wrap .commercial-table").animate({
					opacity: 0
				}, 200, function() {
					$(".commercial-table-wrap").animate({
						height: 'hide',
						"margin-top": "0px",
						display: "none"
					}, 300);
					$(".open-table-link").removeClass("opened");
					opens = false;
				});

			} else {
				opens = true;
				$(this).addClass("opened").text(btnHideText);
				$(".commercial-table-wrap").animate({
					display: "block",
					height: 'show',
					"margin-top": "30px"
				}, 300, function() {
					$(".commercial-table-wrap .commercial-table").animate({
						opacity: 1
					}, 200);
					opens = false;
				});
			}
		}
	});
*/

	$('.label-checkbox').on('click', function() {
		$(this).toggleClass('checked');
		if ($(this).hasClass('checked')) {
			$(this).find('input[type="checkbox"]').prop('checked', true);
		} else {
			$(this).find('input[type="checkbox"]').prop('checked', false);
		}
		return false;
	});

/*
	var licenses_config = {
		"additional_license": {
			"title": "Webix Developer License",
			"cost": 170,
			"id": "34207",
			"discont": [{
				"count": 10,
				"cost": 30
			}, {
				"count": 5,
				"cost": 15
			}, {
				"count": 0,
				"cost": 0
			}]
		},
		"team_pack": {
			"title": "Team Pack",
			"cost": 1120,
			"id": "34213"
		},
		"enterprise_pack": {
			"title": "Enterprise Pack",
			"cost": 2220,
			"id": "34209"
		},
		"support_standard": {
			"title": "Standard Support",
			"cost": 300,
			"id": "34212"
		},
		"support_premium": {
			"title": "Premium Support",
			"cost": 900,
			"id": "34211"
		},
		"support_premium_plus": {
			"title": "Premium Plus",
			"cost": 1700,
			"id": "34210"
		},
		"pivot_license": {
			"title": "Webix Pivot Developer license",
			"cost": 70,
			"id": "34225"
		},
		"kanban_license": {
			"title": "Webix Kanban Developer license",
			"cost": 70,
			"id": "34224"
		},
		"scheduler_license": {
			"title": "Webix Scheduler Developer license",
			"cost": 70,
			"id": "34226"
		},
		"filemanager_license": {
			"title": "Webix File Manager Developer license ",
			"cost": 70,
			"id": "34227"
		},
		"spreadsheet_license": {
			"title": "Webix SpreadSheet Developer license ",
			"cost": 329,
			"id": "37292"
		}
	};
*/
/*	$('.buy_submit').click(function() {
		var product = [];
		var quanity = [];

		var butt_id = $(this).attr('id');

		var licenses_count;
		if (butt_id == 'additional_license') {
			licenses_count = parseInt($('#count_licenses').val())||0;
			if (licenses_count > 0) {
				product.push(licenses_config['additional_license']['id']);
				quanity.push(licenses_count);
			}
			var support_key = $('input[type="radio"][name="support"]:checked').val();
			if (licenses_config[support_key]) {
				product.push(licenses_config[support_key]['id']);
				quanity.push(1);
			}
		}

		var radiobuttons = document.querySelectorAll('.checkbox:checked');
		for (var i = radiobuttons.length; i--;) {
			var type = radiobuttons[i].name;
			if (licenses_config[type]) {
				product.push(licenses_config[type]['id']);
				quanity.push(licenses_count || 1);
			}
		}

		for(var i=0; i<product.length; i++)
			product[i]="products["+(i+1)+"][id]="+product[i]+"&products["+(i+1)+"][qty]="+quanity[i];
		location.href= 'https://store.payproglobal.com/checkout?currency=usd&'+product.join("&");
		return false;
	})
*/
/*	function calculate_sum_cost_of_additional_licenses() {
		var result = {
			cost: 0,
			discont: 0
		};
		var discont = licenses_config.additional_license.discont;
		var count_licenses = parseInt($('#count_licenses').val()) || 0;
		var checkProduct = 0;

		$('#developer_licenses input[type="checkbox"]').each(function() {
			if ($(this).is(':checked')){
				checkProduct += parseFloat($(this).val());
			}
		});

		if(count_licenses == 0){
			result.cost = checkProduct; //cost without discont
		} else{
			result.cost = count_licenses * (licenses_config.additional_license.cost + checkProduct); //cost without discont
		}

		var cost_with_discont = 0;
		for (var i = 0; i < discont.length; i++) {
			if (count_licenses >= discont[i].count) {
				cost_with_discont = Math.round(result.cost * (100 - discont[i].cost) / 100);
				break;
			}
		}
		result.discont = result.cost - cost_with_discont;
		result.cost = cost_with_discont; //cost with discont
		return result;
	}

	function calculate_result(begin_sum) {
		return begin_sum + Math.round($('#developer_licenses input[type=radio]:checked').parent().parent().find('div.cost span').html() || 0);
	}

	function show_sum_cost_add_licenses(additional_licenses) {
		$('#licenses_sum_cost').html(additional_licenses.cost + '.00');
		if (additional_licenses.discont) {
			$('#discont_cost').html(additional_licenses.discont + '.00');
			$('.discont_area').show();
		} else {
			$('.discont_area').hide();
		}
	}


	$('#count_licenses').keyup(function() {
		if ($(this).val() >= 50) {
			$('#per50licenses').removeClass('show_per50');
		} else {
			$('#per50licenses').addClass('show_per50');
		}
		var result = calculate_sum_cost_of_additional_licenses();
		result.cost = calculate_result(result.cost);
		show_sum_cost_add_licenses(result);
	})

	$('#developer_licenses input[type=radio]').click(function() {
		var result = calculate_sum_cost_of_additional_licenses();
		result.cost = calculate_result(result.cost);
		show_sum_cost_add_licenses(result);
	})

	$('#developer_licenses .label-checkbox').on('click', function() {
		var result = calculate_sum_cost_of_additional_licenses();
		result.cost = calculate_result(result.cost);
		show_sum_cost_add_licenses(result);
	});
 */
	$('.pricing-table .label-checkbox').on('click', function() {
		var table = $(this).parents(".pricing-table");

		var cost = table.attr("cost")*1;
		var products = [table.attr("code")]; var quantity = ["1"];

		table.find('input[type="checkbox"]:checked').each(function(){
			products.push( $(this).attr("code")  );
			quantity.push( $(this).attr("count") );
			cost += $(this).attr("cost")*1;
		});


		for(var i=0; i<products.length; i++)
			products[i]="products["+(i+1)+"][id]="+products[i]+"&products["+(i+1)+"][qty]="+quantity[i];
		var url = "https://store.payproglobal.com/checkout?currency=usd&"+products.join("&");

		table.find(".sign-up a").attr("href", url);
		table.find(".table-price-value").html(cost);

	});

	//$('#licenses_sum_cost').html(licenses_config.additional_license.cost + licenses_config.support_standard.cost);

});