import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTypography
} from "mdb-react-ui-kit"
import Blogs from '../components/Blogs'
import Search from '../components/Search'
import Category from '../components/Category'
import LatesBlog from '../components/LatesBlog'

const Home = () => {

  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"]

  const [data, setData] = useState([])
  const [latestBlog, setLatestBlog] = useState([])
  const [searchValue, setSearchValue] = useState('')
  // const [currentPage, setCurrentPage] = useState(0)
  // const [totalBlog, setToTalBlog] = useState(null)
  // const [pageLimit] = useState(5)

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure that you want to delete that blog?")) {
      const res = await axios.delete(`http://localhost:5000/blogs/${id}`)
      if(res.status == 200) {
        // alert("Blog Deleted Successfully")
        loadBlogsData()
      } else {
        alert("Something went wrong")
      }
    }
  }

  const exerpt = (str) => {
    if(str.length > 50) {
      str = str.substring(0, 50) + "..."
    }
    return str
  }

  const onInputChange = (e) => {
    if(!e.target.value) {
      loadBlogsData()
    }
    setSearchValue(e.target.value)
  }

  const handleSearch = async (e) => {
     e.preventDefault()
     const res = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`)
     if(res.status === 200) {
       setData(res.data)
     } else {
       alert("Something went wrong")
     }
  }

  const handleCategory = async (category) => {
    const res = await axios.get(`http://localhost:5000/blogs?category=${category}`)
    if(res.status === 200) {
      setData(res.data) 
    } else {
      alert("Something went wrong")
    }
  }

  const fetchLatesBlog = async () => {
    const totalBlog = await axios.get('http://localhost:5000/blogs')
    const start = totalBlog.data.length - 4 
    const end = totalBlog.data.length
    const res = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`)
    if(res.status === 200) {
      setLatestBlog(res.data) 
    } else {
      alert("Something went wrong")
    }
  }

  const loadBlogsData = async () => {
    const res = await axios.get('http://localhost:5000/blogs')
    if(res.status == 200) {
      setData(res.data)
    } else {
      alert("Something went wrong")
    }
  }

  useEffect(() => {
    loadBlogsData()
    fetchLatesBlog()
  }, [])

  return (
    <>
      <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/>
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Blog Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data && data.map((item, index) => (
                  <Blogs 
                  key={index}
                  {...item} 
                  exerpt={exerpt}
                  handleDelete={handleDelete}
                  />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size='3'>
          <h4 className='text-start'>Latest Post</h4>
          {latestBlog && latestBlog.map((item, index) => (
            <LatesBlog key={index} {...item}/>
          ))}
          <Category options={options} handleCategory={handleCategory}/>
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default Home