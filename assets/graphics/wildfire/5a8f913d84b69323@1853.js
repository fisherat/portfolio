import define1 from "./4c18891b086c8c1e@189.js";

function _1(md){return(
md`# CS215: In-class Activity on Making Maps in Observable (Spring 2026)

In this activity, you will (a) get some exposure to Javascript and Observable notebooks, (b) make some basic maps.

First, make sure to **fork this notebook** (so you can save changes you make).

Part 0 is a short demo, making a map of Professor Wirfs-Brock's location data.

Part 1 is a tutorial (authored by Observable team members [Allison Horst](https://observablehq.com/@allisonhorst), [Fil](https://observablehq.com/@fil), and [Paul Buffa](https://observablehq.com/@pstuffa)). __Step through the tutorial and make sure you complete all of the "Try it!" exercises indicated in blue.__

Part 2 is an open-ended exercise where you will import some new data (on wildland fires) and make your own map.

If you get stuck, here are some other resources:
* [Learn Just Enough Javascript: Python Users](https://observablehq.com/@observablehq/learn-just-enough-javascript-python-users?collection=@observablehq/observable-for-python-users)
* [Observable for Jupyter Users](https://observablehq.com/@observablehq/observable-for-jupyter-users?collection=@observablehq/observable-for-jupyter-users)
* [Plot](https://observablehq.com/@observablehq/plot?collection=@observablehq/plot)
* [Mapping with Plot](https://observablehq.com/@observablehq/plot-mapping?collection=@observablehq/plot)`
)}

function _2(md){return(
md`## Part 0: Importing and plotting Prof. W-B's location

First we need to get the data (in the form of a csv file) into the notebook. We can do this by clicking the paperclip icon at the right of the page. (_Note: I have already updated the CSV file of my location, but you can upload additional data, like your own location, if you want to practice further.)_`
)}

function _profWBLocationEdited(__query,FileAttachment,invalidation){return(
__query(FileAttachment("prof-W-B-location-edited.csv"),{from:{table:"prof-W-B-location-edited"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:["","Unnamed: 0","lat","lon","timestamp","datetime","time_delta"]}},invalidation)
)}

function _5(md){return(
md`First let's make a basic basemap of the U.S.:`
)}

function _6(Plot,nation,counties,statemesh,profWBLocationEdited){return(
Plot.plot({ // Initialize the plot
  projection: "albers-usa", // Set the projection
  marks: [
    Plot.geo(nation), // Add in country outline
    Plot.geo(counties, {strokeOpacity: 0.1}), // counties, can control thickness of outline
    Plot.geo(statemesh, {strokeOpacity: 0.3}), // states, can control thickness of outline

// This part adds in Prof WB's locations as points
// Delete the comments to make them show up on the map
    
Plot.dot(profWBLocationEdited, {
    x: "lon",
   y: "lat",
fill: "red",
   r: 1
 })
    
  ],
  height: 500, // Update canvas height
  width: 800, // Update canvas width
  margin: 50 // Update margins
})
)}

function _nation(topojson,us){return(
topojson.feature(us, us.objects.nation)
)}

function _counties(topojson,us){return(
topojson.feature(us, us.objects.counties)
)}

function _statemesh(topojson,us){return(
topojson.mesh(us, us.objects.states)
)}

function _10(md){return(
md`Ok, this is cool... but let's zoom in on Walla Walla so we can get a better view...

To do this, I adapted the example at: https://observablehq.com/plot/features/projections`
)}

function _11(Plot,circle,nation,counties,statemesh,profWBLocationEdited){return(
Plot.plot({
  projection: {
    type: "albers-usa",
    rotate: [118, 46], // center of map 
    domain: circle, 
    inset: 15
  },
  marks: [
    Plot.geo(nation),
    Plot.geo(counties, {strokeOpacity: 0.1}),
    Plot.geo(statemesh, {strokeOpacity: 0.3}),
    Plot.geo(circle, {stroke: "red", strokeWidth: 2}),
    Plot.dot(profWBLocationEdited, {
      x: "lon",
      y: "lat",
      fill: "red",
      r: 1
    })
  ]
})
)}

