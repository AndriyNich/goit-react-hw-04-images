import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    gallery: [],
    status: Status.IDLE,
    page: 0,
    search: '',
    select: null,
  };

  handleSearchSubmit = async search => {
    const searchLine = search.trim();
    if (searchLine.length === 0) {
      toast.error('Enter search words', toastParams);
      return;
    }
    this.setState({ status: Status.LOAD, gallery: [] });
    const newPictures = await loadPictures(searchLine, 1);
    if (newPictures.hits.length === 0) {
      toast.error('Data not found', toastParams);
    }
    this.setState({
      gallery: newPictures.hits,
      search: searchLine,
      page: 1,
      status: Status.RESOLVED,
    });
  };

  handleMore = async () => {
    this.setState({ status: Status.LOAD });
    const newPictures = await loadPictures(
      this.state.search,
      this.state.page + 1
    );

    const status =
      this.state.gallery.length + newPictures.hits.length >= newPictures.total
        ? Status.IDLE
        : Status.RESOLVED;

    this.setState({
      gallery: [...this.state.gallery, ...newPictures.hits],
      page: this.state.page + 1,
      status: status,
    });
  };

  handleSelectedPicture = select => {
    this.setState({ select });
  };

  handleCloseModal = () => {
    this.setState({ select: null });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery
          gallery={this.state.gallery}
          onClick={this.handleSelectedPicture}
        />
        {this.state.status === Status.LOAD && <Loader />}
        {this.state.status !== Status.LOAD &&
          this.state.status !== Status.IDLE &&
          this.state.gallery.length !== 0 && (
            <Button onClick={this.handleMore} />
          )}
        {this.state.select && (
          <Modal select={this.state.select} onClose={this.handleCloseModal} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
