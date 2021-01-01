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
      data: { ...data, restrictions: restrictions, name: "test" },
    });
  }

  const onSubmit = (values) => {
    createListing(values, JSON.stringify(restrictions));
    setRestrictions([]);
  };

  const options = [
    { value: "halal", label: "Halal" },
    { value: "vegetarian", label: "Vegeterian" },
    { value: "vegan", label: "Vegan" },
    { value: "nut", label: "Nut Free" },
    { value: "lactose", label: "Lactose Free" },
  ];

  const [restrictions, setRestrictions] = useState([]);

  const handleChange = (e) => {
    setRestrictions(e);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title
          <input type="text" name="title" ref={register} />
        </label>
        <label>
          Description
          <input type="text" name="description" ref={register} />
        </label>
        <label>
          Dietary Restrictions
          <CreatableSelect
            isMulti
            closeMenuOnSelect={false}
            onChange={handleChange}
            options={options}
          />
        </label>
        <br />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default ListingForm;