function _circle(d3){return(
d3.geoCircle().center([-118.25,46.10]).radius(0.15).precision(2)()
)}

function _13(try_it,htl){return(
try_it(htl.html` <b>Try it!</b> How might you change this map? What happens if you change the radius, the center of the circle, or the rotation of the projection? Try changing these parameters in the code above to make a better map.`)
)}

function _14(md){return(
md`## Part 1: Build your first map with Observable Plot`
)}

function _15(md){return(
md`This tutorial walks through the process of building a bubble map (and beyond!) of United States power plant capacities in Observable Plot. Here’s a preview of what we’ll make: `
)}

function _bubbles(FileAttachment){return(
FileAttachment("bubbles.png").image({width: 700})
)}

function _17(md){return(
md`---
## Introduction`
)}

function _18(md){return(
md`[**Plot.geo**](https://observablehq.com/@observablehq/plot-geo) draws geographic features and other polygonal geometry, and combined with other marks (_e.g._ dot, line, density, etc.) provides a user-friendly way to build maps with [Observable Plot](https://observablehq.com/@observablehq/plot-mapping). 

The aim of this tutorial is to get you up-and-running with your first map in Plot, focusing on: 

- Using Plot.geo in combination with other Plot marks
- Customizing the map (updating aesthetics, and adding layers)
- Extending your knowledge and data to new map types

You can temporarily make edits to this notebook in [tinker mode](https://observablehq.com/@observablehq/tinker-mode). To store your changes, [fork](https://observablehq.com/@observablehq/fork-suggest-merge) this notebook to make updates in your own copy. If you are new to Observable, we recommend checking out our [Learning Observable](https://observablehq.com/collection/@observablehq/intro-to-observable) course, which introduces notebooks, cells, accessing data, and Observable Plot.`
)}

function _19(md){return(
md`---
## Meet the data`
)}

function _20(md){return(
md`We will create and customize a bubble map of power plants in the United States, with bubble radius representing the plant capacity (in megawatts). The data is published in the US Energy Information Administration’s [US Energy Atlas](https://atlas.eia.gov/datasets/eia::power-plants/about).

A preview of the power plant data (from the attached us_power_plants.csv file) is shown below in a [Data Table](https://observablehq.com/@observablehq/data-table-cell) cell. See [Learning Observable](https://observablehq.com/@observablehq/learning-observable-getting-data-into-observable?collection=@observablehq/intro-to-observable) for an introduction to getting data into Observable notebooks.`
)}

