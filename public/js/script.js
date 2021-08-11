const button = document.querySelector('button');
const spinner = document.querySelector('.spinner-div');
const subheading = document.querySelector('.heading-sub');
const punchline = document.querySelector('.punchline');
let firstTime = true;

button.addEventListener('click',()=>{
    if(firstTime){
        toggleButtonVisibility();
        firstTime= false;
        spinner.classList.toggle('spinner');
    }
    else{
        removeJoke();
        toggleButtonVisibility();
        spinner.classList.toggle('spinner');

    }
    displayJoke();

})

function removeJoke(){
    subheading.style.display = "none"
    punchline.style.display = "none";
    subheading.textContent="";
    punchline.textContent ="";
    
}


function toggleButtonVisibility(){
   
    if(button.textContent === "Generate a Joke"){
        button.textContent = "Not to your liking?  Give it another try";
    }

    if(button.style.display ==="none"){
        button.style.display = "inline-block";
    }
    else{
        button.style.display = "none";
    }
}



function displaySetupLine(setup){
    subheading.style.display = "block";
    subheading.textContent= setup;
}

function displayPunchline(line){
    setTimeout(()=>{
        punchline.style.display = "block";
        punchline.classList.add('punchline-display');
        punchline.textContent = line;
        toggleButtonVisibility();

    },2000);
    
}



function displayJoke(){
    const url = '/joke';
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                spinner.classList.toggle('spinner');
                subheading.textContent= data.error;
            }
            else{
                spinner.classList.toggle('spinner');
                displaySetupLine(data.setup);
                displayPunchline(data.punchline);
            }


        })
    })



}


