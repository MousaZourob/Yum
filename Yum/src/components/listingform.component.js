import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const ListingForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [restrictions, setRestrictions] = useState([]);
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");

  function createListing(data, restrictions) {
    data.location = data.location.replace("-", "");
    data.location = data.location.replace(" ", "");
    data.location = data.location.toUpperCase();
    getLocationData(data.location);
    data.location = location;
    axios({
      method: "post",
      url: "http://localhost:8000/listings/add",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: { ...data, restrictions: restrictions, name: "test", image: image },
    });
  }

  async function getLocationData(postcode) {
    console.log(postcode);
    axios({
      method: "post",
      url: "http://localhost:8000/listing/location",
      data: { post_code: postcode },
    }).then((res) => {
      if (res.data.status == "OK") {
        setLocation(JSON.stringify(res.data.results[0].geometry));
      }
    });
  }

  const onSubmit = (values) => {
    createListing(values, JSON.stringify(restrictions));
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
              })}
              className="form-control"
              style={{ height: "160px", width: "240%" }}
            />
          </label>
        </div>

        <div style={{ fontWeight: "bold" }}>
          Postal Code
          <input
            style={{ marginLeft: "1%", marginTop: "2%" }}
            type="text"
            name="location"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
                message: "Invalid Postal Code",
              },
            })}
          />
          {errors.location && <span>{errors.location.message}</span>}
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
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default ListingForm;
