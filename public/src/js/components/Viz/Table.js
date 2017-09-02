function renderTable(id) {
	$('#' + id).dataTable();
}

module.exports = {
	renderTable: renderTable
};