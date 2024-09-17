import { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import axios from "axios";
import UpdateCard from "../components/UpdateCard";
import { useSelector } from "react-redux";

function EmployeeList() {
  const [activeMode, setActiveMode] = useState("");
  const [empData, setEmpData] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [searchType, setSearchType] = useState("email");
  const [searchValue, setSearchValue] = useState("");
  const isAdmin = useSelector((state) => state.auth.status);

  const handleSearch = async () => {
    const quary = searchValue ? `${searchType}=${searchValue}` : "";
    axios
      .get(`api/v1/employee/search?${quary}`)
      .then((res) => {
        alert("Total Data Found " + res.data.data.length);
        setEmpData(res.data.data);
        setSearchValue("");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const res = confirm("Are you sure you want to delete data of id- " + id);
    if (res)
      axios
        .delete(`api/v1/employee/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          handleSearch();
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.log(error);
        });
  };

  const handleUpdateCard = (idx) => {
    setUpdateData(empData[idx]);
    setActiveMode("update");
  };

  const handleUpdate = (updatedData) => {
    const formData = new FormData();

    formData.append("name", updatedData.name);
    formData.append("email", updatedData.email);
    formData.append("phone", updatedData.phone);
    formData.append("designation", updatedData.designation);
    formData.append("gender", updatedData.gender);
    updatedData.courses.forEach((course) =>
      formData.append("course[]", course)
    );

    // Check if a new image is uploaded; if not, append the previous image URL
    if (updatedData.image) {
      formData.append("image", updatedData.image); // New image
    } else {
      formData.append("image", updatedData.previousImage); // Pass the previous image URL
    }

    // Log FormData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    axios
      .put(`api/v1/employee/update/${updatedData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert(res.data.message);
        setActiveMode("");
        handleSearch();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    if (isAdmin) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAdmin) return <p>You can&apos;t access this page without login</p>;

  return (
    <div className="w-11/12 sm:w-4/5 my-8">
      {activeMode === "" && (
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-center mb-7">
            Employee List
          </h1>

          {/* Search Area */}
          <div className="w-full flex flex-col md:flex-row my-4 justify-center gap-4 text-lg font-semibold items-center">
            <div className="flex gap-2 items-center">
              <p>Select type: </p>
              <select
                className="border-solid border-2 border-indigo-700 rounded-lg py-1 px-2"
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="w-fit">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter value"
                className="w-[200px] lg:w-[300px] outline-red-600 border-solid border-2 border-indigo-700 rounded-lg py-1 px-3"
              />
            </div>
            <div
              className="w-fit bg-indigo-700 text-white font-bold px-7 py-1 rounded-md cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </div>
          </div>

          {/* Employees Data Cards */}
          <div className="w-full border-solid border-t-4 border-slate-400 py-3">
            <p className="text-center font-semibold">
              Total data found - {empData.length}
            </p>

            <div className="space-y-3 h-fit w-fit mx-auto">
              {empData.length > 0 ? (
                empData?.map((el, idx) => (
                  <EmployeeCard
                    key={el._id}
                    data={el}
                    dltfn={() => handleDelete(el._id)}
                    updatefn={() => handleUpdateCard(idx)}
                  />
                ))
              ) : (
                <p>No Data To Show</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeMode === "update" && (
        <div>
          <UpdateCard
            data={updateData}
            backfn={() => setActiveMode("")}
            updatefn={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
