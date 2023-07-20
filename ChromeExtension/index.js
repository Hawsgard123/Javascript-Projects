let myLeads = []

const inputEl = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el")
let tabBtn = document.getElementById("tab-btn")
let deleteBtn = document.getElementById("delete-btn")

const leadsStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsStorage) {
  myLeads = leadsStorage
  render(myLeads)
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value)
  render(myLeads)
  inputEl.value = null
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
})

tabBtn.addEventListener("click", function () {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

  //   })
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
  myLeads.push(tabs[0].url)
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})
function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++)
    listItems += `
      <li>
        <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
    </li>
    `

  ulEl.innerHTML = listItems
}
