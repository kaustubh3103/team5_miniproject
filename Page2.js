document.getElementById("categories-btn").addEventListener("click", function(event) {
    event.stopPropagation();
    let dropdown = document.getElementById("categories-dropdown");
    dropdown.parentElement.classList.toggle("show");
});

document.getElementById("close-dropdown").addEventListener("click", function(event) {
    event.stopPropagation();
    document.querySelector(".dropdown").classList.remove("show");
});

document.getElementById("categories-dropdown").addEventListener("click", function(event) {
    event.stopPropagation();
});

window.addEventListener("click", function(event) {
    if (!event.target.matches("#categories-btn")) {
        document.querySelector(".dropdown").classList.remove("show");
    }
});

// Helper function to toggle dropdown visibility
function setupDropdownToggle(buttonId, dropdownId) {
    document.getElementById(buttonId).addEventListener("click", function(event) {
        event.stopPropagation();
        let dropdown = document.getElementById(dropdownId);
        dropdown.parentElement.classList.toggle("show");
    });
}

// Helper function to close dropdown
function setupCloseDropdown(closeButtonId) {
    document.getElementById(closeButtonId).addEventListener("click", function(event) {
        event.stopPropagation();
        document.querySelector(".dropdown").classList.remove("show");
    });
}


function setupDropdownClickPrevention(dropdownId) {
    document.getElementById(dropdownId).addEventListener("click", function(event) {
        event.stopPropagation();
    });
}

// Generic function to add a tag
function addTag(value, container, checkboxes) {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = value;

    const removeBtn = document.createElement("span");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "×";

    removeBtn.addEventListener("click", function() {
        tag.remove();
        const checkbox = Array.from(checkboxes).find(cb => cb.value === value);
        if (checkbox) checkbox.checked = false; // Uncheck the corresponding checkbox
    });

    tag.appendChild(removeBtn);
    container.appendChild(tag);
}


function removeTag(value, container) {
    const tags = container.querySelectorAll(".tag");
    tags.forEach(tag => {
        if (tag.textContent.includes(value)) {
            tag.remove();
        }
    });
}

// Generic function to set up checkbox handling
function setupCheckboxHandling(dropdownId, selectedContainerId) {
    const checkboxes = document.querySelectorAll(`#${dropdownId} input[type='checkbox']`);
    const selectedContainer = document.getElementById(selectedContainerId);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                addTag(this.value, selectedContainer, checkboxes);
            } else {
                removeTag(this.value, selectedContainer);
            }
        });
    });
}


setupDropdownToggle("location-btn", "location-dropdown");

setupCloseDropdown("close-location");

setupDropdownClickPrevention("location-dropdown");

// Handle checkbox selection and update tags for Location
setupCheckboxHandling("location-dropdown", "selected-location");

// Set up dropdown toggle for Team Size
setupDropdownToggle("team-size-btn", "team-size-dropdown");

// Set up close dropdown for Team Size
setupCloseDropdown("close-team-size");

// Prevent dropdown from closing when clicking inside Team Size dropdown
setupDropdownClickPrevention("team-size-dropdown");

// Handle checkbox selection and update tags for Team Size
setupCheckboxHandling("team-size-dropdown", "selected-team-size");

// Set up dropdown toggle for Stage
setupDropdownToggle("stage-btn", "stage-dropdown");

// Set up close dropdown for Stage
setupCloseDropdown("close-stage");

// Prevent dropdown from closing when clicking inside Stage dropdown
setupDropdownClickPrevention("stage-dropdown");

// Handle checkbox selection and update tags for Stage
setupCheckboxHandling("stage-dropdown", "selected-stage");

// Close dropdowns when clicking outside
window.addEventListener("click", function(event) {
    if (!event.target.matches(".btn-filter")) {
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            dropdown.classList.remove("show");
        });
    }
});

// my project button drop down
        const myproject = document.querySelector('#my-project');
        const divform  = document.querySelector('.form');
        const form = document.querySelector('form');
        
        function addProject(e){
            e.preventDefault();
            const regName = /^([A-Z])[a-z]+/;
            // const regDescription = /(^[a-z]+\s[a-z]+$)+/;
            const regQuantity = /^[1-9][0-9]*$/;
            const regMembers = /^[A-Z][a-z]+$/;
            // const regPreference = /(^[a-z]+\s[a-z]+$)+/;

            const projectName = document.querySelector('#Name');
            const projectDescrip = document.querySelector('#projectDescription');
            const projectImgUrl = document.querySelector('#imgUrl');
            const projectQuantity = document.querySelector('#quantity');
            const projectMembers = document.querySelector('#members');
            const projectPreference = document.querySelector('#preference');

            if((projectName.value === '' || !regName.test(projectName.value))){
                alert('Use only letters and first letter should be capital');
                return;
            }
            if(projectDescrip.value.length<10){
                alert('use only letters and space properly');
                return;
            }
            if(projectImgUrl.value ==''){
                projectImgUrl.value="https://tse1.mm.bing.net/th?id=OIP.i7y3Aa41KPiDrzb4tKfY1QHaEK&pid=Api&P=0&h=180";
            }
            if((projectQuantity==''|| !regQuantity.test(projectQuantity.value))){
                alert('Use only numbers and first number should be greater than 0');
                return;
            }
            if((projectMembers.value == ''|| !regMembers.test(projectMembers.value))){
                alert('Use only letters and first letter should be capital');
                return;
            }
            if(projectPreference.value.lenght<10){
                alert('use only letters and space properly');
                return;
            }

            const project = document.createElement('div');
            project.classList.add('card');  
            project.innerHTML=`
            <div class="card-image">
                <img src=${projectImgUrl.value} alt="Project Image">
            </div>
            <div class="cardHeader">
                    <p><b>Project Name:<b>${projectName.value}</p>
                    <p><b>Description:</b> ${projectDescrip.value}</p>
                    <p><b>Category:</b> Custom Project</p>
                    
            </div>
            <div class="applySection">
                    <button class="apply"><a href="Applyform.html">Apply For This Project</a><button>
            </div>
            <div class="cardTab">
                    <button class="tabBtn">Team Members</button>
                    <button class="tabBtn">Details</button>
                    <button class="tabBtn">Comments</button>
            </div>`;
             document.querySelector('#featuredProjects').appendChild(project);

        }
        form.addEventListener('submit',addProject);
        myproject.addEventListener('click',()=>{
            divform.style.display="block";
        });

        myproject.addEventListener('mouseover',()=>{
            divform.style.display='none';
        });





