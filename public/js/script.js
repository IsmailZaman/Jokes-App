const button = document.querySelector('button');
const punchline_elem = document.querySelector('#punchline');
const setup_elem = document.querySelector('#setup');
const spinner = document.querySelector('#spinner-div');
const jokeBtn = document.querySelector('.next-joke-btn');

function toggleJokeBtn(){
    if(jokeBtn.style.visibility ==='hidden'){
        jokeBtn.style.visibility = 'visible';
    }
    else{
        jokeBtn.style.visibility = 'hidden';
    }
}

toggleJokeBtn();


function displayJoke(){

    const url = new URL("http://localhost:3000/joke");
    fetch(url).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
                spinner.classList.toggle('spinner');
                setup_elem.textContent = data.error;
            }
            else{
                spinner.classList.toggle('spinner');
                setup_elem.textContent = data.setup;
                setTimeout(()=>{
                    punchline_elem.textContent=data.punchline;
                    toggleJokeBtn();
                },2000);
                
            }
            
        })
    });
}

function clearJoke(){
    setup_elem.textContent = '';
    punchline_elem.textContent = '';
}

button.addEventListener('click',(e)=>{
    button.remove();
    spinner.classList.toggle('spinner');
    displayJoke();


})

jokeBtn.addEventListener('click',()=>{
    toggleJokeBtn();
    clearJoke();
    spinner.classList.toggle('spinner');
    displayJoke();


    
})