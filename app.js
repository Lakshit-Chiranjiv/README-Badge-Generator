console.log(77)

let icon_button = document.getElementById('ic-btn');
let slug_button = document.getElementById('sl-btn');
let all_button = document.getElementById('all-btn');
let link_button = document.getElementById('link-btn');
let copy_button = document.getElementById('copy-btn');
let badgedump = document.getElementById('badgedump');
let slugdump = document.getElementById('slugdump');
let alldump = document.getElementById('alldump');
let linkdump = document.getElementById('linkdump');

let all_data = [],all_links=[];
let all_icons,all_slugs;
let copy_text = '';

async function bring_icons(){
    let icons = await fetch('http://localhost:8000/badges');
    let icons_data = await icons.json();
    return icons_data;
}

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

async function bring_links(){
    let links_array = await fetch('http://localhost:8000/badgelinks');
    let link_data = await links_array.json();
    return link_data;
}
function log_links(){
    bring_links()
    .then(data => {
        let snippet='';
        data.forEach(element => {
            element.table_category_name = element.table_category_name.toLowerCase().split('');
            let elem_name = element.table_category_name.filter((val) => (val>='a' && val<='z')||val === ' ');
            let plastic_element;
            elem_name = elem_name.join('').trim();
            elem_name = elem_name[0].toUpperCase() + elem_name.slice(1);
            snippet += `<br/><br/><h3 class="mt-4">${elem_name}</h3><br/>`;
            // snippet += JSON.stringify(element)+'<br/>';
            for(let i=0;i<element.category_links_array.length;i++)
            {
                plastic_element = element.category_links_array[i].replace('for-the-badge','plastic');
                snippet += `<button class="mt-2 badge-btn"><img src="${element.category_links_array[i]}" alt="badge"></button> &nbsp;\n<button class="mt-2 badge-btn"><img src="${plastic_element}" alt="badge"></button> &nbsp;`;
            }
        });
        linkdump.innerHTML = snippet;
        console.log(data);
        let btns = document.getElementsByClassName('badge-btn');

        let buttonsCount = btns.length;
        for (let i = 0; i < buttonsCount; i += 1) {
            btns[i].onclick = function(e) {
                console.log(this.firstChild.src);
                copy_text += '![badge]('+this.firstChild.src + ')\n';
            };
        }
    })
    .catch(err => console.log(err));
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

log_links();

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

link_button.addEventListener('click',()=>{
    console.log('links');
    log_links();
});

copy_button.addEventListener('click',()=>{
    navigator.clipboard.writeText(copy_text);
})


