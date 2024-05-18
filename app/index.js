const getAllWeather = async () => {
  const response = await fetch('https://freetestapi.com/api/v1/weathers');
  const data = await response.json()
  return data;
}

const hideElementById = (id) => {
  const element = document.getElementById(id)
  element.classList.add('hidden')
}

const showElementById = (id) => {
  const element = document.getElementById(id)
  element.classList.remove('hidden')
}


const handleSearch = (e) => {
  e.preventDefault()
  const keyword = e.target.keyword.value
  console.log(e.target.keyword.value)
  fetch(`https://freetestapi.com/api/v1/weathers?search=${keyword}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      showWeatherData(data)
    })
}


const showWeatherData = async (allData) => {
  let displayData
  if (!allData) {
    displayData = await getAllWeather();
  } else {
    displayData = allData
  }
  const searchResultContainer = document.getElementById('searchResult')
  hideElementById('screen');
  showElementById('searchResult')
  searchResultContainer.innerHTML = ""
  displayData.map(data => {
    const searchContent = document.createElement('div')
    searchContent.innerHTML = `      
    <div class="bg-[#282278] space-y-4 p-5 mb-5 rounded-xl">
      <div>
        <p class="font-semibold text-xl">${data?.city}</p>
        <p>${data?.country}</p>
      </div>
      <div class="flex justify-between">
        <div>
          <h1 class="text-4xl font-bold">${data?.temperature}&deg;c</h1>
          <h3 class="text-xl font-semibold">${data?.temperature - 2}&deg;c / ${data?.temperature + 3}&deg;c</h3> 
        </div>
        <button onclick="showWeatherDetails(${data?.id})" class="bg-purple-700 text-white font-semibold px-3 py-2 rounded-lg h-fit self-end">Details</button>
      </div>
    </div>`
    searchResultContainer.appendChild(searchContent);
  })

}

showWeatherData()

const showWeatherDetails = (id) => {
  hideElementById('searchResult');
  showElementById('screen')
  const screenContainer = document.getElementById('screen')
  screenContainer.innerHTML = ""
  const screenContent = document.createElement('div')
  fetch(`https://freetestapi.com/api/v1/weathers/${id}`)
    .then(res => res.json())
    .then(data =>
      screenContent.innerHTML = `      
      <div class="space-y-7 bg-[#282278] p-5 rounded-lg">
        <div>
          <p class="font-semibold text-xl">${data?.city}</p>
          <p>${data?.country}</p>
        </div>
        <div>
        <h1 class="text-4xl font-bold">${data.temperature}&deg;c</h1>
        <h3 class="text-xl font-semibold">${data?.temperature - 2}&deg;c / ${data?.temperature + 3}&deg;c</h3> 
      </div>
      </div>
      <div class="p-5 space-y-4">
        <div class="flex justify-between">
          <p>Latitude</p>
          <p>${data?.latitude}</p>
        </div>
        <div class="flex justify-between">
          <p>Longitude</p>
          <p>${data?.longitude}</p>
        </div>
        <div class="flex justify-between">
          <p>Wind Speed</p>
          <p>${data?.wind_speed}</p>
        </div>
        <div class="flex justify-between">
          <p>Sensaco termica</p>
          <p>${data?.weather_description}</p>
        </div>
      </div>`
    )
  screenContainer.appendChild(screenContent)
}
