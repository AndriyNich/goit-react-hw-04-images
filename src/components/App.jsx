import React, { useState, useEffect } from 'react';
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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(null);
  const [total, setTotal] = useState(0);

  const handleSearchSubmit = async searchIn => {
    const searchLine = searchIn.trim();
    if (searchLine.length === 0) {
      toast.error('Enter search words', toastParams);
      return;
    }
    setPage(1);
    setSearch(searchLine);
  };

  const handleMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!search) return;

    setStatus(Status.LOAD);

    loadPictures(search, page)
      .then(newPictures => {
        if (newPictures.hits.length === 0) {
          toast.error('Data not found', toastParams);
        }

        setGallery(prev => {
          if (page === 1) {
            return [...newPictures.hits];
          }
          return [...prev, ...newPictures.hits];
        });

        setTotal(newPictures.total);
        setStatus(Status.RESOLVED);
      })
      .catch(err => {
        toast.error(err, toastParams);
      });
  }, [search, page]);

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
        gallery.length !== 0 &&
        total !== gallery.length && <Button onClick={handleMore} />}
      {select && <Modal select={select} onClose={handleCloseModal} />}
      <ToastContainer />
    </div>
  );
}
