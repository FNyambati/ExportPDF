angular.module("app").controller('data', function($scope) {


  $('#cmd').click(function () { // runs when button is clicked
      var doc = new jsPDF('p', 'pt');
      var res = doc.autoTableHtmlToJson(document.getElementById("content"));

      doc.autoTable(res.columns, res.data); //pass in columns and row data



      doc.save('sample-file.pdf'); /// Name of PDF file once downloaded

  });

  /////DUMMY DATA TO REPEAT INTO TABLE

    $scope.telenotes = [{
            date: 'January 2015',
            line: 'Fujitsu',
            buyer: 'eBay',
            amount: 165
        }, {
            date: 'Febuary 2015',
            line: 'Toyo',
            buyer: 'Mazda',
            amount: 123
        }, {
            date: 'March 2015',
            line: 'Vorsteiner',
            buyer: 'Volkswagen',
            amount: 7321
        }, {
            date: 'April 2015',
            line: 'BRZ',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 423423
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 03216
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 46548
        }, {
            date: 'July 3015',
            line: 'Shidhin',
            buyer: 'ebay',
            amount: 148
    }]
});
