import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const ListingForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });

  function createListing(data, restrictions) {
    data.location = data.location.replace("-", "");
    data.location = data.location.replace(" ", "");
    data.location = data.location.toUpperCase();
    console.log({ ...data, restrictions: restrictions, name: "test" });
    axios({
      method: "post",
      url: "http://localhost:8000/add",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: { ...data, restrictions: restrictions, name: "test" },
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

  const [restrictions, setRestrictions] = useState([]);

  const handleChange = (e) => {
    setRestrictions(e);
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
              style={{ height: 169, width: 420 }}
            />
          </label>
        </div>

        <div>
          Location
          <input
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
          <label className="font-weight-bold">
            Dietary Restrictions
            <CreatableSelect
              isMulti
              closeMenuOnSelect={false}
              onChange={handleChange}
              options={options}
            />
          </label>
        </div>

        <br />
        <button type="submit" className="btn btn-dark">
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default ListingForm;
