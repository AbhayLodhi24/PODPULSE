import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DescriptionPage = () => {
  const { id } = useParams();
  const [podcasts, setPodcasts] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/get-podcast/${id}`
      );
      setPodcasts(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4">
      {podcasts && (
        <>
          <div className="w-2/6 flex items-center justify-center md:justify-start md:items-start">
            <img
              src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${podcasts.frontImage}`}
              alt="Thumbnail"
              className="rounded w-full h-[50vh] object-cover "
            />
          </div>
          <div className="w-4/6">
            <div className="text-4xl font-semibold">{podcasts.title}</div>
            <h4 className="mt-4"> {podcasts.description} </h4>
            <div className="mt-2 w-fit bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
              {podcasts.category.categoryName}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DescriptionPage;
