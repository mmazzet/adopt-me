import { Component, MouseEvent } from "react";

interface IProps {
  images: [];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    if (e.target.dataset.index) {
      this.setState({
        active: +e.target.dataset.index
      });
    }
  };
  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="flex justify-around items-center h-[400px] mt-2">
        <img src={images[active]} alt="animal hero" className="max-w-[45%] max-h-[400px]" />
        <div className="w-1/2 flex justify-center">
          {images.map((photo, index) => (
            // eslint-disable-next-line 
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={`w-[100px] h-[100px] rounded-full m-[15px] cursor-pointer border-2 ${index === active ? "border-gray-800 opacity-60" : "border-gray-800"}`}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
