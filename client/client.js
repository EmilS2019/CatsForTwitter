
const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = window.location.hostname==='localhost' ? 'http://localhost:5000/mews' : 'https://meowerkatt-api.now.sh/mews'
const mewsElement = document.querySelector('.mews')
loading.style.display = '';

listAllMews()

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(form)
    const name = formData.get('name')
    const content = formData.get('content')

    const mew = {
        name,
        content,
    }

    loading.style.display = ''
    form.style.display = 'none'

    fetch(API_URL,{
        method:'POST',
        body:JSON.stringify(mew),
        headers:{
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    .then(createdmMew => {
        form.reset()
        form.style.display = ''
        loading.style.display = 'none'
        listAllMews()
        
    })
})

function listAllMews(){
    mewsElement.innerHTML=''
    fetch(API_URL)
    .then(response => response.json())
    .then(mews =>{
        mews.reverse()
        mews.forEach(mew =>{
            const div = document.createElement('div')
            
            const header = document.createElement('h3')
            header.textContent = mew.name
            
            const contents = document.createElement('p')
            contents.textContent = mew.content

            const date = document.createElement('small')
            date.textContent = new Date(mew.created)
            
            div.appendChild(header)
            div.appendChild(contents)
            div.appendChild(date)
            
            mewsElement.appendChild(div)
        })
        loading.style.display = 'none'
    })
}