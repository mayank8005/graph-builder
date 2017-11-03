function PieOptionTemp() {
        this.value= 0;
        this.label = ' ';
        this.color = '#000'
}


$(document).ready(function () {
    
    var ViewModel = function () {

        // storing this value
        var that = this;

        // accounting no of options in pie
        this.pieNoOfOption = ko.observable();

        this.pieOptions = ko.observableArray([]);

        //creating option field for pie
        this.pieNoOfOption.subscribe(function () {

            var numberOfOption =that.pieNoOfOption();

            // number of options not allowed more than 10
            if (numberOfOption>10){
                alert('no of entry exceeded limit');
                that.pieNoOfOption(1);
                return
            }

            var fields = [];

            for(var i=0; i<numberOfOption; i++){
                fields.push(new PieOptionTemp());
            }

            that.pieOptions(fields);
        });

        // setting up default value 1
        this.pieNoOfOption(1);

    };

    ko.applyBindings(new ViewModel());
    
});