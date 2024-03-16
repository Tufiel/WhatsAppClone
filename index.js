const searchIcon = document.querySelector("#searchImage");
function search(x) {
  x.placeholder = "";
  let str = searchIcon.src;
  searchIcon.src = str.slice(0, -9) + "back.png";
}

function unsearch(x) {
  x.placeholder = "Search or start new chat";
  let str = searchIcon.src;
  searchIcon.src = str.slice(0, -8) + "loupe.png";
}

function typeMsg(x) {
  x.placeholder = "";
}

function dontTypeMsg(x) {
  x.placeholder = "Type a message";
}

const contacts = [
    {
        name: "Zahid",
        lastMsg: "yep",
        lastMsgTime: "Today",
      },
  {
    name: "Suhaib",
    lastMsg: "Good Night",
    lastMsgTime: "Today",
  },
  {
    name: "Umar",
    lastMsg: "haa",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Abdul",
    lastMsg: "ok",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Asif",
    lastMsg: "please yaad kar kai",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Umar",
    lastMsg: "haa",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Abdul",
    lastMsg: "ok",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Asif",
    lastMsg: "please yaad kar kai",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Umar",
    lastMsg: "haa",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Abdul",
    lastMsg: "ok",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Asif",
    lastMsg: "please yaad kar kai",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Umar",
    lastMsg: "haa",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Abdul",
    lastMsg: "ok",
    lastMsgTime: "Yesterday",
  },
  {
    name: "Asif",
    lastMsg: "please yaad kar kai",
    lastMsgTime: "Yesterday",
  },
  
];

// Function to append contacts to mainLeftDIv
function appendContactsToMainDiv(contacts) {
  var mainLeftDiv = document.getElementById("mainLeftDiv");

  contacts.forEach(function (contact) {
    var contactDiv = document.createElement("div");
    contactDiv.classList.add("contactNumber",contact.name);

    var img = document.createElement("img");
    let url = './icons/'+contact.name.toLowerCase()+'.png';
   
   
    //update dp
    checkImageExists(url)
    .then(exists => {
      if (exists) {
          img.src = url;
          // console.log(`ji hai`);
        return true;
      } else {
          img.src = removeCharsTillLastSlash(url)+'user.png';
        //   console.log(`ni hai`);
        return false;
      }
    });
    
    img.alt = contact.name+' pic';

    var contactStatusDiv = document.createElement("div");
    contactStatusDiv.classList.add("contactStatus");

    var contactNameDiv = document.createElement("div");
    contactNameDiv.classList.add("contactName");

    var nameParagraph = document.createElement("p");
    nameParagraph.textContent = contact.name;

    var lastMsgParagraph = document.createElement("p");
    lastMsgParagraph.classList.add("dimColor", "smallFont", "lastMsg");
    lastMsgParagraph.textContent = contact.lastMsg;

    var lastMsgTimeDiv = document.createElement("div");
    lastMsgTimeDiv.classList.add("contactStatus");

    var timeParagraph = document.createElement("p");
    timeParagraph.classList.add("dimColor", "smallFont");
    timeParagraph.textContent = contact.lastMsgTime;

    contactNameDiv.appendChild(nameParagraph);
    contactNameDiv.appendChild(lastMsgParagraph);

    contactStatusDiv.appendChild(contactNameDiv);
    contactStatusDiv.appendChild(lastMsgTimeDiv);

    lastMsgTimeDiv.appendChild(timeParagraph);

    contactDiv.appendChild(img);
    contactDiv.appendChild(contactStatusDiv);

    mainLeftDiv.appendChild(contactDiv);
  });
}

const chatDivs = document.querySelectorAll(".actualChatBox");
    chatDivs.forEach((chatDiv) => {
      chatDiv.classList.add("hidden");
    });
    chatDivs[0].classList.remove('hidden');

// Call the function with the contacts array
appendContactsToMainDiv(contacts);


const contactDivs = document.querySelectorAll(".contactNumber");
let currentSelected = contactDivs[0].querySelector('.contactName > p:first-child').textContent;

contactDivs.forEach((contactDiv, index) => {

  contactDiv.addEventListener("click", () => {
    // Remove selectContact class from all contact divs
    contactDivs.forEach((div) => {
      div.classList.remove("selectContact");
    });
    
    //update current selected
    currentSelected = contactDiv.querySelector('.contactName > p:first-child').textContent;

    // Add selectContact class to the clicked contact div
    if( window.innerWidth > 1200)
    contactDiv.classList.add("selectContact");

    // Hide all chat divs
    chatDivs.forEach((chatDiv) => {
      chatDiv.classList.add("hidden");
    });

    // Show the corresponding chat div based on name
    const selectedChats = document.querySelectorAll(".actualChatBox");
    let x;
    let name = contactDiv.querySelector('.contactName > p:first-child').textContent.toLowerCase();

    selectedChats.forEach((element) => {
      if (element.classList.contains(name)) x = element;
    });

    if (x) {
      x.classList.remove("hidden");
    } else {
      console.error("No chat box with the 'name' class found.");
    }
   
    if(window.innerWidth < 1200)
     {
        let leftDiv = document.getElementById('mainLeftDiv');
        let rightDiv = document.getElementById('mainRightDiv');
         leftDiv.style.display = 'none';
         rightDiv.style.display = 'block';
     }

    updateEverything(name);
  });

  contactDiv.addEventListener('mouseover',()=>{
    if(! window.innerWidth < 1200)
    contactDiv.classList.add("selectContact");
  });

  contactDiv.addEventListener('mouseout',()=>{
    let x = contactDiv.classList.contains(currentSelected );
    if( !x )
    {
    contactDiv.classList.remove("selectContact");
    }
// else
// console.log("line 188 mai problem hai");
  });

});

function updateEverything(name)
{
    let dp = document.querySelector('#chatDp');
    let cName = document.querySelector('#contactName');
    let newUrl = removeCharsTillLastSlash(dp.src)+name+'.png';
    
    //update name
    cName.textContent = captilize(name);
    
    //update dp
        checkImageExists(newUrl)
  .then(exists => {
    if (exists) {
        dp.src = newUrl;
        // console.log(`ji hai`);
      return true;
    } else {
        dp.src = removeCharsTillLastSlash(dp.src)+'user.png';
        // console.log(`ni hai`);
      return false;
    }
  })
     
}

function removeCharsTillLastSlash(inputString) {
    // Find the last index of '/' character
    const lastIndex = inputString.lastIndexOf('/');
    
    // If '/' is found, extract the substring till that index
    if (lastIndex !== -1) {
      return inputString.substring(0, lastIndex + 1); // Include the last '/'
    } else {
      // If '/' is not found, return the input string as is
      return inputString;
    }
  }
  

  function checkImageExists(imageUrl) {
    return fetch(imageUrl, { method: 'HEAD' })
      .then(response => {
        return response.ok;
      })
      .catch(() => {
        return false;
      });
  }

  function captilize(name)
  {
    return name[0].toUpperCase() +name.substring(1);
  }

  const backToContacts = document.getElementById('backToContacts');

  backToContacts.addEventListener('click',()=>{
    
       let leftDiv = document.getElementById('mainLeftDiv');
       let rightDiv = document.getElementById('mainRightDiv');
        leftDiv.style.display = 'block';
        rightDiv.style.display = 'none';
  });
  
  
