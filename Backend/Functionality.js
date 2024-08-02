
//declare all variables
let Username, FirstName, LastName, Email, ContactNo, Gender, Password;
//create an array of objects
var Datastore = new Array();

function SubmitForm()
{
    const UsernameInput = document.getElementById('username_input').value;
    const FirstNameInput = document.getElementById('firstname_input').value;
    const LastNameInput = document.getElementById('lastname_input').value;
    const EmailInput = document.getElementById('email_input').value;
    const ContactNoInput = document.getElementById('number_input').value;
    const genderRadios = document.getElementsByName('gender');
    const PasswordInput = document.getElementById('password_input').value;
    //get radio button value
    let selectedGender = '';
    for (const radio of genderRadios) {
        if (radio.checked) {
            selectedGender = radio.value;
            break;
        }
    }
    //check if all fields are present
    if(!UsernameInput || !FirstNameInput || !LastNameInput || !EmailInput || !ContactNoInput || !genderRadios || !PasswordInput)
        {
            alert('Please enter all fields');
            return;
        }
    //console.log(`${UsernameInput} \n ${FirstNameInput} \n ${LastNameInput} \n ${EmailInput} \n ${ContactNoInput} \n ${genderRadios} \n ${PasswordInput}`);
    //assign to global variables
    Username = UsernameInput;
    FirstName = FirstNameInput;
    LastName = LastNameInput;
    Email = EmailInput;
    ContactNo = ContactNoInput;
    Gender = selectedGender;
    Password = PasswordInput;
    //check if user exists in datastore
    existing_user_data = CheckDataExist()
    if( existing_user_data != -1)
    {
        //if user exists in datastore update his details
        UpdateUserDetails(existing_user_data);
    }
    else
    {
        //add details to Datastore
        StoreData();
    }
    alert('Form Submission Successful');
    return false;
}
// Create functionality of CRUD methods
function StoreData()
{
    //store the user data in an array of objects
    let new_data = {
        "username": Username,
        "firstName": FirstName,
        "lastName": LastName,
        "email": Email,
        "contactNo": ContactNo,
        "gender": Gender,
        "password": Password
    };
    console.log(`new_data\n ${new_data.username}\n ${new_data.firstName}\n ${new_data.lastName}\n ${new_data.email}\n ${new_data.contactNo}\n ${new_data.gender}\n ${new_data.password}`);
    Datastore.push(new_data);
    console.log("Datastore:\n", JSON.stringify(Datastore, null, 2));
}

function CheckDataExist()
{
    for(let index = 0 ; index < Datastore.length ; index++)
    {
        if(Datastore[index].username === Username && Datastore[index].email === Email)
        {
            return(index);
        }
    }
    return(-1);
}

//Update functionality of CRUD methods
function UpdateUserDetails(existing_user_data)
{
    if(Datastore[existing_user_data].username == Username && Datastore[existing_user_data].email == Email && Datastore[existing_user_data].password == Password)
    {
        Datastore[existing_user_data].username = Username;
        Datastore[existing_user_data].email = Email;
        Datastore[existing_user_data].firstName = FirstName;
        Datastore[existing_user_data].lastName = LastName;
        Datastore[existing_user_data].contactNo = ContactNo;
        Datastore[existing_user_data].gender = Gender;
        Datastore[existing_user_data].password = Password;
        alert('User Exists\nDetails Updated');
    }

}

//Read functionality of CRUD methods
function RetrieveUserData()
{
    let username_to_get_data = document.getElementById("username_to_get_details_input").value;
    let password_to_get_data = document.getElementById("password_to_get_details_input").value;
    for(let element of Datastore)
    {
        if(element.username == username_to_get_data && element.password == password_to_get_data)
        {
            document.getElementById("display_username").innerText = element.username;
            document.getElementById("display_firstName").innerText = element.firstName;
            document.getElementById("display_lastName").innerText = element.lastName;
            document.getElementById("display_email").innerText = element.email;
            document.getElementById("display_contactNo").innerText = element.contactNo;
            document.getElementById("display_gender").innerText = element.gender;
            document.getElementById("display_details_div").style.display = "block";
            return;
        }
    }
    alert("User not found");
}

//Delete functionality of CRUD methods
function DeleteUser()
{
    let username_to_get_data = document.getElementById("username_to_get_details_input").value;
    let password_to_get_data = document.getElementById("password_to_get_details_input").value;
    for(let i = 0 ; i < Datastore.length ; i++)
    {
        if(Datastore[i].username == username_to_get_data && Datastore[i].password == password_to_get_data)
        {
            Datastore.splice(i, 1);
            console.log("Datastore:\n",JSON.stringify(Datastore , null , 2));
            alert("User deleted");
            return;
        }
    }
    alert("User not found");
}
