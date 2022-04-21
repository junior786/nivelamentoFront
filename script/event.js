
const events = [];
const guests = [];
var guestInEvent = [];

async function getApiEvent() {
    const urlEvent = 'http://127.0.0.1:8080/api/event';
    const options = {
        method: 'GET',
    }
    await fetch(urlEvent, options)
        .then(response => response.json())
        .then(json => json.forEach(x => events.push(x)))
}

async function getApiGuest() {
    const urlGuest = 'http://127.0.0.1:8080/api/guest';
    const options = {
        method: 'GET',
    }
    await fetch(urlGuest, options)
        .then(response => response.json())
        .then(json => json.forEach(x => guests.push(x)))
    console.log(events);
}



function createRowEvent(data) {
    console.log('EVENT', data);
    const table = document.querySelector('.events');
    const tr = document.createElement('tr');
    const tdNome = document.createElement('td');
    const tdEndereco = document.createElement('td');
    const ol = document.createElement('ul');
    tdNome.textContent = data.name;
    tdEndereco.textContent = data.address;
    tr.appendChild(tdNome);
    tr.appendChild(tdEndereco);
    data.guests.forEach(guest => {
        ol.appendChild(createList(guest.name));
    })
    tr.appendChild(ol);
    table.appendChild(tr);
}

async function createTable() {
   await getApiEvent();
    console.log(events.length)
    events.map(data => {
        if (!!data) {
            createRowEvent(data);
        }
    })
}
async function createTableGuest() {
    await getApiGuest();
    guests.forEach(data => {
        if (!!data) {
            addRowGuest(data);
        }
    })
}

function createList(name) {
    const list = document.createElement('li')
    list.textContent = name;
    return list;
}

function clearColor() {
    document.querySelectorAll('tr').forEach(x => {
        guestInEvent.forEach(guest => {
            if (x === guest.id) {
                x.style.backgroundColor = "#F1F1F1F1"
            }
        })
    })
}

function codeRepeat(tr, tdId) {
    guestInEvent.forEach(x => {
        if (x.id === tdId) {
            tr.style.backgroundColor = "transparent"
        }
    })
}

function saveEvent() {
    const name = document.querySelector('#event-name').value;
    const address = document.querySelector('#event-address').value;
    const guests = guestInEvent.map(x => {
        return { id: parseInt(x.id), name: x.name }
    })
    const eventBody = {
        name,
        address,
        guests
    }
    console.log('saveEvent', guests)
    createRowEvent(eventBody);
    saveEventBody(eventBody);
}

async function saveEventBody(value) {
    const urlGuest = 'http://127.0.0.1:8080/api/event';
    console.log('SaveEvent', saveEventBody)
    await fetch(urlGuest, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: value.name, address: value.address, guests: value.guests })
    })
}

function saveGuest() {
    const valueGuest = document.querySelector('.input-guest');
    save(valueGuest.value);
}


function selectGuest(tr, tdId, tdName) {
    clearColor();
    tr.style.backgroundColor = '#f1f1f1';
    const valid = guestInEvent.filter(guest => guest.id === tdId).length === 0;
    if (valid) {
        const body = {
            id: tdId, 
            name: tdName
        }
        guestInEvent.push(body);
        console.log(guestInEvent)
        clearColor();
    } else {
        codeRepeat(tr, tdId);
        console.log('else', guestInEvent)
        guestInEvent = guestInEvent.filter(guest => guest.id !== tdId);
    }
}

createTableGuest();
createTable();