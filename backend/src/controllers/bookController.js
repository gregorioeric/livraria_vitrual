import BookModel from '../models/Book.js';

class BookController {
    async allBooks(req, res) {
        const books = await BookModel.showBooks();

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }
        res.status(200).json(books);

        // res.status(500).json({ error: error.message });
    }

    async findBook(req, res) {
        const { name } = req.params;
        const book = await BookModel.findBookByName(name);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    }

    async createBook(req, res) {
        const newBook = await BookModel.createBook(req.body);

        if (newBook.affectedRows === 0) {
            return res.status(400).json({ message: "Failed to create book" });
        }

        res.status(201).json({ message: "Book created successfully" });
    }

    async updateBook(req, res) {
        const { id } = req.params;
        const updatedBook = await BookModel.updateBook(id, req.body);

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully" });
    }

    async deleteBook(req, res) {
        const { id } = req.params;
        const deletedBook = await BookModel.deleteBook(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    }
}

export default new BookController();