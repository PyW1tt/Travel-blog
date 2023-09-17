import "../Pages/public.css";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [search, setSearch] = useState("");
  const [travel, setTravel] = useState([]);
  const [tag, setTag] = useState([]);
  const [textToCopy, setTextToCopy] = useState("");

  async function getTravel() {
    try {
      const travels = await axios.get(
        `http://localhost:4001/trips?keywords=${search}`
      );
      //   console.log(travels.data.data);
      setTravel(travels.data.data);
    } catch (error) {
      console.log("request error");
    }
  }
  useEffect(() => {
    getTravel();
  }, [search]);

  function handleClick(text) {
    console.log(tag);
    console.log(text);

    if (!tag.includes(text)) {
      const updateSearch = [...tag, text];
      setTag(updateSearch);
      //   console.log(updateSearch);

      const newUpdateSearch = updateSearch.join(" ");
      console.log(newUpdateSearch);
      setSearch(newUpdateSearch);
    }
  }

  return (
    <section className="font-[Prompt] ">
      <div className="mt-10">
        <p className=" text-center text-[50px] font-bold text-sky-500">
          เที่ยวไหนดี
        </p>
      </div>
      <div className="flex flex-col items-center w-full mt-5">
        <label htmlFor="search" className="w-5/6 font-bold">
          ค้นหาที่เที่ยว
        </label>{" "}
        <input
          id="search"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setTag(e.target.value);
          }}
          className=" w-5/6 text-center border-b-4  focus:outline-none focus:stroke-neutral-400"
        />
      </div>
      <div className="w-full mt-14">
        {travel.map((item, index) => {
          let maxLength = item.tags.length;
          return (
            <div key={index} className="flex mt-10">
              <div className="px-10 ">
                <img
                  className=" rounded-3xl w-[334px] h-[229px]"
                  src={item.photos[0]}
                />
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <a href={item.url} target="_blank">
                    <p className=" text-2xl font-bold">{item.title}</p>
                  </a>
                </div>
                <div>
                  <p>
                    {item.description.length > 100
                      ? item.description.slice(0, 100) + "..."
                      : item.description}
                  </p>
                </div>
                <div>
                  <a
                    href={item.url}
                    target="_blank"
                    className="text-sky-500 underline"
                  >
                    อ่านต่อ
                  </a>
                </div>
                <div>
                  <span className="mr-3">หมวด</span>

                  <span className="">
                    {item.tags.map((tag, index) => {
                      if (index !== maxLength - 1) {
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              handleClick(tag);
                            }}
                            className="mr-3 underline"
                          >
                            {tag}
                          </button>
                        );
                      } else {
                        return (
                          <>
                            <span className="mr-3">และ</span>
                            <button
                              key={index}
                              onClick={() => {
                                handleClick(tag);
                              }}
                              className="mr-3 underline"
                            >
                              {tag}
                            </button>
                          </>
                        );
                      }
                    })}
                  </span>
                </div>
                <div className="flex">
                  {item.photos.slice(1).map((item, index) => {
                    return (
                      <div key={index} className="mr-5">
                        <img
                          src={item}
                          className=" w-[100px] h-[100px] rounded-lg"
                        />
                      </div>
                    );
                  })}
                  <div className="w-[300px] flex">
                    <button
                      onClick={() => {
                        setTextToCopy(item.url);
                        navigator.clipboard.writeText(item.url);
                        alert("copy");
                      }}
                      className=""
                    >
                      <i class="fa-solid fa-link"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HomePage;
