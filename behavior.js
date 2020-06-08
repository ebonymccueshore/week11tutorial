const myDivEl = document.getElementById("myDiv");
const selectEl = document.getElementById("countrySelector");

Plotly.d3.csv("share-of-the-population-with-completed-tertiary-education.csv",getThisData);

//function to get only unique country names
function uniqueValuesInArray(array) {
	return Array.from(new Set(array));
}

function getThisData(csvData) {
    const yearNames = uniqueValuesInArray(csvData.map((row) => row.year));

    yearNames.forEach((year) => {

      const option = document.createElement("option");
      option.textContent = year;

      selectEl.appendChild(option);
    });

    selectEl.addEventListener("change", function (e) {
      setPlot(e.target.value, csvData);
    });
  
    setPlot("1970", csvData);
  }

function setPlot(chosenYear, csvData) {

    const chosenYearEducation = csvData
    .filter((row) => row.year === chosenYear)
    .map((row) => +row.percent);

    const chosenCountry = uniqueValuesInArray(

      csvData.filter((row) => row.year === chosenYear).map((row) => row.country)

    );

      const trace = {
          x: chosenCountry,
          y: chosenYearEducation,
          mode: "lines",
          marker: {
            size: 10,
            opacity: 5,
           
           },
      };

      const data = [trace];

      const layout = {
        title: `Percentage of completed Tertiary education in <b style="color: Teal;">${chosenYear}</b>`,
      };

      Plotly.newPlot(myDivEl, data, layout);

}



