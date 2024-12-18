let timer = document.querySelector(".timer");

const hourInput = document.getElementById("hourInput");

const minuteInput = document.getElementById("minuteInput");

const activeAlarms = document.querySelector(".activeAlarms");

const setAlarm = document.getElementById("set");

let alarmsArray = [];

let alarmSound = new Audio("alarm.mp3");

let initialHour = 0,
 initialMinute = 0,
 alarmIndex = 0;

 const appendZero = (value) => (value < 10 ? "0" + value : value);


 const searchObject = (parameter, value) =>{

    let alarmObject,
    objIndex,
    exists =  false;

    alarmsArray.forEach((alarm, index)=>{
        if(alarm[parameter] == value){
            exists = true;
            alarmObject = alarm;
            objIndex = index;
            return false;
        }
    });

    return [exists, alarmObject, objIndex];

 };

 function displayTimer(){

    let date = new Date();
    let [hours, minutes, seconds] = [appendZero(date.getHours()), appendZero(date.getMinutes()), appendZero(date.getSeconds())];
 

 timer.innerHTML = `${hours}:${minutes}:${seconds}`;



 alarmsArray.forEach((alarm, index) =>{
    if(alarm.isActive){
        if(
            `${alarm.alarmHour}:${alarm.alarmMinute}`=== `${hours}:${minutes}`
        ){
            alarmSound.play();
            alarmSound.loop =  true;
        }
    }
 });

}


const InputCheck = (InputValue) =>{

    InputValue = parseInt(InputValue);

    if(InputValue < 10){
        InputValue = appendZero(InputValue);
    }

    return InputValue;
};

hourInput.addEventListener("input", ()=>{

    hourInput.value = InputCheck(hourInput.value);

});

minuteInput.addEventListener("input", ()=>{

    minuteInput.value = InputCheck(minuteInput.value);

});


const createAlarm = (alarmObj) =>{

    const {id, alarmHour, alarmMinute} = alarmObj;


    let alramDiv = document.createElement("div");
    alramDiv.classList.add("alarm");
    alramDiv.setAttribute("data-id", id);
    alramDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;


    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    checkbox.addEventListener("click", (e)=>{

        if(e.target.checked){
            startAlarm(e);
        }
        else{
            stopAlarm(e);
        }
    });
    alramDiv.appendChild(checkbox);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>` ; 
    deleteButton.classList.add("deleteButton");

    deleteButton.addEventListener("click", (e) => deleteAlarm(e));

    alramDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alramDiv);
};

setAlarm.addEventListener("click", ()=>{
    alarmIndex += 1;

    let alarmObj = {};

    alarmObj.id= `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;

    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;

    console.log(alarmObj);
    alarmsArray.push(alarmObj);

    createAlarm(alarmObj);

    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
});

const startAlarm = (e) =>{
    let searchId = e.target.parentElement.getAttribute("data-id");

    let [exists, obj, index] = searchObject("id", searchId);
    if(exists){
        alarmsArray[index].isActive = true;
    }
};

const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");

    let [exists, obj , index] = searchObject("id", searchId);

    if(exists){
        alarmsArray[index].isActive = false;
        alarmSound.pause();
    }

};

const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");

    let [exists, obj, index] = searchObject("id", searchId);
    if(exists){
        e.target.parentElement.parentElement.remove();
        alarmsArray.splice(index, 1);
        alarmSound.pause();

    }
};


window.onload = ()=> {
    
    setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
}

