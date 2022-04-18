async function save(value) {
    const urlGuest = 'http://127.0.0.1:8080/api/guest';
   
    await fetch(urlGuest, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:value })
    })
        .then(response => response.json())
        .then(json => addRowGuest(json))
}
function saveGuest() {
    const valueGuest = document.querySelector('.input-guest');
    save(valueGuest.value);
    console.log(guests);
}


const addRowGuest = (guest) => { 
    if (guest){
        const table = document.querySelector('.guest');
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdName = document.createElement('td');
        tdId.textContent = guest.id;
        tdName.textContent = guest.name;
        tr.appendChild(tdId);
        tr.appendChild(tdName)
        tr.onclick = function () { createEvent(tr, tdId) };
        table.appendChild(tr);
    
    }
}
