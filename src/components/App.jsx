import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadPictures } from '../servises/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const Status = {
  IDLE: 'idle',
  LOAD: 'load',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const toastParams = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export function App() {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(null);

  const handleSearchSubmit = async searchIn => {
    const searchLine = searchIn.trim();
    if (searchLine.length === 0) {
      toast.error('Enter search words', toastParams);
      return;
    }
    setStatus(Status.LOAD);
    setGallery([]);

    const newPictures = await loadPictures(searchLine, 1);

    if (newPictures.hits.length === 0) {
      toast.error('Data not found', toastParams);
    }
    setGallery(newPictures.hits);
    setSearch(searchLine);
    setPage(1);
    setStatus(Status.RESOLVED);
  };

  const handleMore = async () => {
    setStatus(Status.LOAD);

    const newPictures = await loadPictures(search, page + 1);

    const statusTmp =
      gallery.length + newPictures.hits.length >= newPictures.total
        ? Status.IDLE
        : Status.RESOLVED;

    setGallery(prev => [...prev, ...newPictures.hits]);
    setPage(prev => prev + 1);
    setStatus(statusTmp);
  };

  const handleSelectedPicture = select => {
    setSelect(select);
  };

  const handleCloseModal = () => {
    setSelect(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery gallery={gallery} onClick={handleSelectedPicture} />
      {status === Status.LOAD && <Loader />}
      {status !== Status.LOAD &&
        status !== Status.IDLE &&
        gallery.length !== 0 && <Button onClick={handleMore} />}
      {select && <Modal select={select} onClose={handleCloseModal} />}
      <ToastContainer />
    </div>
  );
}