function _us_power_plants(__query,FileAttachment,invalidation){return(
__query(FileAttachment("us_power_plants.csv"),{from:{table:"us_power_plants"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _22(md){return(
md`The us_power_plants data provides the location and capacity of power plants. We also need a base map of the United States to place those bubbles on for spatial context. For our base map, we’ll use state boundaries from the attached us-counties-10m.json file. `
)}

function _23(md){return(
md`First, we import us-counties-10m.json into the notebook:`
)}

function _us(FileAttachment){return(
FileAttachment("us-counties-10m.json").json()
)}

function _25(md){return(
md`Then, we access the state borders:`
)}

function _states(topojson,us){return(
topojson.feature(us, us.objects.states)
)}

function _27(md){return(
md`Now, with the power plant locations (us_power_plants) and state borders (states) ready to go, we can start building our map. `
)}

function _28(md){return(
md`---
## A basic bubble map: US power plant locations and capacity`
)}

function _29(md){return(
md`To create the bubble map, we need to give Plot some essential information: 

1. A projection. Here, we’ll use “albers-usa”. Adding a projection will apply the projection function to _all_ the marks in the chart. For example, points created in a Plot.dot layer will be updated using the same projection function as a basemap created with Plot.geo. Learn more about Observable [Plot projections](https://observablehq.com/@observablehq/plot-projections).
2. The state boundaries (states)
3. Power plant locations (with longitude and latitude as x and y, respectively), from the us_power_plants data, added as dots using [Plot.dot](https://observablehq.com/@observablehq/plot-dot). That’s right — the marks you are already using in Plot can often be used in combination with Plot.geo!
4. Dot radius (r), dependent on Total_MW (total capacity, megawatts) for each plant

The code and output below show the bubble map produced only using those essential pieces of information, plus a few optional updates to the canvas dimensions.`
)}

function _30(Plot,states,us_power_plants){return(
Plot.plot({ // Initialize the plot
  projection: {
    type: "albers-usa"
  }, // Set the projection
  marks: [
    Plot.geo(states), // Add the state boundaries
    Plot.dot(us_power_plants, { // Create dot marks (bubbles) using data from power_plants
      x: "longitude", // Provide longitude values
      y: "latitude", // Provide latitude values
      r: "Total_MW" // Update bubble radius based on this variable's value
    })
  ],
  height: 500, // Update canvas height
  width: 800, // Update canvas width
  margin: 50 // Update margins
})
)}

function _31(try_it,htl){return(
try_it(htl.html`<b>Try it!</b> What if you only want to plot the <b>location</b> of the power plants in the map above, and aren't interested in the plant capacity? In the cell above, update the radius to a constant (<i>e.g.</i> r: 1) to see how the map changes.`)
)}

function _32(md){return(
md`So we’ve made our first bubble map. Hooray! And also, yikes — this could really use some work to make it more readable and meaningful. For example, the overlapping circles are hard to read, and there is potentially important information missing (like power source). In the next section, we’ll explore a few ways to customize our map.`
)}

function _33(md){return(
md`---
## Map customization`
)}

function _34(md){return(
md`Okay, so we have some work to do. Good news: you can customize maps built in Observable Plot with simple additional options in the marks’ definitions.`
)}

function _35(md){return(
md`As a start, we’ll:
- Add channels to update states **fill** and border color (**stroke**)
- Update the bubble **fill** color to depend on primary source
- Add a **legend** so that the bubble color is meaningful
- Reduce the point **opacity** to reveal overlapping points
- Limit the radius size **range** to make the map more readable`
)}

function _36(md){return(
md`Check out the [Plot Cheatsheets](https://observablehq.com/@observablehq/plot-cheatsheets) to learn more about customizing charts. All the mark types in Plot (including Plot.geo) can be configured in similar ways — whether it’s scatterplots, maps, histograms. `
)}

function _37(Plot,states,us_power_plants){return(
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(states, { fill: "white", stroke: "#e2e2e2" }), // Updated stroke color for state boundaries
    Plot.dot(us_power_plants, {
      x: "longitude",
      y: "latitude",
      r: "Total_MW",
      fill: "PrimSource", // Update dot fill color to depend on primary source (variable: PrimSource)
      opacity: 0.7 // Decrease opacity (0 = transparent, 1 = opaque)
    })
  ],
  r: { range: [1, 15] }, // Limit the size range for dot radii
  color: { legend: true }, // Include a legend for the fill color
  height: 500,
  width: 800,
  margin: 50
})
)}

function _38(try_it,htl){return(
try_it(htl.html`<b>Try it!</b> Update the <b>dot radius range</b>, <b>dot opacity</b> and <b>states fill color</b> in the cell above to see how the map changes.`)
)}

function _39(md){return(
md`Using default settings for a [continuous radius scale in Plot](https://observablehq.com/@observablehq/plot-scales#cell-80), a zero value maps to zero for an accurate areal encoding. In the map above, that would make power plants with very low capacities difficult (or impossible) to see. So that low-capacity plants are visible on the map, we’ve updated the lower limit of our radius range to 1.`
)}

function _40(md){return(
md`Now, we can start considering some patterns. For example: 

- Where do we see concentrations of hydroelectric power plants?
- Do most wind plants exist within the Midwestern wind belt, where the [highest average wind speeds](https://windexchange.energy.gov/maps-data/319) occur?
- What other interesting clusters or patterns do you notice in the data?`
)}

function _41(md){return(
md`Let’s build up from our functional bubble map and see how we can continue adding layers with different marks. `
)}

function _42(md){return(
md`---
## Building maps, layer by layer`
)}

function _43(md){return(
md`It’s often useful to layer multiple marks atop one another when creating maps. For example, you may want to view point locations of wind turbines overlayed onto contours of average wind speeds. Or — as we’ll practice here — you may want to add helpful text labels to highlight notable locations, values or patterns. `
)}

function _44(md){return(
md`Let’s add text labels to US power plants with total capacity exceeding 3,500 MW. We’ll add a layer to our map using [Plot's text mark](https://observablehq.com/@observablehq/plot-text), then update the appearance and position. `
)}

function _45(Plot,states,us_power_plants){return(
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(states, { fill: "white", stroke: "#e2e2e2"  }),
    Plot.dot(us_power_plants, {
      x: "longitude",
      y: "latitude",
      r: "Total_MW",
      fill: "PrimSource",
      opacity: 0.7
    }),
    Plot.dot(us_power_plants, { // Can you figure out what this additional Plot.dot layer adds?
      x: "longitude",
      y: "latitude",
      r: "Total_MW",
      fill: "PrimSource",
      stroke: "black",
      filter: d => d.Total_MW > 3500
    }),
    Plot.text(us_power_plants, { // Add text to the map using data from us_power_plants
      x: "longitude", // Place text horizontally at plant longitude
      y: "latitude", // Place text vertically at plant latitude
      text: "Plant_Name", // The text that appears is the value from the Plant_Name column,
      filter: (d) => d.Total_MW > 3500, // Only add text for plants with capacity exceeding 3500 MW
      fontSize: 12, // Increased font size
      fontWeight: 600, // Increased font weight
      stroke: "white", // Adds white outer stroke to text (for readability)
      fill: "black", // Text fill color
      textAnchor: "start", // Left align text with the x- and y-coordinates
      dx: 15 // Shifts text to the right (starting from left alignment with coordinate)
    })
  ],
  r: { range: [1, 15] },
  color: { legend: true },
  height: 500,
  width: 800,
  margin: 50
})
)}

