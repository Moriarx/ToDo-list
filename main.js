let $todoInput; //miejsce, gdzie użytkownik wpisuje treść
let $alertInfo; //info o braku zadań/konieczności dodania tekstu
let $addBtn; //przycisk add - dodaje nowe elementy do listy
let $ulList; //nasza lista zadań tagi <ul></ul>
let $toolsPanel; //div z klasa tools
let $newTask;

let $popup; //pobrany popup
let $popupInfo; //alert w popupie, jak się doda pusty tekst
let $editedTodo; //edytowany Todo
let $popupInput; //tekst wpisany w inputa w popup'ie
let $addPopupBtn; //przycisk "zatwierdź" w popup'ie
let $closeTodoBtn; //przycisk od zamykania popup'a
let $idNumber = 0;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};



//pobieramy nasze elementy
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');




};

//nadajemy nasłuchiwanie
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);


};

const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);

        $todoInput.value = "";
        $alertInfo.innerText = ''
        createToolsArea()
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!';
        $alertInfo.style.color = 'tomato';
    }
}

const enterCheck = () => {
    if(event.keyCode === 13) {
        addNewTask();
    };

};

const createToolsArea = () => {
    //tworzy toolsy
    toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);


    //completeBtn
    completeBtn = document.createElement('button');
    completeBtn.classList.add('complete')
    completeBtn.innerHTML = '<i class="fas fa-check"></i>'
    toolsPanel.appendChild(completeBtn);

    //editBtn
    editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';
    toolsPanel.appendChild(editBtn);


    //deleteBtn
    deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
    toolsPanel.appendChild(deleteBtn);

};

const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }    
};

const editTask = (e) => {

    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    

    $popup.style.display = 'flex';
};

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = "none";
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText ="Podaj treść zdania."
    }

};

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if($allTasks.length === 0){
       $alertInfo.innerText = "Brak zadań na liście." 
    };
};

const closePopup = () => {
    $popup.style.display = 'none';
};





document.addEventListener('DOMContentLoaded', main);