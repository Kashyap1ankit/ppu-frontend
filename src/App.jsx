import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const pdfRef = useRef();
  const aRef = useRef();
  const [error, setError] = useState(false);
  const [roll, setRoll] = useState();
  const [year, setYear] = useState();
  const [part, setPart] = useState();
  const [type, setType] = useState();
  const [pdfLink, setPdfLink] = useState();
  const fetchPdf = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}?roll=${roll}&year=${year}&part=${part}&type=${type}`,
        {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);

      pdfRef.current.src = url;
      setPdfLink(url);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  function handleClick(e) {
    e.preventDefault();
    fetchPdf();
  }

  useEffect(() => {
    aRef.current.click();
  }, [pdfLink]);

  return (
    <div className="xsm:mx-4 lg:mx-8 overflow-x-hidden">
      {error ? (
        <div className="bg-red-500 fixed bottom-12 duration-100 right-12 py-2 px-12 rounded-md">
          <p className="text-white font-bold text-xl">Error Occured</p>
        </div>
      ) : (
        ""
      )}

      <div className="mt-8 mb-4 text-center font-bold tracking-wide">
        <h1 className="xsm:text-2xl md:text-3xl lg:text-4xl">PPU RESULTS</h1>
      </div>

      <form className="w-full mt-4 mb-8 flex-col md:flex-row ">
        <div className="flex ">
          <input
            type="text"
            className="px-4 py-2 bg-slate-200 w-3/4 rounded-md"
            onChange={(e) => {
              setRoll(e.target.value);
            }}
          />
          <button
            className="bg-green-400 text-white font-bold py-2 px-4 rounded-md ml-4"
            onClick={handleClick}
          >
            Search
          </button>
        </div>

        <div className="md:flex md:justify-between lg:w-1/2 mt-4">
          {/* Type  */}

          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="bg-slate-200 py-2 px-4 rounded-md xsm:w-screen md:w-fit"
            defaultValue={type}
          >
            <option value="select">Type</option>
            <option value="Vocational">Vocational</option>
            <option value="Regular">Regular</option>
          </select>

          {/* Year  */}

          <select
            onChange={(e) => {
              setYear(e.target.value);
            }}
            className="bg-slate-200 py-2 px-4 rounded-md xsm:w-screen md:w-fit xsm:mt-4 md:mt-0"
            defaultValue={year}
          >
            <option value="select">Year</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>

          {/* Course  */}

          <select
            onChange={(e) => {
              setPart(e.target.value);
            }}
            className="bg-slate-200 py-2 px-4 rounded-md xsm:w-screen md:w-fit xsm:mt-4 md:mt-0"
            defaultValue={part}
          >
            <option value="select">Part</option>
            {type === "Regular" ? (
              <>
                <option value="B.Com(Part-I)"> B.Com(Part-I)</option>
                <option value="B.Com(Part-II)"> B.Com(Part-II)</option>
                <option value="B.Com(Part-III)"> B.Com(Part-III)</option>
                <option value="B.A.Hons.(Part-I)"> B.A.Hons.(Part-I)</option>
                <option value="B.A.Hons.(Part-II)"> B.A.Hons.(Part-II)</option>
                <option value="B.A.Hons.(Part-III)">B.A.Hons.(Part-III)</option>
                <option value="B.Sc.Hons.(Part-I)"> B.Sc.Hons.(Part-I)</option>
                <option value="B.Sc.Hons.(Part-II)">B.Sc.Hons.(Part-II)</option>
                <option value="B.Sc.Hons.(Part-III)">
                  B.Sc.Hons.(Part-III)
                </option>
              </>
            ) : (
              ""
            )}

            {type === "Vocational" ? (
              <>
                <option value="PART-I">PART-I</option>
                <option value="PART-II">PART-II</option>
                <option value="PART-III"> PART-III</option>
              </>
            ) : (
              ""
            )}
          </select>
        </div>
      </form>

      <iframe
        ref={pdfRef}
        title="PDF Viewer"
        className="xsm:hidden xl:block w-full xsm:h-96 md:h-screen mb-8"
      ></iframe>

      <a href={pdfLink} download="Result" ref={aRef}></a>

      <div className="text-gray-500">
        <p>Made by Ankit Kashyap For Fun</p>
      </div>
    </div>
  );
}

export default App;
