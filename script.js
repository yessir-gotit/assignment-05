const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "admin123"){
        window.location.href = 'main_page.html';
    }

    else {
        alert("Wrong Username & Password");
    }
};


// category button

// const button = () => {
//     const all = document.getElementById('all-btn');
//     const open = document.getElementById('open-btn');
//     const close = document.getElementById('close-btn');

//     const btn = document.addEventListener('click',(event) => {

//         if(event.target.id === open){
//             open.classList.add('bg-[#4A00FF]', 'text-white');
//             all.classList.add('text-gray-700', 'border-gray-200' , 'bg-white');
//             close.classList.add('text-gray-700', 'border-gray-200' , 'bg-white');
//         }

//         else if(event.target.id === close){
//             close.classList.add('bg-[#4A00FF]', 'text-white');
//             all.classList.add('text-gray-700', 'border-gray-200' , 'bg-white');
//             open.classList.add('text-gray-700', 'border-gray-200' , 'bg-white');
//         }
//         else if(event.target.id === all){
//             all.classList.add('bg-[#4A00FF]', 'text-white');
//             close.classList.add('text-gray-700', 'border-gray-200' , 'bg-white');
//             open.classList.add('text-gray-700', 'border-gray-200' , 'bg-white');
//         }
//     })
// };


const button = (event) => {

    const btn = document.querySelectorAll('.btn-sm');

    btn.forEach(parameter => {
        parameter.classList.remove('bg-[#4A00FF]', 'text-white', 'border-none');
        parameter.classList.add('bg-white', 'text-gray-700', 'border-gray-200');


    });
    event.target.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
    event.target.classList.add('bg-[#4A00FF]', 'text-white', 'border-none');
};

