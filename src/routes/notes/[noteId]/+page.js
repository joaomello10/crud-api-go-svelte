export const load = ({ fetch, params }) => {
  const id = params.noteId
  // import { key } from "./+page.svelte"

  // console.log(key)
  const fetchNote = async (id) => {
    const response = await fetch(`http://localhost:8080/notes/${id}`)
    const data = await response.json()
    //console.log(note)
    return data

  }

  return fetchNote(id)

}
