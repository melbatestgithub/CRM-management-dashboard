import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignIssue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIssue();
  }, []);

  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";

  const getIssue = async () => {
    try {
      const res = await axios.get(`${baseUrl}/issue/getSolvedIssue`);
      setData(res.data)
      setLoading(false);
    } catch (error) {
      console.log("Unable to fetch unassigned issues:", error);
      setLoading(false);
    }
  };



  return (
    <div className=" mx-4" style={{minWidth:"800px"}}>
      <div className="">
        <h3 className="text-center my-3 bg-gray-300 p-2 font-semibold">List of Assigned Issues</h3>
        {loading && <p>Loading...</p>}
        {!loading && data.length === 0 && <p>You have no assigned issue.</p>}
        {!loading && data.length > 0 && ( 
          <div>
            {data.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-md mb-4 shadow-lg">
                <>
                  <div>
                    <span className="font-semibold text-lg">Issue Title</span>
                    <p className="">{item.title}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">Description</span>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">Issue Id</span>
                    <p className="text-gray-700">{item._id}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">User Id</span>
                    <p className="text-gray-700">{item.userId}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      Submission Date
                    </span>
                    <p className="text-gray-700">{item.date}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      Issue Category
                    </span>
                    <p className="text-gray-700">{item.category}</p>
                  </div>
                  <div>
                     <span className="font-semibold text-lg">
                      Issue Status
                    </span>
                    <p className="text-gray-700">{item.status}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      Submitting Department
                    </span>
                    <p className="text-gray-700">{item.department}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      Priority 
                    </span>
                    <p className="text-gray-700">{item.priority}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      Submitted Date
                    </span>
                    <p className="text-gray-700">{item.date}</p>
                  </div>
                  <div className="flex  items-center my-3">
                  </div>
                </>
              </div>
            ))}
          </div>
        )}
      </div>
     
    </div>
  );
};

export default AssignIssue;
