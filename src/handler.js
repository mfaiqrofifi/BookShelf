const { nanoid } = require('nanoid');
const books = require('./books');

const addHandlerBooks = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);
  const newBooks = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };
  books.push(newBooks);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  console.log(name, reading, finished);
  console.log(reading === '1');
  console.log(books.length);
  const bookNew = books.map((element) => {
    const { id, name, publisher } = element;
    return {
      id,
      name,
      publisher,
    };
  });
  if (name) {
    const filterBook = bookNew.filter((b) => b.name === name);
    return {
      status: 'success',
      data: {
        books: filterBook,
      },
    };
  }
  if (reading) {
    const filterBook = books.filter((b) => b.reading == (reading === '1'));
    const bookg = filterBook.map((element) => {
      const { id, name, publisher } = element;
      return {
        id,
        name,
        publisher,
      };
    });
    console.log(reading);
    return {
      status: 'success',
      data: {
        books: bookg,
      },
    };
  }
  if (finished) {
    const filterBook = books.filter((b) => b.finished == (finished === '1'));
    const bookg = filterBook.map((element) => {
      const { id, name, publisher } = element;
      return {
        id,
        name,
        publisher,
      };
    });
    return {
      status: 'success',
      data: {
        books: bookg,
      },
    };
  }
  return {
    status: 'success',
    data: {
      books: bookNew,
    },
  };
};

const getHandlerById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((b) => b.id === id)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateHandler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const index = books.findIndex((book) => book.id === id);
  const finished = (pageCount === readPage);
  if (index !== -1) {
    books[index] = {
      ...books[index], name, year, author, summary, publisher, pageCount, finished, readPage, reading, updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addHandlerBooks, getAllHandler, getHandlerById, updateHandler, deleteHandler,
};