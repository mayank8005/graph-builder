// if this will be false then application won't load any graph
var allowDraw = false;
// variable to store chart
var chart;

//class for pie options
function PieOptionTemp() {
        this.value= ko.observable(0);
        this.label = ko.observable('');
        this.color = ko.observable("#000");
}

//class for line options
function LineOptionTemp(){
    this.value = ko.observable(0);
    this.label = ko.observable('');
}

$(document).ready(function () {
    
    var ViewModel = function () {

        // storing this value
        var that = this;

        //store's type of graph selected
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

        // select line chart from chart selection form
        this.lineClick = function(){

            //hiding chart selection form
            $('#chart-selector-form').hide('slide',{direction:'left'},500);

            //setting selected chart to pie
            selectedChart = 'LINE';

            // showing pie form
            setTimeout(function () {
                $('#line-chart-form').show('slide',{direction:'right'},500);
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

        // draw's pie chart
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
                checkPIE(option);

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

            // if pie chart was selected
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
            // if line chart was selected
            else if(selectedChart === 'LINE'){

                //clearing canvas
                chart.destroy();

                // hiding canvas
                $('#canvas-division').hide('slide',{direction:'right'},300);
                // showing pie form
                setTimeout(function () {
                    $('#line-chart-form').show('slide',{direction:'left'},300);
                },301);
            }
        };

        // THIS AREA IS DEDICATED TO LINE GRAPH (except line click function as that part is in chart selector form)

        //when back is pressed from line chart form
        this.lineFormBack = function () {

            // hiding line form
            $('#line-chart-form').hide('slide',{direction:'right'},500);

            //setting selected chart to null
            selectedChart = null;

            //showing chart selection form
            setTimeout(function () {
                $('#chart-selector-form').show('slide',{direction:'left'},500);
            },501);
        };

        // no of coordinates/values in line graphs
        this.lineNoOfOptions =ko.observable();

        // array of options for line graph
        this.lineOptions =ko.observableArray([]);

        this.lineNoOfOptions.subscribe(function () {

            // no of options entered by user
            var noOfOptions = that.lineNoOfOptions();

            // if no of options greater that 10 than error
            if(noOfOptions>10){
                alert('no of entry exceeded limit');
                that.lineNoOfOptions(1);
                return;
            }

            // new array of options/coordinates/values for line graph
            var feilds = [];

            // adding new options
            for(var i=0;i<noOfOptions;i++){
                feilds.push(new LineOptionTemp());
            }

            // updating observable array for updating UI
            that.lineOptions(feilds);

        });

        this.lineNoOfOptions(1);

        //draws line graph
        this.lineDraw = function () {

            // allowing to draw if no of option greater than 0
            if(that.lineOptions().length > 0)
                allowDraw = true;

            // creating array for each entry
            var labels = [];
            var values = [];

            // building array for each entry
            that.lineOptions().forEach(function (option) {

                // checking for errors
                checkLINE(option);
                // if error occur
                if(!allowDraw)
                    return;

                // pushing values in respective arrays
                values.push(Number(option.value()));
                labels.push(option.label());
            });

            // if error occur
            if(!allowDraw)
                return;

            // hiding pie chart form
            $('#line-chart-form').hide();

            //showing canvas
            $('#canvas-division').show();

            // getting canvas context element
            var canvasContext = $('#canvas-sheet')[0].getContext('2d');

            //creating chart
            chart = new Chart(canvasContext, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: "rgba(255,153,0,0.4)",
                        label: 'Line Graph'
                    }]
                },
                options :{
                    responsive: true
                }
            });
            // chart builded
        };


    };

    ko.applyBindings(new ViewModel());


});

// checks entry for blank or invalid input in pie form
function checkPIE(KOFunction) {
    var label = KOFunction.label();
    var value= Number(KOFunction.value());

    // in case of error or invalid entry stopping application to draw
    if((label===''||value<=0)&&allowDraw){
        allowDraw = false;
        alert('invalid label or value input');
        return;
    }

}

// checks entry for blank or invalid input in line graph form
function checkLINE(KOFunction) {
    var label = KOFunction.label();

    // in case of error or invalid entry stopping application to draw
    if(label===''&&allowDraw){
        allowDraw = false;
        alert('invalid label or value input');
        return;
    }

}