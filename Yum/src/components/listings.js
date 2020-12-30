import React from "react";
import { useForm } from "react-hook-form";

const Listings = (props) => {
  const { register, handleSubmit } = useForm({});

  const onSubmit = (values) => {
    props.createListing(values);
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
          <input type="text" name="di_re" ref={register} />
        </label>
        <br />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default Listings;
