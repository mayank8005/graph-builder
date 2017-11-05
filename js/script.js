// if this will be false then application won't load any graph
var allowDraw = false;
// variable to store chart
var chart;


function PieOptionTemp() {
        this.value= ko.observable(0);
        this.label = ko.observable('');
        this.color = ko.observable("#000");
}


$(document).ready(function () {
    
    var ViewModel = function () {

        // storing this value
        var that = this;

        var selectedChart ;

        // select pie chart from chart selection form
        this.pieClick = function(){

            //hiding chart selection form
            $('#chart-selector-form').hide('slide',{direction:'left'},500);

           //setting selected chart to pie
            selectedChart = 'PIE';

            // showing pie form
            setTimeout(function () {
                $('#pie-chart-form').show('slide',{direction:'right'},500);
            },501);

        };

        //when back is pressed from pie chart form
        this.pieFormBack = function () {

            // hiding pie form
            $('#pie-chart-form').hide('slide',{direction:'right'},500);

            //setting selected chart to null
            selectedChart = null;

            //showing chart selection form
            setTimeout(function () {
                $('#chart-selector-form').show('slide',{direction:'left'},500);
            },501);
        };

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
            // creating array for each entry
            var colors = [];
            var labels = [];
            var values = [];

            that.pieOptions().forEach(function (option) {

                // checking for errors
                check(option);
                // if error occur
                if(!allowDraw)
                    return;

                // pushing values in respective arrays
                colors.push(option.color());
                values.push(Number(option.value()));
                labels.push(option.label());
            });

            // if error occur
            if(!allowDraw)
                return;

            // hiding pie chart form
            $('#pie-chart-form').hide();

            //showing canvas
            $('#canvas-division').show();

            // getting canvas context element
            var canvasContext = $('#canvas-sheet')[0].getContext('2d');

            //creating chart
            chart = new Chart(canvasContext, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        backgroundColor: colors,
                        data: values
                    }]
                },
                options :{
                    responsive: true
                }
            });
            // chart builded

        };

        // back button from canvas
        this.canvasBack = function () {
            if(selectedChart === 'PIE'){

                //clearing canvas
                chart.destroy();

                // hiding canvas
                $('#canvas-division').hide('slide',{direction:'right'},300);
                // showing pie form
                setTimeout(function () {
                    $('#pie-chart-form').show('slide',{direction:'left'},300);
                },301);
            }
        }

    };

    ko.applyBindings(new ViewModel());


});

function check(KOFunction) {
    var label = KOFunction.label();
    var value= Number(KOFunction.value());
    var color =KOFunction.color();

    // in case of error or invalid entry stopping application to draw
    if(label===''||value<=0){
        allowDraw = false;
        alert('invalid label or value input');
        return;
    }

}
