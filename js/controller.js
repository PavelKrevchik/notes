// обработка действий пользователя, обновление модели
const controller = {
   addNotes(title, description, color) {
      const titleTrimmed = title.trim();
      const descriptionTrimmed = description.trim();

      if (titleTrimmed !== "" && titleTrimmed.length <= 50 && descriptionTrimmed !== "" && descriptionTrimmed.length <= 250) {
         model.addNotes(titleTrimmed, descriptionTrimmed, color)
         view.displayMessage("Заметка добавлена!");
         return true
      } else {
         if (titleTrimmed.length > 50) {
            view.displayMessage("Максимальная длина заголовка — 50 символов", true);
         } else if (descriptionTrimmed.length > 250) {
            view.displayMessage("Максимальная длина описания — 250 символов", true);
         } else if (titleTrimmed === "" || descriptionTrimmed === "") {
            view.displayMessage("Заголовок или описание не могут быть пустыми", true);
         }
         return false
      }
   },

   toggleFavourites(notesId) {
      model.toggleFavourites(notesId)
   },
 
   deleteBtn(notesId) {
      model.deleteNotes(notesId) 
      view.displayMessage("Заметка удалена!");
   },

   selectedNotes(isFavorite) {
      model.selectedNotes(isFavorite)
   }

}