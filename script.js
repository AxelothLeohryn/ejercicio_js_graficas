let movies = [];
let dates = [];

let names = [];
let moviesCount = [];

function getMovies() {
  return fetch("https://swapi.dev/api/films/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        movies.push(data.results[i].title);
        dates.push(data.results[i].release_date.slice(0, 4));
      }
      console.log(movies);
      console.log(dates);

      new Chartist.Line(
        ".ct-chart",
        {
          labels: movies,
          series: [dates],
        },
        {
          fullWidth: true,
          chartPadding: {
            right: 40,
          },
        }
      );
    });
}
getMovies();

function getCharacters() {
  return fetch("https://swapi.dev/api/people/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        names.push(data.results[i].name);
        moviesCount.push(data.results[i].films.length);
      }
      console.log(names);
      console.log(moviesCount);

      var data = {
        labels: names,
        series: [moviesCount],
      };
      var options = {
        seriesBarDistance: 10,
      };
      var responsiveOptions = [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              },
            },
          },
        ],
      ];
      new Chartist.Bar(".ct-chart2", data, options, responsiveOptions);
    });
}
getCharacters();
