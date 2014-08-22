function applySorter() {
//	var colTitle = "Ratio";
//	var colIdx = 5;
	var colTitle = "Ratio V.";
	var colIdx = 7;
	var $table = $("#ovContent table.tStat");
	if (!$table) {
		return false;
	}
	var arrowImg = $("tr:first-child th img", $table);
	arrowImg.remove();
	var newHeader = $("<th/>").css("white-space", "nowrap").attr("title", "The score per price in millions").text(colTitle).append(arrowImg);
	$("tr:first-child th:eq(" + colIdx + ")", $table).after(newHeader);

	$.each($("tr:not(:first-child):not(.tr_sep)", $table), function(index, $tr) {
		var price = parseFloat($("td:eq(4)", $tr).text().replace(/\,/g, '.'));
		var points = parseInt($("td:eq(" + colIdx + ")", $tr).text());
		$("td:eq(" + colIdx + ")", $tr).after($("<td/>").addClass("alignright").attr("title", points / price).text((points / price).toFixed(2)));
	});

	var comparer = function(a, b) {
		var valA = parseFloat($(a).children('td').eq(colIdx + 1).attr("title"));
		var valB = parseFloat($(b).children('td').eq(colIdx + 1).attr("title"));
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