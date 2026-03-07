let allIssues = [];

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


async function fetchIssue() {
    try {
        const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await response.json();
        allIssues = data.data;
        display(allIssues);
            
    } catch (error) {
        console.error("Didn't get the data", error);
    }
}

const display = (param) => {
    const container = document.getElementById('issue-container');
    
    container.innerHTML = ''; 

    container.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-10">
            <span class="loading loading-spinner text-primary loading-lg"></span>
        </div>
    `;

    setTimeout(() => {
    
        container.innerHTML = '';
        
        let priorityTag;
        let count = 0;

        param.forEach(issue => {
            count++;
            
            if(issue.priority === "high"){
                priorityTag = `<span class="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold border border-red-100 uppercase">${issue.priority}</span>`;
            } else if(issue.priority === "medium"){
                priorityTag = `<span class="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-semibold border border-amber-100 uppercase">${issue.priority}</span>`;
            } else {
                priorityTag = `<span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold border border-gray-100 uppercase">${issue.priority}</span>`;
            }

            if(issue.status === 'open'){
                const card = document.createElement('div');
                card.className = "bg-white p-5 rounded-xl shadow-sm border-t-4 border-green-300 h-full flex flex-col cursor-pointer";
                card.addEventListener('click', () => modal(issue));

                const labelTags = issue.labels.map(label => `
                    <span class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[12px] font-semibold uppercase">${label}</span>
                `).join('');

                card.innerHTML = `
                    <div class="flex justify-between items-start mb-3">
                        <div class="w-8 h-8 rounded-full flex items-start justify-center">
                            <img src="assets/open.svg"/>
                        </div>
                        ${priorityTag}
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 leading-tight">${issue.title}</h3>
                    <p class="text-sm text-gray-500 mb-4 leading-relaxed">${issue.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">${labelTags}</div>
                    <div class="pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 mt-auto">
                        <span>#${issue.id} by ${issue.author}</span>
                        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                `;
                container.appendChild(card);

            } else {
                const card = document.createElement('div');
                card.className = "bg-white p-5 rounded-xl shadow-sm border-t-4 border-[#A755F7] h-full flex flex-col cursor-pointer";
                card.addEventListener('click', () => modal(issue));

                const labelTags = issue.labels.map(label => `
                    <span class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[12px] font-semibold uppercase">${label}</span>
                `).join('');

                card.innerHTML = `
                    <div class="flex justify-between items-start mb-3">
                        <div class="w-8 h-8 rounded-full flex items-start justify-center">
                            <img src="assets/close.svg"/>
                        </div>
                        ${priorityTag}
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2 leading-tight">${issue.title}</h3>
                    <p class="text-sm text-gray-500 mb-4 leading-relaxed">${issue.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">${labelTags}</div>
                    <div class="pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 mt-auto">
                        <span>#${issue.id} by ${issue.author}</span>
                        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                `;
                container.appendChild(card);
            }
        });

        const num = document.getElementById('issue-number');
        num.innerText = `${count} Issues`;

    }, 500);
};


const button = (event) => {

    const btn = document.querySelectorAll('.btn-sm');

    btn.forEach(parameter => {
        parameter.classList.remove('bg-[#4A00FF]', 'text-white', 'border-none');
        parameter.classList.add('bg-white', 'text-gray-700', 'border-gray-200');


    });
    event.target.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
    event.target.classList.add('bg-[#4A00FF]', 'text-white', 'border-none');

    const filter = event.target.innerText;
    if(filter === "All"){
        display(allIssues);
    }

    else if(filter === "Open"){
        display(allIssues.filter(issue => issue.status === 'open'));
    }
    else if(filter === "Closed"){
        display(allIssues.filter(issue => issue.status === 'closed'));
    }
};



// Search Function

const searchInput = document.getElementById('search');

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        const searchResult = searchInput.value.trim();

        if(searchResult === ""){
            fetchIssue();
            return;
        }

        searchFetch(searchResult);
    }

    
});

async function searchFetch(param){
    try{
        const fetchData = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${param}`);
        const response = await fetchData.json();
        const result = response.data;

        display(result);
    }
    catch(error){
        console.error("FAILED" , error);
    }
}



// Modal
const modal = (issue) => {
    // Set basic text
    document.getElementById('modal-title').innerText = issue.title;
    document.getElementById('modal-description').innerText = issue.description;
    document.getElementById('modal-author').innerText = issue.author;
    document.getElementById('modal-assignee').innerText = issue.author; 
    
    // Set Date
    document.getElementById('modal-date').innerText = new Date(issue.createdAt).toLocaleDateString();

    // Set Priority
    const priorityTag = document.getElementById('modal-priority');
    priorityTag.innerText = issue.priority;
    
    if(issue.priority === "high"){
        priorityTag.className = "px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold border border-red-100 uppercase";
    } else if(issue.priority === "medium"){
        priorityTag.className = "px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-semibold border border-amber-100 uppercase";
    } else {
        priorityTag.className = "px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold border border-gray-100 uppercase";
    }

    // Set Status
    const statusTag = document.getElementById('modal-status');
    if(issue.status === 'open'){
        statusTag.innerText = "Opened";
        statusTag.className = "px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold border border-green-100 uppercase";
    } else {
        statusTag.innerText = "Closed";
        statusTag.className = "px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold border border-purple-100 uppercase";
    }

    // Set Labels
    const labelContainer = document.getElementById('modal-labels');
    labelContainer.innerHTML = issue.labels.map(label => `
        <span class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[12px] font-semibold uppercase">
            ${label}
        </span>
    `).join('');

    document.getElementById('issue_modal').showModal();
};

fetchIssue();