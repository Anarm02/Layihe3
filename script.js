let btn1 = document.querySelectorAll(".card-1 button");
let btn2 = document.querySelectorAll(".card-2 button");
let base = "RUB";
let symbols = "USD";
let value;
let p1 = document.querySelector(".card-1 p");
let p2 = document.querySelector(".card-2 p");
let input1 = document.querySelector(".card-1 input");
let input2 = document.querySelector(".card-2 input");
let active;
btn1.forEach(function (e) {

    e.onclick = async function () {

        base = e.innerText;
        await edit()
        clickBTn();
        btn1.forEach(function (i) {
            i.classList.remove("active")
        })
        e.classList.add("active");
    }
})
btn2.forEach(function (e) {
    e.onclick = async function () {
        symbols = e.innerText;
        await edit()
        clickBTn();
        btn2.forEach(function (i) {
            i.classList.remove("active")
        })
        e.classList.add("active");
    }
})
async function edit() {
    let ft = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`);
    let m = await ft.json();
    value = m.rates[`${symbols}`]
    console.log(m.base, Object.keys(m.rates), Object.values(m.rates))
    p1.innerText = `1 ${base} = ${value.toFixed(4)} ${symbols}`;
    p2.innerText = `1 ${base} = ${(1/value).toFixed(4)} ${symbols}`;
}
edit();
input1.oninput = (item) => {
    if(input1.value!=""){
        input2.value = (value * input1.value).toFixed(3);
    }
    else{
        input2.value="";
    }
    active = "left";
    
}
input2.oninput = (item) => {
    if(input2.value!=""){
        input1.value = (1 / value * input2.value).toFixed(3);
    }
    else{
        input1.value="";
    }
    active = "right";
    
}

function clickBTn() {
    if (active == "left") {
        input2.value = (value * input1.value).toFixed(3);
    } else if (active == "right") {
        input1.value = (1 / value * input2.value).toFixed(3);
    }
}