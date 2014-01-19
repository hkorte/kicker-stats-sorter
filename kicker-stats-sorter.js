function applySorter() {
	var $table = $("#ovContent table.tStat");
	if (!$table) {
		return false;
	}
	var arrowImg = $("tr:first-child th img", $table);
	arrowImg.remove();
	var newHeader = $("<th/>").css("white-space", "nowrap").attr("title", "The score per price in millions").text("Ratio").append(arrowImg);
	$("tr:first-child th:eq(5)", $table).after(newHeader);

	$.each($("tr:not(:first-child):not(.tr_sep)", $table), function(index, $tr) {
		var price = parseFloat($("td:eq(4)", $tr).text().replace(/\,/g, '.'));
		var points = parseInt($("td:eq(5)", $tr).text());
		$("td:eq(5)", $tr).after($("<td/>").addClass("alignright").attr("title", points / price).text((points / price).toFixed(2)));
	});

	var comparer = function(a, b) {
		var valA = parseFloat($(a).children('td').eq(6).attr("title"));
		var valB = parseFloat($(b).children('td').eq(6).attr("title"));
		if (isNaN(valA)) {
			if (isNaN(valB)) {
				return 0;
			} else {
				return 1;
			}
		} else {
			if (isNaN(valB)) {
				return -1;
			} else {
				return valB - valA;
			}
		}
	};

	var rows = $("tr:not(:first-child):not(.tr_sep)", $table).toArray().sort(comparer)
	$("tr:not(:first-child)", $table).remove();
	for ( var i = 0; i < rows.length; i++) {
		$table.append(rows[i]);
		$table.append($("<tr/>").addClass("tr_sep").append($("<td/>").attr("colspan", "12")));
	}
	return true;
}

function loader() {
	if (!applySorter()) {
		window.setTimeout(function() {
			loader();
		}, 500);
	}
}
loader();