let resultsContainer = document.getElementsByClassName("container")[0];
let searchInput = document.querySelector(".search-input");

const validateInput = (el) => {
  if (el.value === "") {
    resultsContainer.innerHTML =
      "<p>Type something in the above search input</p>";
  } else {
    generateResults(el.value);
  }
};

const generateResults = async (searchValue) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchValue}`
    );

    if (!response.ok) {
      throw new Error(
        `Wikipedia API request failed with status: ${response.status}`
      );
    }
    const data = await response.json();

    if (searchValue === "") {
      resultsContainer.innerHTML =
        "<p>Type something in the above search input</p>";
      return;
    }

    const results = data.query.search;
    const numberOfResults = results.length;
    resultsContainer.innerHTML = "";

    for (let i = 0; i < numberOfResults; i++) {
      const result = document.createElement("div");
      result.classList.add("results");

      const resultContent = `
        <div>
          <h3>${results[i].title}</h3>
          <p>${results[i].snippet}</p>
        </div>
        <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
      `;
      result.innerHTML = resultContent;
      resultsContainer.appendChild(result);
    }
  } catch (error) {
    console.error("Error fetching Wikipedia results:", error);
    resultsContainer.innerHTML =
      "<p>An error occurred while search for results. Please try again later.</p>";
  }
};

const debounce = function (fn, d = 700) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, d);
  };
};

const debounceForData = debounce(() => validateInput(searchInput), 600);


// JavaScript code before doing the task

// let resultsContainer = document.getElementsByClassName("container")[0];

// const validateInput = (el) => {
//     if(el.value === ""){
//         resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
//     }else{
//         generateResults(el.value, el)
//     }
// }

//  const generateResults = (searchValue, inputField) => {
//   fetch(
//         "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
//         + searchValue
//     )
//         .then(response => {
//             if (!response.ok) return;
//             const js = response.json();
//             return js
//         })
//     .then(data => {
//         let results = data.query.search
//         let numberOfResults = data.query.search.length
//         resultsContainer.innerHTML = ""
//         for(let i=0; i<numberOfResults; i++) {
//             let result = document.createElement("div")
//             result.classList.add("results")
//             result.innerHTML = `
//             <div>
//                 <h3>${results[i].title}</h3>
//                 <p>${results[i].snippet}</p>
//             </div>
//             <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank" >Read More</a>
//             `
//             resultsContainer.appendChild(result)
//         }
//         if(inputField.value === ""){
//             resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
//         }
//     })
// }