function _46(try_it,htl){return(
try_it(htl.html`<b>Try it!</b> Update the <b>outline color</b>, <b>line weight</b> (hint: add a <i>strokeWidth</i> option), and <b>line color</b> for the labeled power plants. Then, update the text labels so that the <b>Utility_Name</b> is shown, change the <b>font size</b>, and <b>update text alignment</b> so that labels are to the right of the bubble.`)
)}

function _47(md){return(
md`In the map above, text labels are added in the Plot.text layer. Additionally, a second Plot.dot layer is added to highlight labeled plants by making their dots opaque (the default if no opacity is specified) and adding a black border. 
`
)}

function _48(md){return(
md`
**Takeaway:** different marks can be layered together to add context and meaning to your maps.

If you’re new to JavaScript, the notation in those filtering steps (d => d.something...) might look unfamiliar. That’s called _arrow function notation_, which provides a concise way of writing a function. In this case, it checks the value of the Total_MW column in us_power_plants, only including rows if the value is greater than 3,500. Learn more about writing functions in JavaScript: [Learn Just Enough JavaScript: Introduction](https://observablehq.com/@observablehq/learn-javascript-introduction?collection=@observablehq/tutorial#cell-129).`
)}

function _49(md){return(
md`---
## Other map types at-your-fingertips`
)}

function _50(md){return(
md`We can use many [of Observable Plot’s existing marks](https://observablehq.com/@observablehq/plot-mapping) to add map layers, which means we can quickly switch between and tinker with different map types with relatively minor code changes or additions. 

Below, we use [Plot.density](https://observablehq.com/@observablehq/plot-density) to visualize the highest concentrations of US power plants (weighted by capacity). The weight channel is used to signify that some points have proportionally more influence than others. We’ve also made the map interactive by connecting it to an [Input](https://observablehq.com/@observablehq/inputs) (in this case, a menu that allow to selects one or several sources of primary energy).`
)}

