import React, { Component } from "react";

/* #################### */
/* ##### Gallery ###### */
/* #################### */

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: []
    };
  }
  render() {
    const images = this.state.gallery.map((image, key) => {
      return (
        <Image
          key={key}
          id={image.id}
          format={image.format}
          height={image.height}
          width={image.width}
          deleteImage={this.deleteImage.bind(this)}
        />
      );
    });
    return (
      <div>
        <Header addImage={this.addImage.bind(this)} />
        <ul className="grid">{images}</ul>
      </div>
    );
  }

  addImage(format) {
    const { gallery } = this.state;
    const galleryLength = gallery.length;

    const newImage = {
      id: galleryLength + 1,
      format: format,
      width: width,
      height: height
    };
    this.setState({
      gallery: gallery.concat(newImage)
    });
  }

  deleteImage(id) {
    const newState = this.state.gallery.filter(item => {
      return item.id !== id;
    });
    this.setState({
      gallery: newState
    });
  }
}

/* ################### */
/* ##### Header ###### */
/* ################### */

const Header = ({ addImage }) => (
  <header className="header">
    <h1 className="header__title">scifgif - image search</h1>
    <p className="header__intro">
      Type a <code>keyword</code> to filter on and then click the image to copy it's URL to your clipboard.
    </p>
    <Controls addImage={addImage} />
  </header>
);

/* ####################### */
/* ##### UI Buttons ###### */
/* ####################### */

class Controls extends Component {
  render() {
    const sizes = ["giphy", "xkcd", "dilbert"];
    const buttons = sizes.map((size, key) => {
      return (
        <button
          className="header__button"
          key={key}
          onClick={this.handleClick.bind(this, size)}
        >
          {size}
        </button>
      );
    });
    return <div className="controls">{buttons}</div>;
  }

  handleClick(size) {
    this.props.addImage(size);
  }
}

/* ####################### */
/* ##### Image Item ###### */
/* ####################### */

class Image extends Component {
  render() {
    const { id, url } = this.props;

    return (
      <li className={`grid__item grid__item--big`}>
        <img
          className="grid__image"
          src={`http://localhost:3993/${url}`}
          alt=""
        />
        <button
          className="grid__close"
          onClick={this.handleDelete.bind(this, id)}
        >
          &times;
        </button>
      </li>
    );
  }

  handleDelete(id) {
    this.props.deleteImage(id);
  }
}