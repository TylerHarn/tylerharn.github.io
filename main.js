
// This code adds an event listener to a button with the id "promptButton". It waits for the button to be clicked and then executes a function
document.getElementById("promptButton").addEventListener('click', (event) => {

    // Get the element with the id "output" and store it in the variable "output"
    let output = document.getElementById("output");
   
    // Check if the "output" element does not have any text content
    if (!output.textContent) {
    
        // If the "output" element is empty, prompt the user to enter their name
        let name = prompt("Please Enter Your Name:");
      
        // Check if the user entered a name and did not cancel the prompt
        if (name !== null && name !== "") {
            
            // If the user entered a name, update the text content of the "output" element with the name
            output.textContent = name + "!";
        }
    }
});


// This function toggles the scale of an image between 1 and 1.3 (increased size) when clicked. If uses an If-Else statment  
function toggleSize(img) {

    if (img.style.transform === "scale(1.3)") { 
    
        img.style.transform = "scale(1)";
    } else {
  
        img.style.transform = "scale(1.3)"; 
    }
}

// This function gets all the elements with the class "navbar a" and stores then then checks for mouseover or mouseout to change their size. 
const navbarItems = document.querySelectorAll(".navbar a");

navbarItems.forEach(item => {
   
    item.onmouseover = function() {
     
        this.style.fontSize = "1.2em";
    };

    item.onmouseout = function() {
    
        this.style.fontSize = "1em";
    };
});

//Form Code
// Update slider values
document.getElementById('aboutMe').addEventListener('input', function() {
    document.getElementById('aboutMeValue').innerText = this.value;
});

document.getElementById('resume').addEventListener('input', function() {
    document.getElementById('resumeValue').innerText = this.value;
});

document.getElementById('projects').addEventListener('input', function() {
    document.getElementById('projectsValue').innerText = this.value;
});

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    var formData = {
        ageGroup: document.getElementById('ageGroup').value,
        email: document.getElementById('email').value,
        browsingFrequency: document.querySelector('input[name="browsingFrequency"]:checked').value,
        aboutMeValue: document.getElementById('aboutMe').value,
        resumeValue: document.getElementById('resume').value,
        projectsValue: document.getElementById('projects').value,
        features: [],
        otherText: document.getElementById('otherText').value,
        themePreference: document.querySelector('input[name="themePreference"]:checked').value
    };

    // Get selected features
    var features = document.getElementsByName('features');
    for (var i = 0; i < features.length; i++) {
        if (features[i].checked) {
            formData.features.push(features[i].value);
        }
    }

    // Store data in local storage with unique key
    localStorage.setItem('formData', JSON.stringify(formData));

    alert('Form Submitted');
});

document.getElementById('myForm').addEventListener('reset', function() {
    // Clear data from local storage
    localStorage.clear();
});
