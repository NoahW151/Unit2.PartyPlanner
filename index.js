async function addParty()
{
    const name = document.getElementById("partyName").value;
    const date = document.getElementById("partyDate").value;
    const loc = document.getElementById("partyLoc").value;
    const desc = document.getElementById("partyDesc").value;
    const obj = {id: 1042, name: name, description: desc, date: date, location: loc};
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-PT/events", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(obj)
    })
    console.log(JSON.stringify(obj));
    console.log(response.error);
    getList();
}

async function getList()
{
    const partyList = document.getElementById("partylist");
    const parties = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-PT/events").then(res => res.json());
    console.log(parties.data)
    let child = partyList.lastElementChild;
    while (child)
    {
        partyList.removeChild(child);
        child = partyList.lastElementChild;
    }
    for (let party of parties.data)
    {
        let element = document.createElement("li");
        const name = party.name;
        const date = party.date;
        const description = party.description;
        const location = party.location;
        element.id = party.id;
        element.innerText = `${name} at ${location} on ${date}. Description: ${description}`;
        let button = document.createElement("button");
        button.innerText = "Delete";
        button.onclick = e => {
            const id = e.target.parentElement.id;
            fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-PT/events/" + id, {method: "DELETE"}).then(() => e.target.parentElement.remove());
        }
        button.className = "deletebutton";
        element.appendChild(button);
        partyList.appendChild(element);
    }
}
getList();
document.getElementById("partyButton").addEventListener("click", () => {
    console.log("clicked")
    addParty();
})