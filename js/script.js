// if this will be false then application won't load any graph
var allowDraw = false;


function PieOptionTemp() {
        this.value= ko.observable(0);
        this.label = ko.observable('');
        this.color = ko.observable("#000");
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

        this.pieDraw = function () {

            // allowing to draw if no of option greater than 0
            if(that.pieOptions().length > 0)
               allowDraw = true;
            var drawPieData = [];

            that.pieOptions().forEach(function (option) {

                if(!allowDraw)
                    return;
                drawPieData.push(koToObject(option));
            });

            // checking if error occur
            if(!allowDraw){
                return;
            }

            console.log(drawPieData);

        };

    };

    ko.applyBindings(new ViewModel());


});

function koToObject(KOFunction) {
    var label = KOFunction.label();
    var value= KOFunction.value();
    var color =KOFunction.color();

    // in case of error or invalid entry stopping application to draw
    if(label===''||value<=0){
        allowDraw = false;
        alert('invalid label or value input');
        return;
    }

    // returning object
    return {
        label: label,
        value: value,
        color: color
    }

}
