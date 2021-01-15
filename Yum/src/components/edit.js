import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import queryString from "query-string";

const EditListingForm = () => {

  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onBlur",
  });

  const [state, setState] = useState({
    title: "test",
    description: "",
    restrictions: {

    },
    image: ""
  });

  async function getData() {
    const res = await axios({
      method: "get",
      url: "http://localhost:8000/listings/get/" + queryString.parse(window.location.search).id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })

    return res.data;
  }

  useEffect(() => {
    getData().then((response) => {
      setValue("title", response.title)
      setValue("description", response.description)
      setValue("restrictions", response.restrictions)
      setValue("image", response.image)
    })
  },[])

  const [restrictions, setRestrictions] = useState([]);
  const [image, setImage] = useState("");

  async function EditListing(data, restrictions) {
    const res = await axios({
      method: "put",
      url: "http://localhost:8000/listings/update/" + queryString.parse(window.location.search).id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: { 
          _id: queryString.parse(window.location.search).id,
          title: data.title,
          description: data.description,
          restrictions: restrictions,
          location: state.location,
          image: image },
    });

    if (res.data._id) {
      window.location = `/listings?open=${res.data._id}`;
    }
  }

  const onSubmit = async (values) => {
    await EditListing(values, JSON.stringify(restrictions));
    setRestrictions([]);
    
  };
  
  const options = [
    { value: "halal", label: "Halal" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "nut", label: "Nut Free" },
    { value: "lactose", label: "Lactose Free" },
  ];

  const handleChange = (e) => {
    setRestrictions(e);
  };

  const handleImage = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    axios({
      method: "post",
      url: "http://localhost:8000/images/upload",
      validateStatus: null,
      data: formData,
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.data.filename);
        setImage(res.data.filename);
      } else {
        console.log(`Upload failed with res status ${res.status}`);
      }
    });
  };

  return (
    <div className="form-group container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="font-weight-bold" style={{ paddingTop: 10 }}>
            Title
            <input
              type="text"
              name="title"
              ref={register({
                required: "Required",
                maxLength: 60,
                defaultValue: state.title
              })}
              className="form-control"
            />
          </label>
        </div>
        <div>
          <label className="font-weight-bold">
            Description
            <textarea
              type="text"
              name="description"
              ref={register({
                required: "Required",
                maxLength: 350,
              })}
              className="form-control"
              style={{ height: "160px", width: "240%" }}
            />
          </label>
        </div>
        <div>
          <label className="font-weight-bold" style={{ marginTop: "2%" }}>
            Dietary Restrictions
            <CreatableSelect
              isMulti
              closeMenuOnSelect={false}
              onChange={handleChange}
              options={options}
            />
          </label>
        </div>
        <div class="font-weight-bold" style={{ marginTop: "2%" }}>
          Upload Image:
          <input
            style={{ marginLeft: "1%" }}
            type="file"
            name="image"
            onChange={handleImage}
          />
        </div>

        <br />
        <button
          style={{ marginTop: "2%" }}
          type="submit"
          className="btn btn-dark"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default EditListingForm;
