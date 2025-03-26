import React, { useEffect } from "react";
import { useState } from "react";
import { onlineCourses } from "./data";

const App = () => {
  const [courses, setCourses] = useState();
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [boughtItem, setBoughtItem] = useState(false);
  useEffect(() => {
    setCourses(onlineCourses);
  }, [selectedCourse]);

  const selectCourse = (num) => {
    let newArr = [...selectedCourse];
    let newCourse = courses.find((item, index) => index === num);
    let buyItem = selectedCourse.some((item) => item.title === newCourse.title);
    if (!buyItem) {
      newArr.push(newCourse);
      setSelectedCourse(newArr);
    }
  };
  const sumPriceAll = () => {
    let sum = 0;
    selectedCourse.map((item) => {
      sum += item.price;
    });
    return sum;
  };
  const delItem = (num) => {
    let newSelectedCourse = [...selectedCourse];
    newSelectedCourse.splice(num, 1);
    setSelectedCourse(newSelectedCourse);
  };

  return (
    <>
      <div className="p-2 flex gap-10 flex-col">
        <h1 className="text-center text-4xl">STARTUM ONLINE COURSES</h1>
        <div className="grid grid-cols-[1fr,3fr] gap-4 max-md:grid-cols-1 ">
          <div className="bg-purple-400 rounded-md text-white p-4 flex flex-col gap-2">
            {selectedCourse
              ? selectedCourse.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <h4>
                      {index + 1}. {item.title}
                    </h4>
                    <p>${item.price}</p>
                    <button
                      onClick={() => delItem(index)}
                      className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))
              : ""}
            <div>
              {sumPriceAll() > 0 ? (
                <h2 className="mt-2 flex items-center gap-2 justify-end">
                  Total price:{" "}
                  <span className="text-3xl">${sumPriceAll()}</span>
                </h2>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {courses
              ? courses.map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer flex-col gap-4 p-4 rounded-lg bg-slate-800 text-white items-center relative min-h-[30vh]"
                  >
                    <h4 className="text-8xl">{<item.img />}</h4>
                    <h3 className="text-3xl">
                      <b>Course:</b> {item.title}
                    </h3>
                    <p className="absolute top-2 left-2 bg-red-700 text-white p-2 rounded-md">
                      {item.level}
                    </p>
                    <p className="absolute top-2 right-2 bg-blue-700 text-white p-2 rounded-md">
                      {item.length}
                    </p>
                    <p>
                      <b>Price:</b> $ {item.price}
                    </p>
                    <button
                      onClick={() => selectCourse(index)}
                      style={{
                        backgroundColor:selectedCourse.some(course=>course.title===item.title)?'red':'green'
                      }}
                      className="p-2 rounded-md text-white cursor-pointer w-full"
                          
                    >
                      Buy
                    </button>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
