import React, { Component } from "react";
class ToDo extends Component {
  //   componentDidUpdate() {
  //     this.props.inputElement.current.focus();
  //   }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.props.addItem}>
            <input
              placeholder="TugasMu"
              ref={this.props.inputElement}
              value={this.props.currentItem.text}
              onChange={this.props.handleInput}
            />
            <button type="submit">Tambah Tugas</button>
          </form>
        </div>
      </div>
    );
  }
}
export default ToDo;
