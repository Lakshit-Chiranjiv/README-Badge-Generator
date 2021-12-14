console.log(77)

let icon_button = document.getElementById('ic-btn');
let slug_button = document.getElementById('sl-btn');
let all_button = document.getElementById('all-btn');
let badgedump = document.getElementById('badgedump');
let slugdump = document.getElementById('slugdump');
let alldump = document.getElementById('alldump');

let all_data = [];
let all_icons,all_slugs;

async function bring_icons(){
    let icons = await fetch('http://localhost:8000/badges');
    let icons_data = await icons.json();
    return icons_data;
}

// function log_icons(){
//     bring_icons()
//     .then(data => {
//         // console.log(data.length);
//         all_icons = data;
//         // data.forEach(icon => {
            
//         // });
//     })
//     .catch(err => console.log(err));
// }

function log_icons(){
    bring_icons()
    .then(data => {
        let snippet='';
        data.forEach(element => {
            snippet += JSON.stringify(element)+'<br/>';
        });
        badgedump.innerHTML = snippet;
        console.log(data);
    })
    .catch(err => console.log(err));
}

async function bring_slugs(){
    let icons = await fetch('http://localhost:8000/slugs');
    let icons_data = await icons.json();
    return icons_data;
}

function log_slugs(){
    bring_slugs()
    .then(data => {
        let snippet='';
        data.forEach(element => {
            snippet += JSON.stringify(element)+'<br/>';
        });
        badgedump.innerHTML = snippet;
        console.log(data);
    })
    .catch(err => console.log(err));
}


async function bring_all(){
    let icons = await fetch('http://localhost:8000/bsd');
    let icons_data = await icons.json();
    return icons_data;
}

function log_all(){
    bring_all()
    .then(data => {
        let snippet='';
        data.forEach(element => {
            snippet += JSON.stringify(element)+'<br/>';
        });
        badgedump.innerHTML = snippet;
        console.log(data);
    })
    .catch(err => console.log(err));
}


icon_button.addEventListener('click',async()=>{
    console.log('icon');
    log_icons();
});

slug_button.addEventListener('click',()=>{
    console.log('slug');
    log_slugs();
});

all_button.addEventListener('click',()=>{
    console.log('all');
    log_all();
});

