function getPlots(sample_id) {
	//Read samples.json
		d3.json("samples.json").then (sampledata =>{
			console.log(sampledata)
			var result_ids = sampledata.samples.filter(row => row.id === sample_id)[0]
			console.log(result_ids.sample_values+"This is result ids")
			var ids = result_ids.otu_ids;
			console.log(ids)
			var sampleValues =  result_ids.sample_values.slice(0,10).reverse();
			console.log(sampleValues)
			var labels =  result_ids.otu_labels.slice(0,10);
			console.log (labels)
		// get only top 10 otu ids for the plot OTU and reversing it. 
			var OTU_top = ( result_ids.otu_ids.slice(0, 10)).reverse();
		// get the otu id's to the desired form for the plot
			var OTU_id = OTU_top.map(d => "OTU " + d);
			console.log(`OTU IDS: ${OTU_id}`)
		 // get the top 10 labels for the plot
			var labels =  result_ids.otu_labels.slice(0,10);
			console.log(`OTU_labels: ${labels}`)
			var trace = {
				x: sampleValues,
				y: OTU_id,
				text: labels,
				marker: {
				color: 'blue'},
				type:"bar",
				orientation: "h",
			};
			// create data variable
			var data = [trace];
	
			// create layout variable to set plots layout
			var layout = {
				title: "Top 10 OTU",
				yaxis:{
					tickmode:"linear",
				},
				margin: {
					l: 100,
					r: 100,
					t: 100,
					b: 30
				}
			};
	
			// create the bar plot
		Plotly.newPlot("bar", data, layout);
			// The bubble chart
			var trace1 = {
				x: result_ids.otu_ids,
				y: result_ids.sample_values,
				mode: "markers",
				marker: {
					size: result_ids.sample_values,
					color: result_ids.otu_ids
				},
				text:  result_ids.otu_labels
	
			};
	
			// set the layout for the bubble plot
			var layout_2 = {
				xaxis:{title: "OTU ID"},
				height: 600,
				width: 1000
			};
	
			// creating data variable 
			var data1 = [trace1];
	
		// create the bubble plot
		Plotly.newPlot("bubble", data1, layout_2); 
		
		});
	}  
	// create the function to get the necessary data
	function getDemoInfo(id) {
	// read the json file to get data
		d3.json("samples.json").then((data)=> {
	// get the metadata info for the demographic panel
			var metadata = data.metadata;
	
			console.log(metadata)
	
		  // filter meta data info by id
		   var result = metadata.filter(meta => meta.id.toString() === id)[0];
		  // select demographic panel to put data
		   var demographicInfo = d3.select("#sample-metadata");
			
		 // empty the demographic info panel each time before getting new id info
		   demographicInfo.html("");
	
		 // grab the necessary demographic data data for the id and append the info to the panel
			Object.entries(result).forEach((key) => {   
				demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
			});
		});
	}
	// create the function for the change event
	function optionChanged(id) {
		getPlots(id);
		getDemoInfo(id);
	}
	
	// create the function for the initial data rendering
	function init() {
		// select dropdown menu 
		var dropdown = d3.select("#selDataset");
	
		// read the data 
		d3.json("./static/data/samples.json").then((data)=> {
			console.log(data)
	
			// get the id data to the dropdwown menu
			data.names.forEach(function(name) {
				dropdown.append("option").text(name).property("value");
			});
	
			// call the functions to display the data and the plots to the page
			getPlots(data.names[0]);
			getDemoInfo(data.names[0]);
		});

		// Enter a speed between 0 and 180
var level = 175;

// Trig to calc meter point
var degrees = 180 - level,
	 radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
	 pathX = String(x),
	 space = ' ',
	 pathY = String(y),
	 pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
	marker: {size: 28, color:'850000'},
	showlegend: false,
	name: 'speed',
	text: level,
	hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
			'Slow', 'Super Slow', ''],
  textinfo: 'text',
  textposition:'inside',	  
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
						 'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
						 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
						 'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Gauge</b> <br> Speed 0-100',
  height: 1000,
  width: 1000,
  xaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('myDiv', data, layout, {showSendToCloud:true});

	}

	init();