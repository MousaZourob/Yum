import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const Listings = (props) => {
  const { register, handleSubmit } = useForm({});

  const onSubmit = (values) => {
    props.createListing(values, JSON.stringify(restrictions));
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
          {console.log(restrictions)}
        </label>
        <br />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default Listings;
