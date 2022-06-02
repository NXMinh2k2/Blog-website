import React, { useEffect, useState } from 'react'
import {
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard, 
  MDBCardTitle, 
  MDBCardBody, 
  MDBCardImage, 
  MDBCardText, 
  MDBTypography
} from "mdb-react-ui-kit"
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import Badge from '../components/Badge'


const Blog = () => {

  const [blog, setBlog] = useState()
  const [relatedPost, setRelatedPost] = useState([])
  const {id} = useParams()

  useEffect(() => {
    if(id) {
      getSingleBlog()
    }
  }, [id])


  const getSingleBlog = async () => {
    const res = await axios.get(`http://localhost:5000/blogs/${id}`)
    const relatedPostData = await axios.get(`http://localhost:5000/blogs?category=${res.data.category}&_start=0&_end=3`)
    if(res.status === 200) {
      setBlog(res.data)
      setRelatedPost(relatedPostData.data)
    } else {
      alert("Something went wrong")
    }
  } 

  const exerpt = (str) => {
    if(str.length > 50) {
      str = str.substring(0, 50) + "..."
    }
    return str
  }

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px"
  }
  return (
      <MDBContainer style={{border: "1px solid #d1ebe8", marginTop: "20px"}}>
        <Link to='/'>
          <strong style={{float: "left", color: "black"}}>
            Go Back
          </strong>
        </Link>
        <MDBTypography 
          tag="h2" 
          style={{display: "inline-block"}}
        >
          {blog && blog.title}
        </MDBTypography>
        <img 
          src={blog && blog.imageUrl} 
          className="img-fluid rounded"
          style={{width: '100%', maxHeight: "600px"}}
        />
        <div style={{marginTop: "20px"}}>
          <div style={{height: "43px", background: "#f6f6f6", padding: "0 10px"}}>
            <MDBIcon
              style={{float: "left", fontSize: "20px"}}
              className="mt-3"
              far
              icon='calendar-alt'
              size='lg'
            />
            <strong style={{float: "left", marginTop: "12px", marginLeft: "10px"}}>
              {blog && blog.date}
            </strong>
            <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
          </div>
          <MDBTypography className='lead md-0' style={{marginTop: '20px'}}>
            {blog && blog.description}
          </MDBTypography>
        </div>
        {relatedPost && relatedPost.length > 0 && (
          <>
            {relatedPost.length > 1 && <h1 style={{marginTop: '40px', color: "red"}}>Related Post</h1>}
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
              {relatedPost.filter(item => item.id != id).map((item, index) => (
                <MDBCol key={index}>
                  <MDBCard>
                    <Link to={`/blog/${item.id}`}>
                      <MDBCardImage 
                      src={item.imageUrl}
                      position="top"
                      />
                    </Link>
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText>{exerpt(item.description)}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
            </MDBRow>
          </>
        )}
      </MDBContainer>
    )
}

export default Blog