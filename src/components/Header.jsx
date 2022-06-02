import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
  } from 'mdb-react-ui-kit';

const Header = () => {

    const [showNavColor, setShowNavColor] = useState(false);

  return (
    <>
        <MDBNavbar expand='lg' light style={{backgroundColor: "#541b1b"}}>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'>
                    <img src="/images/logo.jpg" alt="Logo" style={{height: "30px"}} />
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarColor02'
                    aria-controls='navbarColor02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavColor(!showNavColor)}
                    style={{color: "#fff"}}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                    <MDBCollapse show={showNavColor} navbar>
                    <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem className='active'>
                            <MDBNavbarLink aria-current='page' href=''>
                                <Link to='/'>Home</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/addBlog'> 
                                <Link to='/addBlog'>Add Blog</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/about'>
                                <Link to='/about'>About</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/blog/:id'>
                                {/* <Link to="/blog/:id">Blog</Link> */}
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>    
    </>
  )
}

export default Header