function _selectSource(Inputs,us_power_plants){return(
Inputs.select(us_power_plants.map(d => d.PrimSource),
  { unique: true, label: "Select primary source(s):", multiple: true, value: ["coal", "nuclear", "hydroelectric", "wind"] }
)
)}

function _52(Plot,states,us_power_plants,selectSource,d3){return(
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(states, { fill: "white", stroke: "#e2e2e2" }),
    Plot.dot(us_power_plants, {
      x: "longitude",
      y: "latitude",
      r: "Total_MW",
      stroke: "PrimSource",
      strokeOpacity: .5,
      opacity: d => selectSource.includes(d.PrimSource) ? 0.7 : 0,
    }),
    Plot.density(us_power_plants, {
      x: "longitude",
      y: "latitude",
      bandwidth: 10,
      thresholds: 10,
      stroke: "PrimSource",
      fill: "PrimSource",
      fillOpacity: 0.25,
      opacity: d => selectSource.includes(d.PrimSource) ? 0.7 : 0, // (transparent unless source selected)
      mixBlendMode: "multiply", 
      weight: "Total_MW"
    })
  ],
  height: 500,
  width: 800,
  margin: 50,
  density: {
    domain: [100, 2000]
  },
  r: { range: [1, 15], domain: d3.extent(us_power_plants, (d) => d.Total_MW) },
  color: { legend: true }
})
)}

function _53(md){return(
md`Or, by slightly updating the code, we can create a hexbin map to show counts of plants near different locations:`
)}

function _54(Plot,states,us_power_plants){return(
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(states, { fill: "#eaeaea", stroke: "white" }),
    Plot.dot(
      us_power_plants,
      Plot.hexbin(
        { r: "count", fill: "count" },
        { x: "longitude", y: "latitude" }
      )
    )
  ],
  height: 500,
  width: 800,
  margin: 50,
  r: { range: [0, 15] },
  color: {
    legend: true,
    label: "Number of power plants:",
    scheme: "cool"
  }
})
)}

function _55(md){return(
md`---
## Wrap-up`
)}

function _56(md){return(
md`So there you have it — your first map (maps, even!) made with Plot. Several major takeaways from this tutorial: 

- Create maps with Observable Plot using Plot.geo in combination with other marks
- The projection is applied to Plot.geo _and_ other marks
- Customize maps in Plot using channels and syntax used in other chart types, and by adding additional layers for context and meaning
- You can quickly switch between or tinker with many different map types
`
)}

function _57(md){return(
md`This is a first taste of map making in Plot. To learn more, visit: 

- [Mapping with Plot](https://observablehq.com/@observablehq/plot-mapping)
- [Plot.geo documentation](https://observablehq.com/@observablehq/plot-geo)
- [Plot: Projections](https://observablehq.com/@observablehq/plot-projections)
- [Build your first choropleth map with Observable Plot](https://observablehq.com/@observablehq/build-your-first-choropleth-map-with-observable-plot)`
)}

function _58(md){return(
md`---`
)}

function _59(md){return(
md`## Part 2: Build your own map using the wildland fire dataset

In this section, you will use what you've just learned to make a map of recent wildland fires in the U.S.`
)}

function _60(md){return(
md`### Step 1: Import the fire dataset
We'll be using a file called Wildland_Fire_Incident_Locations.csv, which you can download from Canvas. This dataset has all of the fires reported from roughly March 2021 to March 2022. It comes from the [National Interagency Fire Center](https://www.nifc.gov/fire-information/maps).

If you are unsure how to import data, refer back to the ["Importing Data" section from the "Learn Just Enough JavaScript"](https://observablehq.com/@observablehq/learn-just-enough-javascript-python-users#cell-387) notebook I assigned you to review.`
)}

function _Wildland_Fire(FileAttachment){return(
FileAttachment("Wildland_Fire_Incident_Locations.csv").csv({typed: true})
)}

