import React, { Component } from "react";
import { Carousel, Button } from "antd";
import { RightSquareOutlined, LeftSquareOutlined } from "@ant-design/icons";
import Scrapper from "../components/scrapper";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
    this.materi = this.props.materi;
    this.max = this.props.max;
    this.lang = this.props.lang;
    this.device = this.props.device;
    this.state = {
      dataCarousel: [],
      pageSize: {
        width: 0,
        height: 0,
      },
      currentPage: 1,
    };
  }

  _onPageResize = () => {
    this.setState({
      pageSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  componentDidMount = async () => {
    const data = await Scrapper(this.materi, this.max, this.lang);
    this.setState({ dataCarousel: data }, () => {
      this._onPageResize();
      window.addEventListener("resize", this._onPageResize);
    });
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.materi !== prevProps.materi) {
      const data = await Scrapper(
        this.props.materi,
        this.props.max,
        this.props.lang
      );
      this.setState({ dataCarousel: data }, () => {
        this._onPageResize();
        window.addEventListener("resize", this._onPageResize);
      });
    }
  };

  render() {
    let maxPages = this.state.dataCarousel.length - 1;
    let minPages = 1;
    return (
      <>
        <Carousel
          ref={(node) => (this.carousel = node)}
          dots={false}
          afterChange={(x) => {
            this.setState(() => ({
              currentPage: x,
            }));
          }}
        >
          {this.state.dataCarousel.map((imageUrl, i) => {
            return (
              <div key={i}>
                <h3
                  style={
                    this.device === "big"
                      ? styles.imageContent
                      : { height: "fit-content" }
                  }
                >
                  <Zoom>
                    <picture>
                      <source media="(max-width: 800px)" srcSet={imageUrl} />
                      <img
                        style={
                          this.device === "big"
                            ? {
                                height: this.state.pageSize.height,
                                width: this.state.pageSize.width - 295,
                              }
                            : { width: "95vw" }
                        }
                        src={imageUrl}
                        alt=""
                      />
                    </picture>
                  </Zoom>
                </h3>
              </div>
            );
          })}
        </Carousel>
        <div
          className="buttonContainer"
          style={
            this.device === "big"
              ? {}
              : { display: "flex", flexDirection: "column" }
          }
        >
          <div style={{ display: "flex" }}>
            <div style={styles.buttonPrev}>
              <Button
                onClick={() => {
                  if (parseInt(this.state.currentPage) <= minPages) {
                    this.setState(() => ({
                      currentPage: 1,
                    }));
                  } else {
                    this.setState(() => ({
                      currentPage: parseInt(this.state.currentPage) - 1,
                    }));
                    this.carousel.prev();
                  }
                }}
              >
                <LeftSquareOutlined /> Materi Sebelumnya
              </Button>
            </div>

            <div style={styles.buttonNext}>
              <Button
                onClick={() => {
                  if (this.state.currentPage >= maxPages) {
                    this.setState(() => ({
                      currentPage: this.state.currentPage,
                    }));
                  } else {
                    this.setState(() => ({
                      currentPage: parseInt(this.state.currentPage) + 1,
                    }));
                    this.carousel.next();
                  }
                }}
              >
                Lanjutkan Materi <RightSquareOutlined />
              </Button>
            </div>
          </div>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <h1>
              <input
                type="number"
                value={this.state.currentPage}
                onInput={(e) => {
                  if (e.target.value > maxPages) {
                    alert(`Max Pages ${maxPages}`);
                  } else {
                    this.setState(() => ({
                      currentPage: e.target.value,
                    }));
                  }
                }}
                max={maxPages}
                min={1}
                style={{ width: "45px", border: "none" }}
              />
              /{maxPages}
            </h1>
            <Button
              onClick={() => {
                this.state.currentPage > maxPages
                  ? alert("Materi Tidak Ada")
                  : this.carousel.goTo(this.state.currentPage);
              }}
              style={
                this.device === "big"
                  ? { marginLeft: "5px" }
                  : { width: "fit-content" }
              }
            >
              GoTo
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const styles = {
  buttonPrev: {
    bottom: 0,
    left: 0,
  },
  buttonNext: {
    bottom: 0,
    marginLeft: "auto",
  },
  imageContent: {
    height: "100vh",
    color: "#fff",
    textAlign: "center",
    background: "#364d79",
  },
};
