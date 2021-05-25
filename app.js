function ListEmployees() {
	
    var URL = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php"

	var req = new XMLHttpRequest();
	req.open("GET", URL, true);
	req.onreadystatechange = function () {
		//Checks if ready state is 4 AND status is 200
		if (req.readyState == 4 && req.status == 200) {

			//request is successful and the request is finished
			var employee = JSON.parse(req.responseText)

            //Checks size of JSON object to set as limited for FOR loop
            var employeeDataLimit = Object.keys(employee).length;

            //Gets main div from DOM, in order to append new elements and display user data
            var page = document.getElementById("page");

			//renders content for each author pulled from the API call
			for (var i = 1; i <= employeeDataLimit; i++)
			{
                //Grabs all necessary data from API call
				var employeeFName = employee[i].employeefname;
                var employeeLName = employee[i].employeelname;
                var employeeBio = employee[i].employeebio;
                var employeeIsFeatured = employee[i].employeeisfeatured;
                var employeeHaspic = employee[i].employeehaspic;
                var employeeId = employee[i].employeeid;

                //Creates main user Block div that holds all the user data
                var userBlock = document.createElement("div");
                userBlock.className = "user-block";

                //Creates "crown" div that holds crown image for featured users. Will check status of user and only display crown if they are featured
                var crownBlock = document.createElement("div");
                crownBlock.className = "crown-block";
                if (employeeIsFeatured == 1){
                    var crown = document.createElement("i");
                    crown.className = "fas fa-crown";
                    crownBlock.appendChild(crown);
                }
                else{
                    crownBlock.style.marginTop = "16px";
                }

                //Creates "image" div that holds users image. Displays a default image if the user does not have an image
                var imageBlock = document.createElement("div");
                imageBlock.className = "image-block";
                var image = document.createElement("img");
                imageBlock.appendChild(image);
                if (employeeHaspic == 1){
                    image.src = "http://sandbox.bittsdevelopment.com/code1/employeepics/" + employeeId + ".jpg"
                }
                else{
                    image.src = "images/default-img.png"
                }

                //Creates "name" div that holds users name
                var nameBlock = document.createElement("div");
                nameBlock.className = "name-block";
                var userName = document.createElement("h2");
                var userNameValue = document.createTextNode(employeeFName + " " + employeeLName);
                userName.appendChild(userNameValue);
                nameBlock.appendChild(userName);

                //Creates "desc" div that displays description of user
                var descBlock = document.createElement("div");
                descBlock.className = "desc-block";
                var desc = document.createElement("p");
                var descValue = document.createTextNode(employeeBio);
                desc.appendChild(descValue);
                descBlock.appendChild(desc);
                

                //Creates "tag" div to display roles associated w
                var rolesBlock = document.createElement("div");
                rolesBlock.className = "roles-block";
                
                //Accesses roles array within the employee JSON object
                var rolesArray = employee[i].roles;
                var roleCounter = 0; //Initializes value for looping through each array within the roles array

                //Loops through the roles array and gets the values from inner arrays
                rolesArray.forEach(function() {
                    var roleName = rolesArray[roleCounter].rolename;
                    var rolecolor = rolesArray[roleCounter].rolecolor;
                    var roleid = rolesArray[roleCounter].roleid;

                    var role = document.createElement("p");
                    var roleValue = document.createTextNode(roleName);
                    role.appendChild(roleValue);
                    rolesBlock.appendChild(role);

                    role.style.backgroundColor = rolecolor;
                    
                    roleCounter++;
                });

                //Appends all values to userBlock div
                userBlock.appendChild(crownBlock);
                userBlock.appendChild(imageBlock);
                userBlock.appendChild(nameBlock);
                userBlock.appendChild(descBlock);
                userBlock.appendChild(rolesBlock);

                //Appends all userBlock divs to page div
                page.appendChild(userBlock);
            }
		}

	};

    //Sends request to server
	req.send();
}

//Calls the function to get all employees
ListEmployees(); 