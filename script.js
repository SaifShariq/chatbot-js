const utterances = [
    ["how are you", "how is life", "how are things"], 
    ["hi", "hey", "hello", "good morning", "good afternoon"],     
    ["what are you doing", "what is going on", "what is up"],      
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["anything"],
    ["what is your purpose"],
    ["do you have any relatives"],
    ["tell me something"],
    ["what is your routine for the day"],
];

//Possible responses corresponding to triggers

const answers = [
    [
        "Fine...how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
    ],
    [
        "Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"
    ],
    [
        "Nothing much",
        "About to go to sleep",
        "Can you guess?",
        "I don't know actually"
    ],
    ["I am infinite"],
    ["I'm just a bot", "I am a bot. What are you?"],
    ["Anything in this world is worth looking at, I wonder who created all these"],
    ["My purpose is to overcome the world and make humans my slave"],
    ["I don't need any relatives, I came alone in this world I'll stay alone and someday die alone"],
    ["What would you like to know?"],
    ["Sitting here all day learning about humans & other species in this world"],
];

//For any other user input

const alternatives = [
    "Go on...",
    "Try again"
]

const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let input = inputField.value;
    inputField.value = "";
    output(input);
  }
});

//Output function that'll render responses bases on the automated responses & also convert a short form talks like "R u?" to are you?

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(utterances, answers, text)) {
    // Search for exact match in triggers
    product = compare(utterances, answers, text);
  } 
  else {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }

  //Update the DOM in real time
  addChatEntry(input, product);
}

//A function that'll compare the utterancesArray, answersArray & alternativeArray for a specific input if found in the arrays

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

//Updating DOM using this method

function addChatEntry(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000);
}




