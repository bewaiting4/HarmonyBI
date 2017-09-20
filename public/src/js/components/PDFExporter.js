
class PDFExporter {

	export() {
		var doc = new jsPDF("p", "pt");
		// var chartNd = document.getElementById("chart1");
		// var canvas = chartNd.getElementsByTagName("canvas")[0];
		// var cvsWidth = canvas.width;
		// var cvsHeight = canvas.height;
		// var url = canvas.toDataURL("image/png");
		// var pdfWidth = doc.internal.pageSize.width;
		// var pdfHeight = doc.internal.pageSize.height;

		// // add title
		// doc.text("新疆和田地区皮山县2.11特大暴恐案件分析报告", 50, 30);

		// // add chart
		// doc.addImage(
		// 	url,
		// 	"JPEG",
		// 	pdfWidth / 4,
		// 	60,
		// 	pdfWidth / 2,
		// 	pdfWidth / 2 * cvsHeight / cvsWidth
		// );

		// // add table
		// var columns = ["f_number", "t_number", "call_start", "call_duration"];
		// var rows = [];
		// _.forEach(this.state.docData.vizData, function(row) {
		// 	var newRow = [];
		// 	_.forEach(columns, function(prop) {
		// 		newRow.push(row[prop]);
		// 	});
		// 	rows.push(newRow);
		// });
		// doc.autoTable(columns, rows, {
		// 	margin: { top: 60 + pdfWidth / 2 * cvsHeight / cvsWidth + 50 }
		// });

		// save document
		//doc.save('报告.pdf');
		doc.output("dataurlnewwindow");
	}
}

var expoter;

module.exports = function () {
    if (!expoter) {
        expoter = new PDFExporter();
    }

    return expoter;
};
