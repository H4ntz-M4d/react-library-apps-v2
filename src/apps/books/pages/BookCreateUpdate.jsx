import { BookProvider } from "../context/BooksContext"
import { CreateUpdateContent } from "../content/CreateUpdateContent"

export const BookCreateUpdate = () => {
    return (
        <BookProvider>
            <CreateUpdateContent />
        </BookProvider>
    )
}