function addRemoveClass(){
    let mainContainer = document.querySelector('.container-fluid');
    mainContainer.classList.toggle('nigthMode');

    const cards = document.querySelectorAll('.card');

    Array.from(cards).forEach(c=>{
      c.classList.toggle('bg-dark');
      c.classList.toggle('text-white');
      c.classList.toggle('border');
      c.classList.toggle('border-white');
      c.classList.toggle('border-2');
      c.classList.toggle('rounded');
    });

}

function dateValidator(){
  let timeOutId = setTimeout(()=>{

    const dateInput = document.querySelector(".validate-date");
    if(dateInput){

      dateInput.addEventListener('keyup',(event)=>{
        const inputText = dateInput.value;
        const regExp = /^\d{2}([.\-\/])\d{1,2}\1\d{4}$/;
        if(regExp.test(inputText)){
          //console.log('correct format \t',inputText);

          if(dateInput.classList.contains("bg-danger") &&
           dateInput.classList.contains("text-white")){
            dateInput.classList.remove("bg-danger");
            dateInput.classList.remove("text-white")
          }

        }else{
          //console.log('no \t',inputText);
          if(!dateInput.classList.contains("bg-danger") &&
             !dateInput.classList.contains("text-white")){
            dateInput.classList.add("bg-danger");
            dateInput.classList.add("text-white");
          }
        }
      });
      clearTimeout(timeOutId);

    }

  },10)


}
