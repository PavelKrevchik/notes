// хранение данных, бизнес-логика
const model = {
   notess: JSON.parse(localStorage.getItem("notes")) || [],

   addNotes(title, description, color) {
      const id = Date.now()
      const newNotess = { id, isFavorite: false, title, description, color }
      this.notess.unshift(newNotess)
      
      view.renderNotes(this.notess)
      this.saveNotess()
   },

   toggleFavourites(notesId) {
      this.notess = this.notess.map((notes) => {
      if (notes.id === notesId) {
         notes.isFavorite = !notes.isFavorite
      }
         return notes
      })
      view.renderNotes(this.notess)
      this.saveNotess()
      
   },

   selectedNotes(isFavorite) {
      view.renderNotes(this.notess, isFavorite) 
      this.saveNotess()
   },
   
  
   deleteNotes(notesId) {
      this.notess = this.notess.filter((notes) => notes.id !== notesId)
      view.renderNotes(this.notess)
      this.saveNotess()
   },
   

   getLength() {
      return this.notess.length
   },

   saveNotess() {
      localStorage.setItem("notes", JSON.stringify(this.notess))
   }
}