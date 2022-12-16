
console.log('client side javascript is loaded!')

const weatherLocation = document.querySelector('form')
const search = document.querySelector('input')

const messageContextOne = document.querySelector('#message-1')
const messageContexttwo = document.querySelector('#message-2')

weatherLocation.addEventListener('submit',(e)=>{
   e.preventDefault()
    const location = search.value
    messageContexttwo.textContent =''
    messageContextOne.textContent = 'Loading.....'
    fetch('http://localhost:8000/weather?address='+location).then((response)=>{
        response.json().then((data) => {
            if(data.error)
            {
                messageContextOne.textContent = data.error
            }else{
                messageContextOne.textContent = data[0].forecaste + ' in ' + data[0].location
            }
        })
})
})