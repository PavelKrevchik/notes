const view = {

   init() {
   
      console.log(model.notess)
      this.renderNotes(model.notess)
      
      
      const form = document.getElementById("form")
      const inputTitle = document.getElementById("input-title")
      const textareaDescription = document.getElementById("textarea-text")
      
            

      
      form.addEventListener("submit", function (event) {
         event.preventDefault()
         const title = inputTitle.value
         const description = textareaDescription.value
         const selectedRadio = document.querySelector('input[name="color"]:checked')
         const color =  selectedRadio.value
         const firstColor = document.querySelector('input[name="color"]:first-child')
         // const addItem = controller.addNotes(title, description, color) // add item теперь никуда не приходит по этому можно оставить просто вызов в контроллер
         controller.addNotes(title, description, color)
         // const window = document.getElementById("window")  эти две строчки соответственно тут тоде не нужны
         // const content = document.getElementById("content")
         inputTitle.value = ""
         textareaDescription.value = ""

         if (firstColor) {
            firstColor.checked = true
         }

         // if (addItem) {                            этот блок у тебя вызывается только при ините
         //    if (model.getLength() !== 0) {         в этом и вся проблема, по этому я его перенес
         //       window.classList.add("display")     в render и добавил еще одно условие к нему
         //       content.classList.add("none")       что бы коректно работало 
         //    }
         // }
         
      })

      const listHeart = document.getElementById("list");
      listHeart.addEventListener("click", function (event) {
         if (event.target.closest(".notes__heart")) {
            const button = event.target.closest(".notes__heart")
            const li = button.closest(".notes__item")

            if (li) {
               const notesId = +li.id
               controller.toggleFavourites(notesId)
            }
         }
      })


      const listNotes = document.getElementById("list")
      listNotes.addEventListener("click", function (event) {

         if (event.target.closest(".notes__urn")) {
            const button = event.target.closest(".notes__urn")
            const li = button.closest(".notes__item")

            if (li) {
               const notesId = +li.id
               controller.deleteBtn(notesId)
            }
         }
      })

      const inputCheckbox = document.getElementById("selected-notes");
      inputCheckbox.addEventListener("change", function () {
         const isFavorite = this.checked
         controller.selectedNotes(isFavorite)
      })

   },

   renderNotes(notess, isFavorite = false) {

      const list = document.getElementById("list")
      const favouritesLength = document.getElementById("favourites")
      let notessHTML = ''
      const filterFavorite = isFavorite ? notess.filter(favorite => favorite.isFavorite) : notess
      const favouritesCount = notess.filter(notes => notes.isFavorite).length
      const window = document.getElementById("window") // и эти две строчки перенес сюда
      const content = document.getElementById("content")

      for (const notes of filterFavorite) {
         const heartIcon = notes.isFavorite ? "img/icon/heart-active.svg" : "img/icon/heart-inactive.svg";
         notessHTML += `
         <li id="${notes.id}" class="notes__item" >
               <div class="notes__wrapper-item" style="background-color: ${notes.color}">
                  <h2 class="notes__title">${notes.title}</h2>
                  <div class="notes__wrapper-icon">
                     <button class="notes__heart" >
                        <img  src="${heartIcon}" alt="Игонка">
                     </button>
                     <button id="delete-btn" class="notes__urn" >
                        <img src="img/icon/urn.svg" alt="Иконка">
                     </button>
                  </div>
               </div>
               <div class="notes__info">
                  <p class="notes__text">${notes.description}</p>
               </div>
            </li>
         `
         }
      list.innerHTML = notessHTML 

      const lengthElement = document.getElementById("quantity")
      lengthElement.textContent = model.getLength()
      favouritesLength.textContent = favouritesCount

      if (model.getLength() !== 0) {        // новый блок кода тут.
         window.classList.add("display")    // ошибка в том что класс у тебя присваивался только при ините
         content.classList.add("none")      // а должен каждый раз в рендере как тут
      }else {
         window.classList.remove("display")
         content.classList.remove("none")
      }
   },

   displayMessage(message, isError = false) {
      const messagesContainer = document.getElementById("messages-container");

      const messageElement = document.createElement("div");
      messageElement.className = `message ${isError ? "message-error" : ""}`;

      const messageImg = document.createElement("img");
      messageImg.src = isError ? "img/icon/warning.svg" : "img/icon/done.svg";
      messageImg.alt = "Иконка";

      const messageText = document.createElement("span");
      messageText.textContent = message;

      messageElement.appendChild(messageImg);
      messageElement.appendChild(messageText);

      messagesContainer.appendChild(messageElement);
         
      setTimeout(() => {messageElement.remove()}, 3000);
         
   },
   
}