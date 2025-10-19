import { BookProvider } from "../context/BooksContext"
import { CreateUpdateContent } from "../views/CreateUpdateContent"

export const BookCreateUpdate = () => {
    return (
        <BookProvider>
            <CreateUpdateContent />
        </BookProvider>
    )
}