function _62(md){return(
md`### Step 2: Make a basic map
Make a map of the U.S. On that map, display the wildfires. You can style it however you want, but here are some things you might try:
* making the size of each marker correspond to to the IncidentSize (or some other attribute)
* making the color of each marker correspond to the FireCause (or some other attribute)
* making the marks opaque
* including a legend`
)}

function _63(Plot,states,Wildland_Fire){return(
Plot.plot( {
  projection: "albers-usa",
  marks: [
    Plot.geo(states, { fill: "white", stroke: "#e2e2e2" }),
    Plot.dot(Wildland_Fire.filter(d => d.X && d.Y), {
      x: d => +d.X, 
      y: d => +d.Y,
      r: d => +d.IncidentSize,
      fill: "FireCause",
      fillOpacity: .45,
      opacity: d => 1 ,
     
    }),
  ],
  height: 500,
  width: 800,
  margin: 50,
  r: {
    type: "sqrt",
    domain: [0,50000],
    range: [5, 25]
  },
  color: {
    domain: ["Human", "Natural", "Undetermined", "Unknown", "null"], 
    range: ["red", "blue", "pink", "orange", "black"], 
    legend: true }
})
)}

function _64(md){return(
md`### Step 3: Annotate the map
Similar to how in the power plants map you called out large power plants, make a filter to show the largest fires and display some information about them in the form of text.`
)}

function _65(Plot,states,Wildland_Fire){return(
Plot.plot( {
  projection: "albers-usa",
  marks: [
    Plot.geo(states, { fill: "white", stroke: "#e2e2e2" }),
    Plot.dot(Wildland_Fire.filter(d => d.X && d.Y && d.IncidentSize > 50000), {
      x: d => +d.X, 
      y: d => +d.Y,
      r: d => +d.IncidentSize,
      fill: "FireCause",
      fillOpacity: .45,
      opacity: d => 1 ,
      tip: true,
      title: d => {
      const days = Math.round((new Date(d.ContainmentDateTime) - new Date(d.DiscoveryDateTime)) / (1000 * 60 * 60 * 24));
      return `${d.IncidentName}\nSize: ${d.IncidentSize} acres\nDuration: ${isNaN(days) ? "Unknown" : days + " days"}`;
      }
    }),
  ],
  height: 500,
  width: 800,
  margin: 50,
  r: {
    type: "sqrt",
    domain: [0,50000],
    range: [5, 25]
  },
  color: {
    domain: ["Human", "Natural", "Undetermined", "Unknown", "null"], 
    range: ["red", "blue", "pink", "orange", "black"], 
    legend: true }
})
)}

function _66(md){return(
md`### Challenge: Add Interactivity
Similar to the example map above that used a drop-down menu, can you add an interactive element to your map using Observable's [Inputs](https://observablehq.com/@observablehq/inputs)?`
)}

function _minSize(Inputs){return(
Inputs.range([100,100000], {
  label: 'Minimum Fire Size [acres]',
  step: 50,
  value: 5000
})
)}

function _68(Plot,states,Wildland_Fire,minSize){return(
Plot.plot( {
  projection: "albers-usa",
  marks: [
    Plot.geo(states, { fill: "white", stroke: "#e2e2e2" }),
    Plot.dot(Wildland_Fire.filter(d => d.X && d.Y && d.IncidentSize > minSize), {
      x: d => +d.X, 
      y: d => +d.Y,
      r: d => +d.IncidentSize,
      fill: "FireCause",
      fillOpacity: .45,
      opacity: d => 1 ,
      tip: true,
      title: d => {
      const days = Math.round((new Date(d.ContainmentDateTime) - new Date(d.DiscoveryDateTime)) / (1000 * 60 * 60 * 24));
      return `${d.IncidentName}\nSize: ${d.IncidentSize} acres\nDuration: ${isNaN(days) ? "Unknown" : days + " days"}`;
      }
     
    }),
  ],
  height: 500,
  width: 800,
  margin: 50,
  r: {
    type: "sqrt",
    domain: [0,50000],
    range: [5, 25]
  },
  color: {
    domain: ["Human", "Natural", "Undetermined", "Unknown", "null"], 
    range: ["red", "blue", "pink", "orange", "black"], 
    legend: true }
})
)}

