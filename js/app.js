const loadPhones = async (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}


const displayPhone = phones => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = '';

    // display only 20 phones
    phones = phones.slice(0, 20);

    // display no phones
    const noPhone = document.getElementById('noPhone')
    if (phones.length === 0) {
        noPhone.classList.remove('hidden');
    }else {
        noPhone.classList.add('hidden');
    }
    // display all phones
    phones.forEach( element => {
        const {image, brand, phone_name} = element;
        const phone = document.createElement('div');
        phone.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
        <figure><img src="${image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone_name}</h2>
          <p>Brand: ${brand}</p>
          <div class="card-actions justify-end">
            <button class="px-3 text-xl rounded-xl py-2 text-gray-100 bg-gray-400">Buy Now</button>
          </div>
        </div>
      </div> 
        `

        phoneContainer.appendChild(phone);
    });
    // stop loader
    toggleSpinner(false);
}

document.getElementById('searchBtn').addEventListener('click', () => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById('searchField').value;
    loadPhones(searchField);
})

const toggleSpinner = isLoading => {
    const loaderContainer = document.getElementById('loader');
    if (isLoading) {
        loaderContainer.classList.remove('hidden');
    }else {
        loaderContainer.classList.add('hidden');
    }
}

loadPhones('iphone')