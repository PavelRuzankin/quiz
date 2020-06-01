import React from "react";
import MenuToggle from "../../components/MenuToggle";
import Drower from "../../containers/Drower";
import { connect } from "react-redux";

export const ChangeToggleContext = React.createContext();
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onToggle: false,
    };
  }

  changeToggle() {
    this.setState((prevState) => {
      return {
        onToggle: !prevState.onToggle,
      };
    });
  }
  render() {
    return (
      <div className={"Layout"}>
        {this.state.onToggle ? (
          <div
            onClick={() => this.setState({ onToggle: !this.state.onToggle })}
            className={"dark"}
          ></div>
        ) : null}
        <ChangeToggleContext.Provider value={this.changeToggle.bind(this)}>
          <Drower
            isAuthorized={this.props.isAuthorized}
            onToggle={this.state.onToggle}
          />
        </ChangeToggleContext.Provider>
        <MenuToggle
          onToggle={this.state.onToggle}
          changeToggle={this.changeToggle.bind(this)}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthorized: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
