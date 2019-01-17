import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

class MainNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
     isOpen: false
   };
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }


  render() {
    return (
      <div>

        <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">ToDO List</NavbarBrand>
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                      <NavItem>
                        <NavLink onClick={this.logout.bind(this)} href={'#'}>logout</NavLink>
                      </NavItem>

                    </Nav>
                  </Collapse>
                </Navbar>


      </div>
    );
  }

}

function mapStateToProps(state) {
  return {mainNav: state};
}

export default connect(mapStateToProps, {})(MainNav);
