import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const ListingForm = () => {
  const { register, handleSubmit } = useForm({});

  function createListing(data, restrictions) {
    console.log({ ...data, restrictions: restrictions, name: "test" });
    axios({
      method: "post",
      url: "http://localhost:8000/listings/add",
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
              ref={register}
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
              ref={register}
              className="form-control"
              style={{ height: 169, width: 420 }}
            />
          </label>
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
