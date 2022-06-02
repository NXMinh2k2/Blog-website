import React, { useEffect, useState } from 'react'
import {MDBValidation, MDBInput, MDBBtn} from "mdb-react-ui-kit"
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom'

// snjxprur
const initialState = {
  title: "",
  description: "",
  category: "", 
  imageUrl: ""
}

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"]

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState)
  const [categoryErrMsg, setCategoryErrMsg] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const {title, description, category, imageUrl} = formValue
  
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
      if(id) {
        setEditMode(true)
        getSingleBlog(id)
      } else {
        setEditMode(false)
        setFormValue({...initialState})
      }
  }, [id])

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`)
    if(singleBlog.status === 200) {
      setFormValue({...singleBlog.data})
    } else {
      alert("Something went wrong")
    }
  }
  
  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
  }

  const onUploadImage = (file) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "snjxprur")
      axios.post("http://api.cloudinary.com/v1_1/nguyenxuanminh/image/upload", formData)
      .then( (res) => {
        alert("Image Uploaded Successfully")
        setFormValue({...formValue, imageUrl: res.data.url})
      })
      .catch( (err) => {
        alert("Something went wrong")
      })
  }

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null)
    setFormValue({...formValue, category: e.target.value})
  }

  const getDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, "0")
    let mm = String(today.getMonth() + 1).padStart(2, "0")
    let yyyy = today.getFullYear()

    today = mm + "/" + dd + "/" + yyyy
    return today
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!category) {
      setCategoryErrMsg("Please select a category")
    }
    const imageValidation = !editMode ? imageUrl : true;
    if(title && description && imageUrl && category) {
      const currentDate = getDate()
      if(!editMode) {
        const updatedBlogData = {...formValue, date: currentDate}
        const res = await axios.post("http://localhost:5000/blogs", updatedBlogData)
        if(res.status == 201) {
          alert("Blog Created Successfully")
        } else {
          alert("Something went wrong")
        }
      } else {
        const res = await axios.put(`http://localhost:5000/blogs/${id}`, formValue)
        if(res.status == 200) {
          alert("Blog Updated Successfully")
        } else {
          alert("Something went wrong")
        }
      }
      setFormValue({title: "", description: "", category: "", imageUrl: ""})
      navigate("/")
    }
  }
  


  
  return (
      <MDBValidation 
        className='g-3' 
        style={{marginTop: "100px"}} 
        noValidate 
        onSubmit={handleSubmit}>
        <p style={{fontSize: "24px" , fontWeight : "bold"}}>{editMode ? "Update Blog" : "Add Blog"}</p>
        <div style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}>
          <MDBInput
            value={title || ""}
            name="title"
            type="text"
            onChange={onInputChange}
            required
            label="Title"
            validation="Please provide a title"
            invalid
          />
          <br />
          <MDBInput
            value={description || ""}
            name="description"
            type="text"
            onChange={onInputChange}
            required
            label="Description"
            validation="Please provide a description"
            textarea
            rows={4}
            invalid
          />
          <br />
          {
            !editMode && (
              <>
                <MDBInput
                  type="file"
                  onChange={(e) => onUploadImage(e.target.files[0])}
                  required
                  validation="Please provide a image"
                  invalid
                />
                <br />
              </>
            )
          }
          <select className="categoryDropdown" style={{marginBottom: "20px"}} onChange={onCategoryChange} value={category}>
            <option>Plesea select category</option>
            {
              options.map((option, index) => (
                <option value={option || ""} key={index}>
                  {option}
                </option>
              ))
            }
          </select>
          {categoryErrMsg && (
            <div className="categoryErrMsg">{categoryErrMsg}</div>
          )}
          <br />
          <MDBBtn 
            type='submit' 
            style={{marginRight: "10px"}}
          >
          {editMode ? "Update" : "Add Blog"}
          </MDBBtn>
          <MDBBtn 
            color='danger' 
            style={{marginRight: "10px"}} 
            onClick={() => navigate("/")}>
          Go Back
          </MDBBtn>
        </div>
      </MDBValidation>
    )
}

export default AddEditBlog