function _69(md){return(
md`---
## Appendix`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["prof-W-B-location-edited.csv", {url: new URL("./files/1e531e0ad84ae9d88a99e6b463d20609f7e9ab5b7b7d33a9ed1c2c43482086a850186914a774b54338c75a13cb47af84a1d770df9757db2d6858af46564fad4b.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["bubbles.png", {url: new URL("./files/910c3e3aede5825085d0765e749f85b898011e0427ec6ae34f2782878c61e8dc4efe543afe42d0cc3fc395e2aa42aa6dfeacd15cceefda35f82030bba14ea36a.png", import.meta.url), mimeType: "image/png", toString}],
    ["us_power_plants.csv", {url: new URL("./files/42ebb07693caf831d1519a69fee444de246ede2fa18d16469eed04124660b15ac4653698e6278fa263a74e5338eaed2aafa419fa599175662604ec5bffe0159f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["us-counties-10m.json", {url: new URL("./files/783cf2bf259e16d662d92c9f59ec97e564c50841c5984f2bb6f65a6d31f8c1b80846bffb65cb654dc2b587ac96f0007ab68c24bacce33655fd785e46020aff74.json", import.meta.url), mimeType: "application/json", toString}],
    ["Wildland_Fire_Incident_Locations.csv", {url: new URL("./files/ca7bd604e79e58001e91482fd5d8878862e828a20a1ee72e9110302413c8b9d263f9f87eeb8cb23877e9df5a0b68f275d4e4d2f2d071d68bca1ac5d035126432.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("profWBLocationEdited")).define("profWBLocationEdited", ["__query","FileAttachment","invalidation"], _profWBLocationEdited);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["Plot","nation","counties","statemesh","profWBLocationEdited"], _6);
  main.variable(observer("nation")).define("nation", ["topojson","us"], _nation);
  main.variable(observer("counties")).define("counties", ["topojson","us"], _counties);
  main.variable(observer("statemesh")).define("statemesh", ["topojson","us"], _statemesh);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Plot","circle","nation","counties","statemesh","profWBLocationEdited"], _11);
  main.variable(observer("circle")).define("circle", ["d3"], _circle);
  main.variable(observer()).define(["try_it","htl"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("bubbles")).define("bubbles", ["FileAttachment"], _bubbles);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("us_power_plants")).define("us_power_plants", ["__query","FileAttachment","invalidation"], _us_power_plants);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("states")).define("states", ["topojson","us"], _states);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["Plot","states","us_power_plants"], _30);
  main.variable(observer()).define(["try_it","htl"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["Plot","states","us_power_plants"], _37);
  main.variable(observer()).define(["try_it","htl"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["Plot","states","us_power_plants"], _45);
  main.variable(observer()).define(["try_it","htl"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("viewof selectSource")).define("viewof selectSource", ["Inputs","us_power_plants"], _selectSource);
  main.variable(observer("selectSource")).define("selectSource", ["Generators", "viewof selectSource"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","states","us_power_plants","selectSource","d3"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer()).define(["Plot","states","us_power_plants"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("Wildland_Fire")).define("Wildland_Fire", ["FileAttachment"], _Wildland_Fire);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer()).define(["Plot","states","Wildland_Fire"], _63);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer()).define(["Plot","states","Wildland_Fire"], _65);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer("viewof minSize")).define("viewof minSize", ["Inputs"], _minSize);
  main.variable(observer("minSize")).define("minSize", ["Generators", "viewof minSize"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","states","Wildland_Fire","minSize"], _68);
  main.variable(observer()).define(["md"], _69);
  const child1 = runtime.module(define1);
  main.import("try_it", child1);
  return main;
}
