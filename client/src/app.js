// const app = function () {
//   const url = "https://api.myjson.com/bins/qhj4z"
//
//   const button = document.querySelector('#button')
//
//   button.addEventListener('click', function() {
//     makeRequest(url, requestComplete)
//   })
// }
//
// const makeRequest = function(url, callback) {
//   const request = new XMLHttpRequest()
//   request.open('GET', url)
//   request.send()
//   request.addEventListener('load', callback);
// }
//
//
// const requestComplete = function() {
//   if(this.status !== 200) return
//   const jsonString = this.responseText
//   const cards = JSON.parse(jsonString)
//   populateList(cards)
// }
//
//
// const populateList = function(cards) {
//   const ul = document.querySelector('#card-list')
//
//   cards.blackCards.forEach(function(card) {
//     const li = document.createElement('li')
//     li.innerText = card.text
//     ul.appendChild(li)
//   })
//
//   cards.whiteCards.forEach(function(card) {
//     const li = document.createElement('li')
//     li.innerText = card
//     ul.appendChild(li)
//
//   })
// }
//
//
// document.addEventListener('DOMContentLoaded', app)
