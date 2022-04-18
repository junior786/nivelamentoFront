
const events = [];
const guests = [];
var guestInEvent = [];

async function getApi() {
    const urlEvent = 'http://127.0.0.1:8080/api/event';
    const urlGuest = 'http://127.0.0.1:8080/api/guest';
    
    const options = {
        method: 'GET',
    }
    await fetch(urlEvent, options)
        .then(response => response.json())
        .then(json => json.forEach(x => events.push(x)))

    await fetch(urlGuest, options)
        .then(response => response.json())
        .then(json => json.forEach(x => guests.push(x)))
}


async function createTable() {
    await getApi();
    const table = document.querySelector('.events');

    events.forEach(data => {
        if (!!data) {
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
    })
}
async function createTableGuest() {
    await getApi();
    const table = document.querySelector('.guest');

    guests.forEach(data => {
        if (!!data) {
            const tr = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdName = document.createElement('td');
            tdId.textContent = data.id;
            tdName.textContent = data.name;
            tr.appendChild(tdId);
            tr.appendChild(tdName)
            tr.onclick = function () { createEvent(tr, tdId) };
            table.appendChild(tr);
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
            if (x.innerHTML === guest) {
                x.style.backgroundColor = "#F1F1F1F1"
            }
        })
    })
}

function codeRepeat(tr, tdId) {
    guestInEvent.forEach(x => {
        if (x === tdId.innerHTML) {
            tr.style.backgroundColor = "transparent"
        }
    })
}

function createEvent(tr, tdId) {
    clearColor();
    tr.style.backgroundColor = '#f1f1f1';
    const valid = guestInEvent.filter(guest => guest === tdId.innerHTML).length === 0;
    if (valid) {
        guestInEvent.push(tdId.innerHTML);
        clearColor();
    }else {
        codeRepeat(tr, tdId);
        guestInEvent = guestInEvent.filter(guest => guest !== tdId.innerHTML);
    }
}
createTableGuest();
createTable();