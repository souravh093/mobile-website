const loadPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}


    const displayPhone = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = '';

    const showAll = document.getElementById('showAll');
    if (dataLimit && phones.length > 10) {
        // display only 10 phones
        phones = phones.slice(0, 10);
        showAll.classList.remove('hidden')
    }else {
        showAll.classList.add('hidden');
    }

    // display no phones
    const noPhone = document.getElementById('noPhone')
    if (phones.length === 0) {
        noPhone.classList.remove('hidden');
    }else {
        noPhone.classList.add('hidden');
    }
    // display all phones
    phones.forEach( element => {
        const {image, brand, phone_name, slug} = element;
        const phone = document.createElement('div');
        phone.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
        <figure><img src="${image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone_name}</h2>
          <p>Brand: ${brand}</p>
          <div class="card-actions justify-end">
            <label for="my-modal-3" onclick="loadPhoneDetails('${slug}')" class="btn btn-info rounded-xl text-gray-100">Show Details</label>
          </div>
        </div>
      </div> 
        `

        phoneContainer.appendChild(phone);
    });
    // stop loader
    toggleSpinner(false);
}

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    mobileDetails(data.data);
}

const mobileDetails = phone => {
    const modalTitle = document.getElementById('phoneTitle');
    modalTitle.innerText = phone.name;
    const modalImage = document.getElementById('phoneImage');
    modalImage.innerHTML = ` 
        <image src="${phone.image}">
    `
    const modalInformation = document.getElementById('informationContainer');
    modalInformation.innerHTML = `
                    <tr>
                      <td id="storage">Release Date:</td>
                      <td >${phone.releaseDate ? phone.releaseDate : 'Phone not release'}</td>
                    </tr>
                    <tr>
                      <td id="storage">Storage:</td>
                      <td >${phone.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                      <td id="storage">Display Size:</td>
                      <td >${phone.mainFeatures.displaySize}</td>
                    </tr>
                    <tr>
                      <td id="storage">Chipset:</td>
                      <td >${phone.mainFeatures.chipSet}</td>
                    </tr>
                    <tr>
                      <td id="storage">Memory:</td>
                      <td >${phone.mainFeatures.memory}</td>
                    </tr>
                    
    `
}



const processSearch = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById('searchField').value;
    loadPhones(searchField, dataLimit);
}

document.getElementById('searchBtn').addEventListener('click', () => {
    processSearch(10);
})

document.getElementById('searchField').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processSearch(10);
    }
    
})

const toggleSpinner = isLoading => {
    const loaderContainer = document.getElementById('loader');
    if (isLoading) {
        loaderContainer.classList.remove('hidden');
    }else {
        loaderContainer.classList.add('hidden');
    }
}




// not the best way to load the show all
document.getElementById('showAllBtn').addEventListener('click', () => {
    processSearch();
})




loadPhones('iphone')