const allCheckBoxes = document.querySelectorAll('.goal-container .custom-checkbox');
const inputFields = document.querySelectorAll('.goal-container .goal-input');
const newInputFields=[...inputFields];
const error_label = document.querySelector('.error-label')
const progressValue = document.querySelector(".complete-progress .progress-value");
const progressBar = document.querySelector(".complete-progress .progress-bar");
const progressLabel = document.querySelector('.progress-label');
const allGoals= JSON.parse(localStorage.getItem('allGoals'))||{
    first:{
        name:'',
        completed:false,
    }
    ,second:{
        name:'',
        completed:false,
    }
    ,third: {
            name:'',
            completed:false,
        
    }
}
let countCompletedGoals= Object.values(allGoals).filter(goal=>goal.completed).length;
//A good start is halfway to success!
//You're almost there, keep pushing!

const allQuotes = ['Raise the bar by completing your goals!','A good start is halfway to success!',"You're almost there, keep pushing!","Wow, you've nailed all the goals! Time to relax and unwind!"]


progressValue.firstElementChild.innerText= `${countCompletedGoals}/3 completed`;
progressValue.style.width = `${countCompletedGoals/3*100}%`;
error_label.parentElement.classList.add('not-completed')
progressLabel.innerText=allQuotes[countCompletedGoals];
allCheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener('click', function(){
        if((newInputFields.every((input)=>{
            return input.value
            
        }))){
            
            error_label.parentElement.classList.add('not-completed');
            checkbox.parentElement.classList.toggle('completed');

            const inputId = (checkbox.nextElementSibling.id)
            allGoals[inputId].completed=!allGoals[inputId].completed;
            countCompletedGoals= Object.values(allGoals).filter(goal=>goal.completed).length;
            progressValue.style.width = `${countCompletedGoals/3*100}%`;
            progressLabel.innerText=allQuotes[countCompletedGoals];
            localStorage.setItem('allGoals',JSON.stringify(allGoals));
            progressValue.firstElementChild.innerText= `${countCompletedGoals}/3 completed`; 

        }
        else{
            error_label.parentElement.classList.remove('not-completed');
            newInputFields.forEach((input)=>{
                input.addEventListener('focus',(e)=>{
                    error_label.parentElement.classList.add('not-completed')
                })
            })
        }
})

});




newInputFields.forEach((input)=>{
    input.value=allGoals[input.id].name;
    if ( allGoals[input.id].completed){
        input.parentElement.classList.add('completed');
    }
    input.addEventListener('input',(e)=>{
        if(allGoals[input.id].completed){
            e.target.value = allGoals[input.id].name
            return
        }
        allGoals[e.target.id].name=input.value
        localStorage.setItem('allGoals',JSON.stringify(allGoals));
    })

})





