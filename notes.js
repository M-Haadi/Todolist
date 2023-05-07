const addBtn = document.querySelector('.addbutton');












//!---------------------------------------------------//|
//!    updating local storage                           //|
//!---------------------------------------------------//|

const updateLocalStorage= ()=>{
    const textareaData= document.querySelectorAll('.text-area');            //getting all text area data
    const notesArray = [];   //generating empty array to store each note data on sperate indexes
    
    textareaData.forEach((currEle)=>{   //each text area value/data
    
    return notesArray.push(currEle.value);       //pushing in empty array... push: add the data in the end
    
    })
    
    localStorage.setItem("NOTES",JSON.stringify(notesArray));  //adding array in local storage and we need to convert it in the form of
    //key value pair that is string so JSON is used..in local storage data is saved in keyvalue.
    
    }












    
//!---------------------------------------------------//|
//!    creation of container element                  //|
//!---------------------------------------------------//|

const notes_container = document.createElement('div');   //container element for all notes
notes_container.classList.add('notes_container');
let counter = 0;













//!---------------------------------------------------//|
//!   add new note function                           //|
//!---------------------------------------------------//|

const add_new_notes = (text ='')=>{               //text tells if any data is present or not already

const new_note = document.createElement('div');   //creating new div
new_note.classList.add('notes-div');  //adding class to it

//adding this html data to upper div,  ternary op is used.. tell if text present? true then hiding editable textarea
// if false hiding unediable div 'main'
const htmlData = `
<div class="edit-del-btn">
<h3 class="task-no">

</h3>
   <button class="edit">
    <i class="fa-regular fa-pen-to-square"></i>
   </button>

   <button class="delete">
    <i class="fa-solid fa-trash"></i>
   </button>
</div>
 
<div class="main ${(text)? "":"hidden"}">               

</div>

<textarea class="text-area ${(text)? "hidden":""}"></textarea>

`;
new_note.insertAdjacentHTML('afterbegin',htmlData);             //adding html data after div starts which is with class 'notes-div'


// const taskNo = document.createElement('h3');
// taskNo.classList.add('task-no');
let taskNo= new_note.querySelector('.task-no')


    counter = counter + 1;
    taskNo.innerHTML = `Note #${counter}`;


// new_note.insertAdjacentElement('afterbegin',taskNo);
notes_container.insertAdjacentElement('beforeend',new_note);     //after div is ready add it to its container element .. note: container is creater once and then we are just adding elements at the end of that container.
















//!---------------------------------------------------//|
//!    getting references of all buttons              //|
//!---------------------------------------------------//|

const delBtn = new_note.querySelector('.delete');   //getting reference of all buttons //they exist within newnote so thats why defining the functionality inside this func because this func creates this note-div.
const editBtn = new_note.querySelector('.edit');
const main = new_note.querySelector('.main');
const txtArea = new_note.querySelector('.text-area');







delBtn.addEventListener('click', ()=>{
   const result=confirm("Press OK if you want to delete the note.");
   if(result) {
    new_note.remove();
    updateLocalStorage();   //with each removing data local storge is updated.
    window.location.reload();
   }
  });

  
       



  txtArea.value=text;        //by default if text is not empty.
  main.innerHTML=text;














  //!---------------------------------------------------//|
//!   edit button functionality                         //|
//!---------------------------------------------------//|

editBtn.addEventListener('click', ()=>{
   
    main.classList.toggle('hidden');          
    txtArea.classList.toggle('hidden');
    
})












//!---------------------------------------------------//|
//!    whatever written in textarea also written in main //|
//!---------------------------------------------------//|

txtArea.addEventListener('change', (event)=>{

   const value = event.target.value;              //if textarea changes means if anydata is entered ..using event we can get what item is triggered where the data is written n what the value or data actually is.
   //then main div which is un editable is equal to the value.... whatever we write in text area also is written in main.
   main.innerHTML=value;

   updateLocalStorage();    //also we need to store the value or data in local storage
})

document.body.appendChild(notes_container);

}











//getting data from local storage ..we need to parse the data into array because we converted into key value pair that is JSON format.

const notes = JSON.parse(localStorage.getItem('NOTES'));

if(notes){    //if any note is present


    notes.forEach((currElem)=>{    //json will return array back and foreach element or index there is a seprate text/data/note

        add_new_notes(currElem)     //add func is called for each data...by default if text is not empty text.value=text....we saw this above

    })


}






  






addBtn.addEventListener('click', ()=>{

    add_new_notes()
});


 //!---------------------------------------------------//|
//!   SEARCH BAR                       //|
//!---------------------------------------------------//|







