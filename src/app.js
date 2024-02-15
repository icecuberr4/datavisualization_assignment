import Chart from 'chart.js/auto'
const fs = require("fs")

const readFile_ = ()=> {
  const response = fs.readFileSync("./top50movies.json",(data)=> {
    return data
  })

  return JSON.parse(response);

}
const createData_base = ()=> {
  let data = []
  readFile_().map((movie)=> {
      let object = {            
          rating_avg: movie.vote_average,
          votes: movie.vote_count,
          name: movie.title
      }
      data.push(object)
  })
  return data
}
const createData_name = ()=> {
    let data = []
    readFile_().map((movie)=> {
        
        data.push(movie.title)
    })
    return data
}
(async function() {
  const data = createData_base();
  console.log(data.length);
  new Chart(
    document.getElementById('chart_c'),
    {
      type: 'bubble',
      data: {
        labels: "Movies",
        datasets: [
          {
            label: "Movies",
            data: data.map(row => ({
              x: row.rating_avg,
              y: row.votes,
              r: 4,
              movie_name: row.name,
              movie_rating: row.rating_avg
            })),
            backgroundColor: '#FF0000',
          }
        ]
      },
      options:{
        plugins:{
          tooltip:{
            callbacks:{
              label: (callback_)=>{
              const textToDisplay = callback_.raw.movie_name + ` | Rating: ${callback_.raw.movie_rating}`
              console.log(callback_.raw);
              return textToDisplay
        
              },
              title: ()=>"Movies"
            }
          }
        }
      }
    }
  );
})();

(async function() {
  const data = createData_base();
  console.log(data.length);
  new Chart(
    document.getElementById('chart_c1'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: 'Vote Count',
            data: data.map(row => row.votes),
            backgroundColor: ["FF0000"]
          }
        ]
        
      }
    }
  );
})();

function displayJSON(data) {
  const jsonViewer = document.getElementById('json-viewer');
  jsonViewer.innerText = JSON.stringify(readFile_(), null, 2);
}

// Call the function to display JSON data
displayJSON(jsonData);