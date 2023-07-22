// ==UserScript==
// @name         Wipe messenger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Wipe messenger chat
// @author       You
// @match        https://www.messenger.com/t/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=messenger.com
// @grant        none
// ==/UserScript==

(function() {

  'use strict';

  //Add clear button
  console.log("Wait 10sec for the page to load");
  setTimeout(() => {
      let actionButtonsWrapper = document.querySelector("div [aria-label='Nouveau message']").parentElement.parentElement.parentElement;
      let wrapper = document.createElement("div");
      wrapper.innerHTML = "<button>Clear</button>";
      wrapper.firstChild.onclick = clearMessages;
      actionButtonsWrapper.appendChild(wrapper);
      console.log("Button added");
  }, 10000);


  //Functions
  function getRandomMessages(){
      let messages = [...document.querySelectorAll("div.__fb-light-mode[role='row']")];
      return messages[Math.floor(Math.random()*messages.length)];
  }

  function sleep(ms) {return new Promise(res => setTimeout(res, ms));}

  async function clearMessages(){
      try{
          console.log("Lets clear !");

          var mouseOver = new MouseEvent("mouseover", {
              view: window,
              bubbles: true,
              cancelable: true,
          });

          let message = getRandomMessages();
          if (message == null){ console.log("done"); return true;}
          message.style.backgroundColor = "red";
          message.style.border = "2px solid red";

          //1. Scroll to message:
          message.scrollIntoView({ behavior: "smooth" });
          await sleep(200);
          message.dispatchEvent(mouseOver);
          await sleep(200);
          let plusButton = message.querySelector("div[aria-label='Plus']");
          plusButton.style.border = "2px solid purple";
          plusButton.click();
          await sleep(200);
          document.querySelector("div[role='menu'] div[aria-label='Supprimer le message']").click();
          await sleep(200);
          document.querySelector("div[aria-label='Supprimer'][role='button']").click();
          await sleep(200);
          clearMessages();


      }
      catch(err){
          clearMessages();
      }
  }

})();