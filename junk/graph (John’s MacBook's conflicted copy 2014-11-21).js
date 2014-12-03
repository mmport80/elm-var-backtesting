/*
Copyright (C) 2014 John Orford

This file is part of elm-var-backtesting.

elm-var-backtesting is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

elm-var-backtesting is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with elm-var-backtesting.  If not, see <http://www.gnu.org/licenses/>.
*/



//text output -- it no html or graphical output


//input and output port for file data
//lookup statmodel name in order to get function
//spawn a worker for each lookback / model combo
//collate into array of objects

////////////////////////////////////////////////////

//var svgContainerC;
//var circles;

//var squares;

var squareContainer;

function initialGraphSetup(){
        //remove help message
        d3.select("div").selectAll("#p").remove();
              
        //remove dotted style   
        d3.selectAll("#dropfile").style("border-style","none");
        
        //
        //svgContainerC = d3.select("svg").append("g");        
	//circles = svgContainerC.selectAll("circle");
	
        squareContainer = d3.select("svg").append("g").attr("id","gSquares");
        
        }


var count = 0;

function updatePage(latestResult) {
        
        if (globalResults.length <= 1){
                initialGraphSetup();
                }
        
        //join
        squares = squareContainer
                .selectAll("rect")
                .data( globalResults, function(d,i){return i;} );
        
        squareWidth = function(d){
                return 300*Math.pow(d.lookback,-0.35)
                }

        maxSW = squareWidth({lookback:20});
        margin = {"left": 0.5*maxSW, "right":maxSW, "top":0.5*maxSW, "bottom":maxSW}
        
        width = parseInt(d3.select("svg").style("width")) - margin.left - margin.right;
        height = parseInt(d3.select("svg").style("height")) - margin.top - margin.bottom;
        
        xArray = globalResults.map( function(x){
                return x.breaches;
                });
               
        yArray = globalResults.map( function(x){
                return x.var;
                });   
                
        lowestAbsBreaches = Math.min.apply(null,xArray.map(function(z){return Math.abs(z);}));
                
        x = d3	.scale	
		.linear()
		.domain([ Math.min.apply(null,xArray), Math.max.apply(null,xArray) ])
		.range([ 0, width ]);
        
        y = d3	.scale
		.linear()
		.domain([ Math.min.apply(null,yArray), Math.max.apply(null,yArray) ])
		.range([ height, 0 ]);
        
        //update
        squares .transition()
                .duration(500)
	        .attr("x", function (d) { return x(d.breaches); })
	        .attr("y", function (d) { return y(d.var); })
	        .attr("id",function(d){
	                if ( Math.abs(d.breaches) == lowestAbsBreaches ){
	                        return "circle";
	                        }
	                else {
	                        return "rectangle";
	                        }
                        });
        
        xo = function(yo){console.log(yo)}
        
        //enter
        squares .enter()
	        .append("rect")
	        .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")")
	        .attr("x", function (d) { return x(d.breaches) - 0.5*squareWidth(d); })
	        .attr("y", function (d) { return y(d.var) - 0.5*squareWidth(d); })
	        .attr("width", function (d) { return squareWidth(d); })
	        .attr("height", function (d) { return squareWidth(d); })
	        .attr("rx", 1)
		.attr("ry", 1)
		.style("stroke", function (d) { return colorize(d.model); })
		.style("fill", function (d) { return colorize(d.model); })
	        .append("title")
	        .text(function (d) { return "breaches:"+ d.x +"var: "+ d.y; })
                ;

        

        squares .exit();
        
        
        sortedGlobalResults = globalResults.slice();
        sortedGlobalResults.sort( function(a,b) {
                if ( Math.abs(a.breaches) < Math.abs(b.breaches) ){
                        return -1;
                        }
                else {
                        return 1;
                        }
                });
        
        console.log(sortedGlobalResults);
        
        //update html
        ret = Math.round( ( 1 - Math.exp(sortedGlobalResults[0].var) ) * globalCurrentPrice * 100 ) / 100;
        console.log( ret );
        document.getElementById('varResult').innerHTML = "$" + ret;
        document.getElementsByTagName('title')[0].innerHTML = Math.round(100 * globalResults.length / lbXsm.length)/100 + "% - VaR Backtesting";
        
        }

function colorize(str) {
        for (
            var i = 0, hash = 0; i < str.length;
            hash = str.charCodeAt(i++) + ((hash << 5) - hash));
            color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
        return '#' + Array(6 - color.length + 1).join('0') + color;
}
     

function wipe(){
        globalResults = [];
        d3        .select("svg")
                                .selectAll("g")
                                .remove();
        }
		        
        
        
    

        
     


