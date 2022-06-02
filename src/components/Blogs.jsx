import React from 'react'
import {
    MDBCol, 
    MDBCard, 
    MDBCardTitle, 
    MDBCardBody, 
    MDBCardImage, 
    MDBCardText, 
    MDBBtn, 
    MDBIcon
} from 'mdb-react-ui-kit'
import {Link} from 'react-router-dom'
import Badge from './Badge'

const Blogs = ({title, category, description, id, imageUrl, exerpt, handleDelete}) => {
  return (
    <MDBCol size="4">
        <MDBCard style={{maxWidth: "22rem", height: "200px", marginTop: "10px"}}>
            <MDBCardImage 
                src={imageUrl} 
                position='top'
                style={{maxWidth: "22rem", height: "200px", overflow: 'hidden'}}
            />
            <MDBCardBody>
                <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>
                    {exerpt(description)}
                    <Link to={`/blog/${id}`}>Read More</Link>
                </MDBCardText>
                <Badge>{category}</Badge>
                <span>
                    <MDBBtn 
                        style={{marginTop: '5px'}}
                        tag="a" 
                        color="none" 
                        onClick={() => handleDelete(id)}
                    >
                        <MDBIcon
                            fas
                            icon='trash'
                            style={{color: "#dd4b39"}}
                            size='lg'
                        />
                    </MDBBtn>
                    <Link to={`/editBlog/${id}`}>
                        <MDBIcon
                            fas
                            icon='edit'
                            style={{color: "#55acee", marginLeft: "10px"}}
                            size='lg'
                        />
                    </Link>
                </span>
            </MDBCardBody>
        </MDBCard>
    </MDBCol>
  )
}

export default Blogs